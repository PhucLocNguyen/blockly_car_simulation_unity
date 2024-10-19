import React, {useState} from 'react';
import './App.css';

import logo from './logo.svg';

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from './Blockly';

// import './blocks/customblocks';
// import './blocks/gpio';  // Import file gpio.js chứa khối GPIO
import './generator/generator';
// import "./blocks/text"
// import "./Components/Gpio_simulator"
// import "./blocks/mathBlocks"
// import "./time.js"
import './blocks/exportBlocks';
function App(props) {
  const [xmlRemember] = useState(localStorage.getItem('blocklyCache') || '');

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
          {/* Danh mục các khối cơ bản*/}
          <Category name="Basic" colour="#8FBC8F">
            <Block type="sleep_ms" />
            <Block type="pin_binary" />
          </Category>
          {/* Danh mục các khối logic */}
          <Category name="Logic" colour="#76B041">
            <Block type="controls_ifelse" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_null" disabled="true" />
            <Block type="logic_ternary" />
          </Category>
          {/* Danh mục các khối vòng lặp */}
          <Category name="Loops" colour="#20B2AA">
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM"></Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="forever_loop" />
          </Category>
          {/* Danh mục các khối  GPIO Setup */}
          <Category name="GPIO Setup" colour="#40E0D0">
            <Block type="gpio_set" />
            <Block type="gpio_cleanup" />
          </Category>
          {/* Danh mục các khối Digital I/O */}
          <Category name="Digital I/O" colour="#4682B4">
            <Block type="gpio_read_digital" />
            <Block type="gpio_set_digital" />
          </Category>
          {/* Danh mục các khối PWM Control */}
          <Category name="PWM Control" colour="#FF4500">
            <Block type="pwm_setup" />
            <Block type="pwm_start_stop" />
            <Block type="pwm_change_duty_cycle" />
          </Category>
          {/* Danh mục các khối lấy dữ liệu Sensor */}
          <Category name="Sensors" colour="#FFD700">
            <Block type="ultrasonic_sensor_trigger" />
            <Block type="temperature_sensor_read" />
          </Category>
          {/* Danh mục các khối xử lý sự kiện */}
         
          {/* Danh mục các khối hàm tùy chỉnh */}
          <Category name="Custom Function Blocks" colour="#4682B4">
            <Block type="define_custom_function" />
            <Block type="call_custom_function" />
          </Category>
          {/* Danh mục các khối Text */}
          <Category name="Text" colour="#BA55D3">
            <Block type="text_charAt" />
          </Category>
          {/* Danh mục các khối biến */}
          <Category name="Variable" colour="#FFA500">
            <Block type="variable_untyped" />
            <Block type="variable_typed" />
            <Block type="text_print" />
            <Block type="variables_get">
              <Field name="VAR"></Field>
            </Block>
          </Category>
          {/* Danh mục các khối của FSTEM */}
          <Category name="FSTEM Library" colour="#006400">
            <Block type="gpio_setup_board" />
            <Block type="set_motor_speed" />
            <Block type="set_motor_pins" />
          </Category>
        </BlocklyComponent>
      </header>
    </div>
  );
}

export default App;
