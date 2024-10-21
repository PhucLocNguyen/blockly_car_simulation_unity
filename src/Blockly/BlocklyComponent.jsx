import React, { useState, useEffect, useRef } from 'react';
import './BlocklyComponent.css';

import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';
import * as localeVi from 'blockly/msg/vi';
import * as localeEn from 'blockly/msg/en';

function loadLocale(language) {
  if (language === 'vi') {
    require('../languages/vi.js'); // Hoặc sử dụng await import nếu cần
    delete require.cache[require.resolve('../languages/en.js')];
    
  } else if (language === 'en') {
    require('../languages/en.js');
    delete require.cache[require.resolve('../languages/vi.js')];
  }
}

function BlocklyComponent(props) {
  const [language, setLanguage] = useState(localStorage.getItem("language") ?? "vi");
  
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const autosaveInterval = useRef();

  const generateCode = () => {
    const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    console.log("Javascript:", code);
    const codePython = pythonGenerator.workspaceToCode(primaryWorkspace.current);
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
  
    if (localStorage.getItem('blocklyCache')) {
      Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(localStorage.getItem('blocklyCache')), primaryWorkspace.current);
    }
  };
  
  useEffect(() => {
    // Thay đổi ngôn ngữ của Blockly theo ngôn ngữ hiện tại
    var tempLanguage=localStorage.getItem("language");
    console.log(tempLanguage)
    Blockly.setLocale(tempLanguage == 'vi' ? localeVi : localeEn);
    loadLocale(tempLanguage);
    recreateWorkspace();
  }, [language,primaryWorkspace]);
  

  useEffect(() => {
    autosaveInterval.current = setInterval(saveWorkspace, 5000);

    return () => {
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, []);

  const handleChangeLanguage = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem("language",lang)
    } else {
      // Nếu ngôn ngữ giống nhau, vẫn cần tái tạo lại workspace để áp dụng localization
      loadLocale(lang);
      Blockly.setLocale(lang === 'vi' ? localeVi : localeEn);
      recreateWorkspace();
    }
  };

  const saveWorkspace = () => {
    try {
      const workspace = primaryWorkspace.current;
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToText(xml);
      
      // Save the current workspace XML to localStorage
      localStorage.setItem('blocklyCache', xmlText);
      
      // Keep a backup version
      const timestamp = new Date().toISOString();
      localStorage.setItem(`blocklyBackup-${timestamp}`, xmlText);
      
      // Limit to 3 backup versions
      const backups = Object.keys(localStorage).filter(key => key.startsWith('blocklyBackup-'));
      if (backups.length > 3) {
        localStorage.removeItem(backups.sort()[0]);
      }

    } catch (error) {
      console.error("Error saving workspace:", error);
    }
  };

  return (
    <React.Fragment>
      <div style={{display:"flex", gap:"5px"}}>
      <button onClick={generateCode} style={{padding:"10px 20px", borderRadius:"5px", cursor:"pointer"}}>Convert</button>
      <select value={language} onChange={(e) => handleChangeLanguage(e.target.value)} style={{padding:"5px", borderRadius:"5px", cursor:"pointer"}}>
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
      </div>
      
      <div ref={blocklyDiv} id="blocklyDiv" className='text-black border text-2xl test' />
      <div style={{ display: 'none' }} ref={toolbox}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
