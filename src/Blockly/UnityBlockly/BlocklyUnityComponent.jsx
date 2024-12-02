import React, { useState, useEffect, useRef, useContext } from "react";
import "./BlocklyUnityComponent.css";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";
import * as localeVi from "blockly/msg/vi";
import * as localeEn from "blockly/msg/en";
import { t } from "i18next";
import { Button, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Link, useLocation } from "react-router-dom";
import {
  GetProjectById,
  updateProject,
  updateProjectXML,
} from "../../utils/CRUD_Project";
import UnityWebGL from "../../Components/UnityWebGL";
import StopIcon from "@mui/icons-material/Stop";
import { LanguageContext } from "../../context/LanguageProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WestIcon from "@mui/icons-material/West";

function BlocklyUnityComponent(props) {
  const [codeJavascript, setCodeJavascript] = useState(null);
  const { language } = useContext(LanguageContext);
  const blocklyDiv = useRef();
  const [isSimulated, setIsSimulated] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
    console.log(code);
    setIsSimulated(!isSimulated); //listen to simulate button to simulate
  };
  const saveCodeUpdate = async (isAuto = false) => {
    //Save code va co the save duoc ten cua du an
    const workspace = primaryWorkspace.current;
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    if (
      xmlText ===
        `<xml xmlns="https://developers.google.com/blockly/xml"></xml>` &&
      isAuto
    ) {
      return;
    }
    await updateProjectXML(projectId, xmlText);
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
          console.log(eventBlocks);
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
          const mapBlocks = allBlocks.filter((block) =>
            block.type.startsWith("Road_map")
          );
          mapBlocks.forEach((block, index) => {
            if (index !== 0) {
              // If this block type already exists, disable the additional one
              block.disabled = true;
            } else {
              // Otherwise, add it to the dictionary and ensure it's enabled
              blockTypes[block.type] = block;
              block.disabled = false;
            }
          });
        }
        setIsSaved(false);
      });
    }
  }, [primaryWorkspace.current]);
  const ResetUnityButton = (event) => {
    event.stopPropagation();
    setIsReset(true);
    setIsSimulated(!isSimulated); //listen to simulate button to simulate
  };
  useEffect(() => {
    autosaveInterval.current = setInterval(() => {
      if (!isSaved) {
        saveCodeUpdate(true);
        setIsSaved(true);
      }
    }, 10000);
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
        <div
          className="grid sm:min-h-full md:h-[90vh]  sm:grid-flow-row sm:grid-cols-1 sm:grid-rows-2  md:grid-rows-1 md:grid-flow-col md:grid-cols-12 w-full py-2"
          id="formatBlockly"
        >
          {/* Phần Blockly (Bảng làm việc) */}
          <div
            ref={blocklyDiv}
            id="blocklyDivUnity"
            className="sm:col-span-1 md:col-span-9"
          />

          {/* Phần children */}
          <div style={{ display: "none" }} ref={toolbox}>
            {props.children}
          </div>

          {/* Phần mô phỏng */}
          <div className="sm:col-span-2 md:col-span-3 p-2">
            <h2>{t("BlocklyUnityPage_SimulateTitle")}</h2>
            <UnityWebGL
              code={codeJavascript}
              toogleClick={isSimulated}
              isReset={isReset}
              setIsReset={setIsReset}
            />
            <div className="flex justify-center">
              <Button
                className={
                  isSimulated
                    ? "border-[#1ce61c] text-nowrap"
                    : "border-red-600"
                }
                sx={{
                  border: isSimulated ? "4px solid red" : "4px solid #1ce61c",
                  color: "#000",
                  padding: "0px 12px 0 0",
                  background: "#fff",
                  borderRadius: "10px",
                  minWidth: "360px",
                  justifyContent: "flex-start",
                }}
                onClick={!isSimulated ? generateCode : ResetUnityButton}
              >
                {isSimulated ? (
                  <>
                    <div className="bg-[#a10909] w-[50px] h-full m-2 flex items-center justify-center rounded-sm ml-0 px-2">
                      <StopIcon style={{ fill: "#fff" }} />
                    </div>
                    <p className="text-center w-full">
                      {t("BlocklyUnityPage_StopSimulation")}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="bg-[#0f760f] w-[50px] h-full m-2 flex items-center justify-center rounded-sm ml-0 px-2">
                      <PlayArrowIcon style={{ fill: "#fff" }} />
                    </div>
                    <p className="text-center w-full">
                      {t("BlocklyUnityPage_SimulateButton")}
                    </p>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlocklyUnityComponent;
