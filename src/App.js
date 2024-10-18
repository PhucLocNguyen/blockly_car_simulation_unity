import React, { useEffect, useState } from 'react';
import './App.css';

import logo from './logo.svg';

import BlocklyComponent, { Block, Value, Field, Shadow, Category } from './Blockly';

import './blocks/customblocks';
import './blocks/gpio';  // Import file gpio.js chứa khối GPIO
import './generator/generator';
import "./blocks/text"
import "./Components/Gpio_simulator"
import "./blocks/mathBlocks"
function App(props) {
  
  const [xmlRemember, setXmlRemember] = useState( localStorage.getItem('blocklyCache')|| "");
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BlocklyComponent
          readOnly={false}
          trashcan={true}
          media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          initialXml={xmlRemember}>
          {/* Danh mục các khối tuỳ chỉnh */}
          <Category name="Basic" colour="153">
            <Block type="delay"/>
          </Category>
          <Category name="Custom Blocks" colour="210">
            <Block type="test_react_field" />
          </Category>

          {/* Danh mục Logic */}
          <Category name="Logic" colour="120">
            <Block type="controls_ifelse" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_null" disabled="true" />
            <Block type="logic_ternary" />
          </Category>

          {/* Danh mục vòng lặp */}
          <Category name="Loops" colour="180">
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM"></Field>
                </Shadow>
              </Value>
            </Block>
          </Category>

          {/* Danh mục GPIO */}
          <Category name="GPIO" colour="250">
            <Block type="led_set" />
          </Category>

          {/* Danh mục Text */}
          <Category name="Text" colour="160">
            <Block type="text_charAt">
            </Block>
          </Category>
          <Category name="Variable" colour="160">
            <Block type="variable_untyped">
              
            </Block>
            <Block type="variable_typed">
            </Block>
            <Block type="text_print"/>
            <Block type="variables_get">
                  <Field name="VAR"></Field>
                </Block>
          </Category>
          <Category name="FSTEM Library" colour="240">
              <Block type="gpio_setup"/>
              <Block type="set_motor_speed"/>
              <Block type="set_motor_pins"/>

          </Category>
        </BlocklyComponent>
        
      </header>
    </div>
  );
}

export default App;
