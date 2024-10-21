import * as Blockly from 'blockly/core';
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