/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import './BlocklyComponent.css';
import {useEffect, useRef} from 'react';

import * as Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import * as locale from 'blockly/msg/en';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();
  const autosaveInterval = useRef();
  const generateCode = () => {
    var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    console.log("Javascript:")
    console.log(code); // ket qua output sau khi keo tha code la code python
    var codePython = pythonGenerator.workspaceToCode(primaryWorkspace.current);
    console.log("Python:")
    console.log(codePython);
  }
  ;
  useEffect(() => {
    autosaveInterval.current = setInterval(saveWorkspace, 5000);

    return () => {
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, []);
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

  useEffect(() => {
    const {initialXml, children, ...rest} = props;
    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(initialXml),
        primaryWorkspace.current,
      );
    }
  }, [primaryWorkspace, toolbox, blocklyDiv, props]);

  return (
    <React.Fragment>
      <button onClick={generateCode}>Convert</button>
      <div ref={blocklyDiv} id="blocklyDiv" className='text-black border text-2xl ' />
      <div style={{display: 'none'}} ref={toolbox}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
