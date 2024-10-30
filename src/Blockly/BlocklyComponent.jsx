import React, { useState, useEffect, useRef } from "react";
import "./BlocklyComponent.css";

import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import { pythonGenerator } from "blockly/python";
import * as localeVi from "blockly/msg/vi";
import * as localeEn from "blockly/msg/en";
import SimulateIDECode from "../Components/SimulateIDECode";
import logo from "../Assets/logoApp.jpg"
import { t } from "i18next";
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
  const [language, setLanguage] = useState(
    localStorage.getItem("language") ?? "vi"
  );
  const [codePython, setCodePython] = useState("");
  const [codeJavascript, setCodeJavascript] = useState("");
  const [displayConvertBox, setDisplayConvertBox] = useState(true);
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const autosaveInterval = useRef();
  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    setCodeJavascript(code);
    console.log("Javascript:", code);
    const codePython = pythonGenerator.workspaceToCode(
      primaryWorkspace.current
    );
    setCodePython(codePython);
    console.log("Python:", codePython);
  };
  const recreateWorkspace = () => {
    if (primaryWorkspace.current) {
      primaryWorkspace.current.dispose(); // Xóa workspace cũ
    }

    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...props,
    });

    if (localStorage.getItem("blocklyCache")) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(localStorage.getItem("blocklyCache")),
        primaryWorkspace.current
      );
    }
  };

  useEffect(() => {
    // Thay đổi ngôn ngữ của Blockly theo ngôn ngữ hiện tại
    var tempLanguage = localStorage.getItem("language");
    console.log(tempLanguage);
    Blockly.setLocale(tempLanguage == "vi" ? localeVi : localeEn);
    loadLocale(tempLanguage);
    recreateWorkspace();
  }, [language, primaryWorkspace]);

  useEffect(() => {
    autosaveInterval.current = setInterval(saveWorkspace, 5000);
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
      loadLocale(lang);
      Blockly.setLocale(lang === "vi" ? localeVi : localeEn);
      recreateWorkspace();
    }
  };

  const saveWorkspace = () => {
    try {
      const workspace = primaryWorkspace.current;
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToText(xml);

      // Save the current workspace XML to localStorage
      localStorage.setItem("blocklyCache", xmlText);

      // Keep a backup version
      const timestamp = new Date().toISOString();
      localStorage.setItem(`blocklyBackup-${timestamp}`, xmlText);

      // Limit to 3 backup versions
      const backups = Object.keys(localStorage).filter((key) =>
        key.startsWith("blocklyBackup-")
      );
      if (backups.length > 3) {
        localStorage.removeItem(backups.sort()[0]);
      }
    } catch (error) {
      console.error("Error saving workspace:", error);
    }
  };
  function HandleClickConvertBox(){
    setDisplayConvertBox(!displayConvertBox);
    console.log("testing")
  }
  // Gọi hàm này khi bạn cần tạo biến tùy chỉnh trong workspace của bạn
  return (
    <React.Fragment>
      <div style={{ display: "flex", gap: "5px" }}>
        <button
          onClick={generateCode}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {t("convertButton")}
        </button>
        <select
          value={language}
          onChange={(e) => handleChangeLanguage(e.target.value)}
          style={{ padding: "5px", borderRadius: "5px", cursor: "pointer" }}>
          <option value="vi">{t("vietnamese")}</option>
          <option value="en">{t("english")}</option>
        </select>
      </div>

      <div ref={blocklyDiv} id="blocklyDiv" className={displayConvertBox&&"openConvertBoxContainer"} />
      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
      <div
        id="convertContainer"
        className={`absolute max-w-screen-sm w-full min-h-screen bottom-0 right-0 bg-[#023ae5] ${
          displayConvertBox
            ? " showConvertAnimation "
            : " closeConvertAnimation "
        }`}
      >
        <h2 className="ml-5">{t("convertCodeTitle")}</h2>
        <SimulateIDECode
          titleIDE={"Python"}
          programmingLanguage="python"
          script={codePython}
        />
        <div className="w-full flex justify-items-center align-middle items-center justify-center">
          <div
            className="pb-1 w-[calc(100%-40px)] my-2  bg-gray-50 opacity-90"
          ></div>
        </div>
        <SimulateIDECode
          titleIDE={"Nodejs"}
          programmingLanguage="javascript"
          script={codeJavascript}
        />
        <div id="overlayConvertBox" className={`absolute bg-white top-0 right-0 -left-0 -bottom-0 z-10 hidden w-full h-full ${!displayConvertBox? "animationOpacity ":""}`}></div>
        <div className="absolute rounded-full shadow-lg w-10 h-10 -left-4 border border-white top-1/2 -translate-y-1/2 cursor-pointer z-20" onClick={HandleClickConvertBox}>
          <img src={logo} className="w-full h-full rounded-full border-white border-[4px] shadow-lg border-solid" alt="" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
