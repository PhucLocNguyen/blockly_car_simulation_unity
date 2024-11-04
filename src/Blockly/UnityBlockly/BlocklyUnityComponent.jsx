import React, { useState, useEffect, useRef } from "react";
import "./BlocklyUnityComponent.css";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";
import * as localeVi from "blockly/msg/vi";
import * as localeEn from "blockly/msg/en";
import { t } from "i18next";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation } from "react-router-dom";
import { GetProjectById, updateProject } from "../../utils/CRUD_Project";
function BlocklyUnityComponent(props) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "vi"
  );
  const [displayConvertBox, setDisplayConvertBox] = useState(true);
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const autosaveInterval = useRef();
  const projectId = props.projectId;
  //   const generateCode = () => {
  //     const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
  //     setCodeJavascript(code);
  //     console.log("Javascript:", code);
  //     const codePython = pythonGenerator.workspaceToCode(
  //       primaryWorkspace.current
  //     );
  //     setCodePython(codePython);
  //     console.log("Python:", codePython);
  //   };
  function loadLocale(language) {
    if (language === "vi") {
      require("../../languages/Blocks/vi.js"); // Hoặc sử dụng await import nếu cần
      delete require.cache[require.resolve("../../languages/Blocks/en.js")];
    } else if (language === "en") {
      require("../../languages/Blocks/en.js");
      delete require.cache[require.resolve("../../languages/Blocks/vi.js")];
    }
  }
  const saveCodeUpdate = async () => {
    //Save code va co the save duoc ten cua du an
    const workspace = primaryWorkspace.current;
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    await updateProject(projectId, xmlText);
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
    var tempLanguage = localStorage.getItem("language");
    console.log(tempLanguage);
    Blockly.setLocale(tempLanguage == "vi" ? localeVi : localeEn);
    // loadLocale(tempLanguage);
    recreateWorkspace();
  }, [language, primaryWorkspace]);

  useEffect(() => {
    autosaveInterval.current = setInterval(saveCodeUpdate, 10000);
    loadLocale(language);
    return () => {
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, []);

  const handleChangeLanguage = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    } else {
      // Nếu ngôn ngữ giống nhau, vẫn cần tái tạo lại workspace để áp dụng localization
      //   loadLocale(lang);
      Blockly.setLocale(lang === "vi" ? localeVi : localeEn);
      recreateWorkspace();
    }
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
            <h2>Mo phong</h2>
            <iframe src="/webGL" width="100%" height="500px"></iframe>
            
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
            <p className="px-20">Save code</p>
            <div className="bg-[#0f760f] p-2 rounded-[10px]">
              <SaveIcon />
            </div>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlocklyUnityComponent;
