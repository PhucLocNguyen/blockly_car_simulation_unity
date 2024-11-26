import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // Import các khối mặc định
import { pythonGenerator } from "blockly/python";

import '../fields/BlocklyReactField';
var mathChangeJson = {
  "message0": "%{BKY_MATH_CHANGE_TITLE}",
  "args0": [
    { "type": "field_variable", "name": "VAR", "variable": "%{BKY_MATH_CHANGE_VARIABLE}", "variableTypes": [""] },
    { "type": "input_value", "name": "DELTA", "check": "Number" }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['math_change'] = {
  init: function () {
    this.jsonInit(mathChangeJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return '%{BKY_MATH_CHANGE_TOOLTIP}'.replace('%1', thisBlock.getFieldValue('VAR'));
    });
  }
};
// Khối cộng
Blockly.Blocks["math_addition"] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField(Blockly.Msg['MATH_ADDITION_TITLE']);
    this.appendValueInput("B")
      .setCheck("Number")
      .appendField("+");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip(Blockly.Msg['MATH_ADDITION_TOOLTIP']);
    this.setHelpUrl("");
  },
};

// Khối trừ
Blockly.Blocks["math_subtraction"] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField(Blockly.Msg['MATH_SUBTRACTION_TITLE']);
    this.appendValueInput("B")
      .setCheck("Number")
      .appendField("-");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip(Blockly.Msg['MATH_SUBTRACTION_TOOLTIP']);
    this.setHelpUrl("");
  },
};

// Khối nhân
Blockly.Blocks["math_multiplication"] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField(Blockly.Msg['MATH_MULTIPLICATION_TITLE']);
    this.appendValueInput("B")
      .setCheck("Number")
      .appendField("*");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip(Blockly.Msg['MATH_MULTIPLICATION_TOOLTIP']);
    this.setHelpUrl("");
  },
};

// Khối chia
Blockly.Blocks["math_division"] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField(Blockly.Msg['MATH_DIVISION_TITLE']);
    this.appendValueInput("B")
      .setCheck("Number")
      .appendField("/");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip(Blockly.Msg['MATH_DIVISION_TOOLTIP']);
    this.setHelpUrl("");
  },
};
//Hàm tìm min
Blockly.Blocks['min_operation'] = {
  init: function() {
      this.appendValueInput("LEFT")
          .setCheck("Number"); // Allows connection to blocks that output a number or direct input
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["min", "min"], ["max", "max"]]), "OPERATOR");
      this.appendValueInput("RIGHT")
          .setCheck("Number"); // Allows connection to blocks that output a number or direct input
      this.setInputsInline(true);
      this.setOutput(true, "Number"); // This block outputs a Boolean
      this.setColour(228); // Adjust the color to match the expected appearance
      this.setTooltip("%{BKY_LOGIC_COMPARE_TOOLTIP}");
      this.setHelpUrl("");
    }
};
//Hàm tìm max
Blockly.Blocks['max_operation'] = {
  init: function () {
    this.appendValueInput("LEFT")
          .setCheck("Number");  // Default value 0, editable number field
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["max", "max"], ["min", "min"]]), "OPERATOR"); // Dropdown for operator
      this.appendValueInput("RIGHT")
      .setCheck("Number"); // Default value 0, editable number field
    this.setInputsInline(true); // All elements in one line
    this.setOutput(true, "Number"); // Outputs a Boolean value (true/false)
    this.setColour(228); // Block color
    this.setTooltip("Compare two numbers to check if they are equal or not.");
    this.setHelpUrl(""); // Provide a help URL if required
  }
};

Blockly.Blocks['random_operation'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['MATH_RANDOM_TITLE']);
          this.appendValueInput("LEFT")
          .setCheck("Number");  // Default value is 0
      this.appendDummyInput()
          .appendField(Blockly.Msg['MATH_RANDOM_TO']);
          this.appendValueInput("RIGHT")
          .setCheck("Number");  // Default value is 100
      this.setInputsInline(true); // Display everything on the same line
      this.setOutput(true, "Number"); // Output type is a number
      this.setColour(228); // Set block color
      this.setTooltip("Trả về một số nguyên ngẫu nhiên trong khoảng được chỉ định.");
      this.setHelpUrl(""); // Add a help URL if necessary
  }
};

Blockly.Blocks['remainder_operation'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['MATH_RANDOM_REMAINDER']);
          this.appendValueInput("LEFT")
          .setCheck("Number");  // Default value is 0
      this.appendDummyInput()
          .appendField("/");
          this.appendValueInput("RIGHT")
          .setCheck("Number");  // Default value is 100
      this.setInputsInline(true); // Display everything on the same line
      this.setOutput(true, "Number"); // Output type is a number
      this.setColour(228); // Set block color
      this.setTooltip("Trả về một số nguyên ngẫu nhiên trong khoảng được chỉ định.");
      this.setHelpUrl(""); // Add a help URL if necessary
  }
};

