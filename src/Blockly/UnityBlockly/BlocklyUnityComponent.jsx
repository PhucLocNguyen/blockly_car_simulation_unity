import React, { useState, useEffect, useRef, useContext } from "react";
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
import StopIcon from "@mui/icons-material/Stop";
import { LanguageContext } from "../../context/LanguageProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
function BlocklyUnityComponent(props) {
  const [codeJavascript, setCodeJavascript] = useState(null);
  const { language } = useContext(LanguageContext);
  const blocklyDiv = useRef();
  const [isSimulated, setIsSimulated] = useState(false);
  const toolbox = useRef();
  const [isReset, setIsReset] = useState(false);
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
  const generateCode = (event) => {
    event.stopPropagation();
    const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    setCodeJavascript(code);
    setIsSimulated(!isSimulated); //listen to simulate button to simulate

    console.log("Javascript:", code);
  };
  const saveCodeUpdate = async () => {
    //Save code va co the save duoc ten cua du an
    const workspace = primaryWorkspace.current;
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    if (
      xmlText ===
      `<xml xmlns="https://developers.google.com/blockly/xml"></xml>`
    ) {
      return;
    }
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
    Blockly.setLocale(language == "vi" ? localeVi : localeEn);
    loadLocale(language);
    recreateWorkspace();
  }, [language, primaryWorkspace]);
  useEffect(() => {
    if (primaryWorkspace.current) {
      primaryWorkspace.current.addChangeListener((event) => {
        if (
          event.type === Blockly.Events.BLOCK_CREATE ||
          Blockly.Events.BLOCK_MOVE
        ) {
          const allBlocks = primaryWorkspace.current.getAllBlocks();

          // Filter event blocks starting with "event_block"
          const eventBlocks = allBlocks.filter((block) =>
            block.type.startsWith("event_block")
          );

          // Create a dictionary to keep track of each event block type
          const blockTypes = {};
          eventBlocks.forEach((block) => {
            if (blockTypes[block.type]) {
              // If this block type already exists, disable the additional one
              block.disabled = true;
            } else {
              // Otherwise, add it to the dictionary and ensure it's enabled
              blockTypes[block.type] = block;
              block.disabled = false;
            }
          });
        }
      });
    }
  }, [primaryWorkspace.current]);
  const ResetUnityButton = (event) => {
    event.stopPropagation();
    setIsReset(true);
    setIsSimulated(!isSimulated); //listen to simulate button to simulate
  };
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
            <h2>{t("BlocklyUnityPage_SimulateTitle")}</h2>
            <UnityWebGL
              code={codeJavascript}
              toogleClick={isSimulated}
              isReset={isReset}
              setIsReset={setIsReset}
            />
            <div className="flex justify-center  ">
              <Button
                className={
                  isSimulated ? "border-[#1ce61c] text-nowrap" : "border-red-600 "
                }
                sx={{
                  border: isSimulated ? "4px solid red" : "4px solid #1ce61c",
                  color: "#000",
                  padding: "0px 12px 0 0",
                  background: "#fff",
                  borderRadius: "10px",
                  marginLeft: "",
                  minWidth:"360px",
                  textWrap:"nowrap",
                  justifyContent:"flex-start"
                }}
                onClick={!isSimulated ? generateCode : ResetUnityButton}
              >
                {isSimulated ? (
                  <>
                    <div className="bg-[#a10909] w-[50px] h-full m-2 flex items-center justify-center rounded-sm ml-0 px-2">
                      <StopIcon style={{ fill: "#fff" }} />
                    </div>
                    <p className="text-center w-full">{t("BlocklyUnityPage_StopSimulation")}</p>
                  </>
                ) : (
                  <>
                    <div className="bg-[#0f760f]  w-[50px] h-full m-2 flex items-center justify-center rounded-sm ml-0 px-2">
                      <PlayArrowIcon style={{ fill: "#fff" }} />
                    </div>
                    <p className="text-center w-full ">
                      {t("BlocklyUnityPage_SimulateButton")}
                    </p>
                  </>
                )}
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

export default BlocklyUnityComponent;
