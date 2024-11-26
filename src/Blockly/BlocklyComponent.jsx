import React, { useState, useEffect, useRef } from "react";
import "./BlocklyComponent.css";

import * as Blockly from "blockly/core";
import "blockly/blocks";
import { pythonGenerator } from "blockly/python";
import * as localeVi from "blockly/msg/vi";
import * as localeEn from "blockly/msg/en";
import SimulateIDECode from "../Components/SimulateIDECode";
import { t } from "i18next";
import { GetProjectById, updateProjectXML } from "../utils/CRUD_Project";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";

function loadLocale(language) {
  if (language === "vi") {
    require("../languages/Blocks/vi.js"); // Hoặc sử dụng await import nếu cần
    delete require.cache[require.resolve("../languages/Blocks/en.js")];
  } else if (language === "en") {
    require("../languages/Blocks/en.js");
    delete require.cache[require.resolve("../languages/Blocks/vi.js")];
  }
}

function BlocklyComponent(props) {
  const { language } = useContext(LanguageContext);
  const [codePython, setCodePython] = useState("");
  const [displayConvertBox, setDisplayConvertBox] = useState(true);
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const autosaveInterval = useRef();
  const projectId = props.projectId;
  const generateCode = () => {
    const codePython = pythonGenerator.workspaceToCode(
      primaryWorkspace.current
    );
    setCodePython(codePython);
    console.log("Python:", codePython);
  };
  const recreateWorkspace = async () => {
    if (primaryWorkspace.current) {
      primaryWorkspace.current.dispose(); // Xóa workspace cũ
    }

    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...props,
    });

    var project = await GetProjectById(projectId);
    if (project != null && project.content !== "") {
      try {
        Blockly.Xml.domToWorkspace(
          Blockly.utils.xml.textToDom(project?.content),
          primaryWorkspace.current
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    // Thay đổi ngôn ngữ của Blockly theo ngôn ngữ hiện tại
    Blockly.setLocale(language == "vi" ? localeVi : localeEn);
    loadLocale(language);
    recreateWorkspace();
  }, [language, primaryWorkspace]);

  useEffect(() => {
    autosaveInterval.current = setInterval(saveCodeUpdate, 10000);
    loadLocale(language);
    return () => {
      if (primaryWorkspace.current) {
        primaryWorkspace.current.clear();
      }
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, []);

  const saveCodeUpdate = async () => {
    //Save code va co the save duoc ten cua du an
    const workspace = primaryWorkspace.current;
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    await updateProjectXML(projectId, xmlText);
  };
  const HandleClickConvertBox = () => {
    setDisplayConvertBox(!displayConvertBox);
  };
  // Gọi hàm này khi bạn cần tạo biến tùy chỉnh trong workspace của bạn
  return (
    <React.Fragment>
      <div className="relative w-full">
        <div className="grid grid-cols-12 w-full h-max py-2" id="formatBlockly">
          <div ref={blocklyDiv} id="blocklyDivUnity" className="col-span-9" />
          <div style={{ display: "none" }} ref={toolbox}>
            {props.children}
          </div>
          <div className="col-span-3 p-2">
            <h2 className="ml-5">{t("convertCodeTitle")}</h2>
            <div className="max-h-[500px] md:min-h-[500px] h-full">
              <SimulateIDECode
                titleIDE={"Python"}
                programmingLanguage="python"
                script={codePython}
              />
              <div className="flex justify-center ">
                <Button
                  className="border-[#1ce61c] "
                  sx={{
                    border: "4px solid #1ce61c",
                    color: "#000",
                    padding: "0px",
                    background: "#fff",
                    borderRadius: "10px",
                    marginLeft: "10px",
                  }}
                  onClick={generateCode}
                >
                  <p className="px-20">{t("ConvertCode_Btn")}</p>
                  <div className="bg-[#0f760f] p-2 rounded-[10px]">
                    <SaveIcon />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit py-4 bg-white w-full border-[2px] border-solid border-black ">
          <Button
            className="bg-[#107c10]"
            sx={{
              background: "#107c10",
              color: "#fff",
              padding: "0px",
              borderRadius: "10px",
              marginLeft: "10px",
            }}
            onClick={saveCodeUpdate}
          >
            <p className="px-20">{t("BlocklyPage_SaveProjectButton")}</p>
            <div className="bg-[#0f760f] p-2 rounded-[10px]">
              <SaveIcon />
            </div>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