// Generator cho hàm remainder
javascriptGenerator.forBlock['remainder_operation'] = function(block) {
  var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC);
  var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC);
  var code = `${leftValue} % ${rightValue}`
  return [code, javascriptGenerator.ORDER_NONE];
};

// Generator cho hàm random
javascriptGenerator.forBlock['random_operation'] = function(block) {
  var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC);
  var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC);
  var min = Math.min(leftValue,rightValue);
  var max = Math.max(leftValue,rightValue);
  var code = `Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min}`
  return [code, javascriptGenerator.ORDER_NONE];
};

// Generator cho hàm min
javascriptGenerator.forBlock['min_operation'] = function(block) {
  var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC);
  var operator = block.getFieldValue('OPERATOR');
  var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC);
  var code;
  if(operator == "min"){
    code = `Math.min(${leftValue}, ${rightValue})`
  }else {
     code = `Math.max(${leftValue}, ${rightValue})`
  }
  return [code, javascriptGenerator.ORDER_NONE];
};

// Generator cho max
javascriptGenerator.forBlock['max_operation'] = function(block) {
  var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC);
  var operator = block.getFieldValue('OPERATOR');
  var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC);
  var code;
  if(operator == "min"){
    code = `Math.min(${leftValue}, ${rightValue})`
  }else {
     code = `Math.max(${leftValue}, ${rightValue})`
  }
  return [code, javascriptGenerator.ORDER_NONE];
};

// Generator cho phép cộng
javascriptGenerator.forBlock["math_addition"] = function (block) {
  var value_a = javascriptGenerator.valueToCode(block, "A", javascriptGenerator.ORDER_ATOMIC);
  var value_b = javascriptGenerator.valueToCode(block, "B", javascriptGenerator.ORDER_ATOMIC);
  var code = `${value_a} + ${value_b}`;
  return [code, javascriptGenerator.ORDER_ADDITION];
};

// Generator cho phép trừ
javascriptGenerator.forBlock["math_subtraction"] = function (block) {
  var value_a = javascriptGenerator.valueToCode(block, "A", javascriptGenerator.ORDER_ATOMIC);
  var value_b = javascriptGenerator.valueToCode(block, "B", javascriptGenerator.ORDER_ATOMIC);
  var code = `${value_a} - ${value_b}`;
  return [code, javascriptGenerator.ORDER_SUBTRACTION];
};

// Generator cho phép nhân
javascriptGenerator.forBlock["math_multiplication"] = function (block) {
  var value_a = javascriptGenerator.valueToCode(block, "A", javascriptGenerator.ORDER_ATOMIC);
  var value_b = javascriptGenerator.valueToCode(block, "B", javascriptGenerator.ORDER_ATOMIC);
  var code = `${value_a} * ${value_b}`;
  return [code, javascriptGenerator.ORDER_MULTIPLICATION];
};

// Generator cho phép chia
javascriptGenerator.forBlock["math_division"] = function (block) {
  var value_a = javascriptGenerator.valueToCode(block, "A", javascriptGenerator.ORDER_ATOMIC);
  var value_b = javascriptGenerator.valueToCode(block, "B", javascriptGenerator.ORDER_ATOMIC);
  var code = `${value_a} / ${value_b}`;
  return [code, javascriptGenerator.ORDER_DIVISION];
};
// Generator cho phép cộng
pythonGenerator.forBlock["math_addition"] = function (block) {
  var value_a = pythonGenerator.valueToCode(block, "A", pythonGenerator.ORDER_ATOMIC);
  var value_b = pythonGenerator.valueToCode(block, "B", pythonGenerator.ORDER_ATOMIC);
  var code = `${value_a} + ${value_b}`;
  return [code, pythonGenerator.ORDER_ADDITION];
};

// Generator cho phép trừ
pythonGenerator.forBlock["math_subtraction"] = function (block) {
  var value_a = pythonGenerator.valueToCode(block, "A", pythonGenerator.ORDER_ATOMIC);
  var value_b = pythonGenerator.valueToCode(block, "B", pythonGenerator.ORDER_ATOMIC);
  var code = `${value_a} - ${value_b}`;
  return [code, pythonGenerator.ORDER_SUBTRACTION];
};

// Generator cho phép nhân
pythonGenerator.forBlock["math_multiplication"] = function (block) {
  var value_a = pythonGenerator.valueToCode(block, "A", pythonGenerator.ORDER_ATOMIC);
  var value_b = pythonGenerator.valueToCode(block, "B", pythonGenerator.ORDER_ATOMIC);
  var code = `${value_a} * ${value_b}`;
  return [code, pythonGenerator.ORDER_MULTIPLICATION];
};

// Generator cho phép chia
pythonGenerator.forBlock["math_division"] = function (block) {
  var value_a = pythonGenerator.valueToCode(block, "A", pythonGenerator.ORDER_ATOMIC);
  var value_b = pythonGenerator.valueToCode(block, "B", pythonGenerator.ORDER_ATOMIC);
  var code = `${value_a} / ${value_b}`;
  return [code, pythonGenerator.ORDER_DIVISION];
};
