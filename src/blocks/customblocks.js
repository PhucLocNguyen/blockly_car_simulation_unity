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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';

const testReactField = {
  type: 'test_react_field',
  message0: 'custom field %1',
  args0: [
    {
      type: 'field_react_component',
      name: 'FIELD',
      text: 'Click me',
    },
  ],
  previousStatement: null,
  nextStatement: null,
};

Blockly.Blocks['test_react_field'] = {
  init: function () {
    this.jsonInit(testReactField);
    this.setStyle('loop_blocks');
  },
};
Blockly.Blocks['text_print'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(null) // Cho phép kết nối bất kỳ giá trị nào (chuỗi, số, biến,...)
        .appendField('print'); // Văn bản mô tả khối

    this.setColour(160); // Màu sắc của khối
    this.setPreviousStatement(true, null); // Có thể kết nối từ khối khác phía trước
    this.setNextStatement(true, null); // Có thể kết nối tới khối khác phía sau

    this.setTooltip('Print the value of the input.'); // Mô tả khối khi di chuột qua
    this.setHelpUrl('');
  }
};

Blockly.Blocks["variable_untyped"] = {
  init: function() {
    this.appendDummyInput()
        .appendField('variable:')
        .appendField(new Blockly.FieldVariable('x'), 'FIELDNAME');
  }
}
Blockly.Blocks["variable_typed"] = {
  init: function() {
    this.appendDummyInput()
      .appendField('variable:')
      .appendField(new Blockly.FieldVariable(
          'X', // Tên mặc định của biến
          null, // Function để lọc biến, null để không lọc
          ['Number', 'String'], // Danh sách kiểu dữ liệu của biến
          'String' // Kiểu dữ liệu mặc định là String
      ), 'VAR_NAME')
      .appendField(" = ")
      .appendField(new Blockly.FieldTextInput('Hello World'), 'DEFAULT_VALUE'); // Giá trị mặc định

    this.setColour(230); // Đặt màu cho khối
    this.setPreviousStatement(true, null); // Cho phép kết nối với khối khác phía trên
    this.setNextStatement(true, null); // Cho phép kết nối với khối khác phía dưới

    this.setTooltip("Create a variable with a default value.");
    this.setHelpUrl("");
  }
};

// Setup BCM - GPIO
Blockly.Blocks['gpio_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set GPIO mode")
        .appendField(new Blockly.FieldDropdown([["BCM", "BCM"], ["BOARD", "BOARD"]]), "mode");
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['set_motor_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set motor speed")
        .appendField("left")
        .appendField(new Blockly.FieldNumber(0.5), "left_speed")
        .appendField("right")
        .appendField(new Blockly.FieldNumber(0.5), "right_speed");
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['set_motor_pins'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set motor pins")
        .appendField("Motor A (forward, backward)")
        .appendField(new Blockly.FieldNumber(12), "motorA_1A")
        .appendField(new Blockly.FieldNumber(13), "motorA_1B");
    this.appendDummyInput()
        .appendField("Motor B (forward, backward)")
        .appendField(new Blockly.FieldNumber(10), "motorB_1A")
        .appendField(new Blockly.FieldNumber(11), "motorB_1B");
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Set the GPIO pins for the motors.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['delay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Delay for")
        .appendField(new Blockly.FieldNumber(1, 0), "seconds")
        .appendField("seconds");
    this.setColour(120);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Pause the program for a specific amount of time.");
    this.setHelpUrl("");
  }
};
