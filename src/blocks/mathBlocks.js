import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // Import các khối mặc định
import { pythonGenerator } from "blockly/python";

import '../fields/BlocklyReactField';
var mathChangeJson = {
  "message0": "%{BKY_MATH_CHANGE_TITLE}",
  "args0": [
    {"type": "field_variable", "name": "VAR", "variable": "%{BKY_MATH_CHANGE_VARIABLE}", "variableTypes": [""]},
    {"type": "input_value", "name": "DELTA", "check": "Number"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};

Blockly.Blocks['math_change'] = {
  init: function() {
    this.jsonInit(mathChangeJson);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
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
