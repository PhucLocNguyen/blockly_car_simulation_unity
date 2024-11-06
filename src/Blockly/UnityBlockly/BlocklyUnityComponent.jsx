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
import UnityWebGL from "../../Components/UnityWebGL";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
function BlocklyUnityComponent(props) {
  const [codeJavascript, setCodeJavascript] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "vi"
  );
  const [toogleClick, setToggleClick] = useState(false);
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const autosaveInterval = useRef();
  const projectId = props.projectId;
  function loadLocale(language) {
    if (language === "vi") {
      require("../../languages/Blocks/vi.js"); // Hoặc sử dụng await import nếu cần
      delete require.cache[require.resolve("../../languages/Blocks/en.js")];
    } else if (language === "en") {
      require("../../languages/Blocks/en.js");
      delete require.cache[require.resolve("../../languages/Blocks/vi.js")];
    }
  }
  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    setCodeJavascript(code);
    setToggleClick(!toogleClick); //listen to simulate button to simulate
    console.log("Javascript:", code);
  };
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
      if (primaryWorkspace.current) {
        primaryWorkspace.current.clear();
      }
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, []);

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
            <UnityWebGL code={codeJavascript} toogleClick={toogleClick}/>
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
                <p className="px-20">Simulate</p>
                <div className="bg-[#0f760f] p-2 rounded-[10px]">
                  <DirectionsCarIcon style={{ fill: "#fff" }} />
                </div>
              </Button>
              
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
