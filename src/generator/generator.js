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








javascriptGenerator.forBlock['delay'] = function(block) {
  var seconds = block.getFieldValue('seconds');
  var milliseconds = seconds * 1000; // chuyển đổi từ giây sang mili giây
  var code = `await new Promise(resolve => setTimeout(resolve, ${milliseconds}));\n`;
  return code;
};

javascriptGenerator.forBlock['logic_compare_custom'] = function(block) {
  var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC);
  var operator = block.getFieldValue('OPERATOR');
  var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC);
  var code = `${leftValue} ${operator} ${rightValue}`;
  return [code, javascriptGenerator.ORDER_NONE];
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






pythonGenerator.forBlock['delay'] = function(block) {
  var seconds = block.getFieldValue('seconds');
  var code = `time.sleep(${seconds})\n`;
  return code;
};

pythonGenerator.forBlock['logic_compare_custom'] = function(block) {
  var leftValue = block.getFieldValue('LEFT');
  if(leftValue == null) leftValue =0;
  var operator = block.getFieldValue('OPERATOR');
  var rightValue = block.getFieldValue('RIGHT');
  if(rightValue == null) rightValue =0;
  var code = `${leftValue} ${operator} ${rightValue}`;
  return code;
};
