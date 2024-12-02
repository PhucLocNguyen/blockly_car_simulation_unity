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
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";
import WestIcon from "@mui/icons-material/West";
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
  const [isSaved, setIsSaved] = useState(false);

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
        <div className="bg-white sm:px-2 py-2 md:px-14 flex justify-between items-center ">
          <Link to="/">
            <IconButton>
              <WestIcon sx={{ scale: "1.2" }} />
            </IconButton>
          </Link>
          <div className=" bg-white  border-[2px] ">
            <Button
              className="bg-[#107c10]"
              sx={{
                background: "#107c10",
                color: "#fff",
                padding: "0px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              disabled={isSaved}
              onClick={() => {
                saveCodeUpdate(false);
                setIsSaved(true);
              }}
            >
              <p className="sm:px-4 md:px-10">
                {t("BlocklyPage_SaveProjectButton")}
              </p>
              <div className="bg-[#0f760f] p-2 rounded-[10px]">
                <SaveIcon />
              </div>
            </Button>
          </div>
        </div>
        <div className="grid sm:min-h-full md:h-[90vh] sm:grid-flow-row sm:h-full sm:grid-cols-1 sm:grid-rows-2 md:h-[calc(100vh - 115px)] md:grid-rows-1 md:grid-flow-col md:grid-cols-12 w-full py-2" id="formatBlockly">
          <div ref={blocklyDiv} id="blocklyDivUnity" className="sm:col-span-1 md:col-span-9" />
          <div style={{ display: "none" }} ref={toolbox}>
            {props.children}
          </div>
          <div className="sm:col-span-2 md:col-span-3 p-2">
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

      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
