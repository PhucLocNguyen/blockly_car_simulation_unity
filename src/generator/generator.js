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
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
// Javascript generator
javascriptGenerator.forBlock['test_react_field'] = function (block) {
  return "console.log('custom block');\n";
};
javascriptGenerator.forBlock['variable_untyped'] = function(block) {
  // Print statement.
  var variableName = javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME2'), Blockly.Names.NameType.VARIABLE);
  var argument0 = javascriptGenerator.valueToCode(block, 'VALUE_Variable', javascriptGenerator.ORDER_NONE || 0) || '\'\'';
    // Tạo mã JavaScript để gán giá trị mặc định
    var code = 'var ' + variableName + ' = ' + argument0 + ';\n';
    return code;
};

javascriptGenerator.forBlock['variable_typed'] = function(block) {
  // Lấy tên của biến từ trường VAR_NAME
  var variableName = javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Names.NameType.VARIABLE);
  
  // Lấy giá trị mặc định từ trường DEFAULT_VALUE
  var defaultValue = JSON.stringify(block.getFieldValue('DEFAULT_VALUE')) || '"Hello World"'; // Đảm bảo giá trị chuỗi
  
  // Tạo mã JavaScript để gán giá trị mặc định
  var code = 'var ' + variableName + ' = ' + defaultValue + ';\n';
  return code;
};



javascriptGenerator.forBlock['set_motor_speed'] = function(block) {
  var left_speed = block.getFieldValue('left_speed');
  var right_speed = block.getFieldValue('right_speed');
  var code = `robot.value = (${left_speed}, ${right_speed});\n`;
  return code;
};

javascriptGenerator.forBlock['set_motor_pins'] = function(block) {
  var motorA_1A = block.getFieldValue('motorA_1A');
  var motorA_1B = block.getFieldValue('motorA_1B');
  var motorB_1A = block.getFieldValue('motorB_1A');
  var motorB_1B = block.getFieldValue('motorB_1B');
  
  var code = `
var motorA_1A = ${motorA_1A};
var motorA_1B = ${motorA_1B};
var motorB_1A = ${motorB_1A};
var motorB_1B = ${motorB_1B};
GPIO.setup(motorA_1A, GPIO.OUT);
GPIO.setup(motorA_1B, GPIO.OUT);
GPIO.setup(motorB_1A, GPIO.OUT);
GPIO.setup(motorB_1B, GPIO.OUT);\n`;
  
  return code;
}
javascriptGenerator.forBlock['delay'] = function(block) {
  var seconds = block.getFieldValue('seconds');
  var milliseconds = seconds * 1000; // chuyển đổi từ giây sang mili giây
  var code = `await new Promise(resolve => setTimeout(resolve, ${milliseconds}));\n`;
  return code;
};

// Python Generator 

pythonGenerator.forBlock['test_react_field'] = function (block) {
  return "print('custom block');\n";
};
pythonGenerator.forBlock['variable_typed'] = function(block) {
  // Lấy tên của biến từ trường VAR_NAME
  var variableName = pythonGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Names.NameType.VARIABLE);
  
  // Lấy giá trị mặc định từ trường DEFAULT_VALUE
  var defaultValue = JSON.stringify(block.getFieldValue('DEFAULT_VALUE')) || '"Hello World"'; // Đảm bảo giá trị chuỗi
  
  // Tạo mã JavaScript để gán giá trị mặc định
  var code = variableName + ' = ' + defaultValue + ';\n';
  return code;
};

pythonGenerator.forBlock['variable_untyped'] = function(block) {
  // Print statement.
  var variableName = pythonGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME2'), Blockly.Names.NameType.VARIABLE);

  var argument0 = pythonGenerator.valueToCode(block, 'VALUE_Variable', pythonGenerator.ORDER_NONE || 0) || '\'\'';
  var code = variableName + ' = ' + argument0 + ';\n';
  return code;
};

pythonGenerator.forBlock['set_motor_speed'] = function(block) {
  var left_speed = block.getFieldValue('left_speed');
  var right_speed = block.getFieldValue('right_speed');
  var code = `robot.value = (${left_speed}, ${right_speed})\n`;
  return code;
};

pythonGenerator.forBlock['set_motor_pins'] = function(block) {
  var motorA_1A = block.getFieldValue('motorA_1A');
  var motorA_1B = block.getFieldValue('motorA_1B');
  var motorB_1A = block.getFieldValue('motorB_1A');
  var motorB_1B = block.getFieldValue('motorB_1B');
  
  var code = `
motorA_1A = ${motorA_1A}
motorA_1B = ${motorA_1B}
motorB_1A = ${motorB_1A}
motorB_1B = ${motorB_1B}
GPIO.setup(motorA_1A, GPIO.OUT)
GPIO.setup(motorA_1B, GPIO.OUT)
GPIO.setup(motorB_1A, GPIO.OUT)
GPIO.setup(motorB_1B, GPIO.OUT)
robot = Robot(right=(motorA_1A, motorA_1B), left=(motorB_1A, motorB_1B))
\n`;
pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO';
pythonGenerator.definitions_['import_robot'] = 'from gpiozero import Robot';
  
  return code;
};
pythonGenerator.forBlock['delay'] = function(block) {
  var seconds = block.getFieldValue('seconds');
  var code = `time.sleep(${seconds})\n`;
  return code;
};
