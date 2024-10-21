import * as Blockly from 'blockly/core';
// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['logic_compare_custom'] = {
    init: function() {
        this.appendValueInput("LEFT")
            .setCheck("Number"); // Allows connection to blocks that output a number or direct input
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["=", "="], ["≠", "!="], ["<", "<"], ["‏≤", "<="], [">", ">"], ["‏≥", ">="]]), "OPERATOR");
        this.appendValueInput("RIGHT")
            .setCheck("Number"); // Allows connection to blocks that output a number or direct input
        this.setInputsInline(true);
        this.setOutput(true, "Boolean"); // This block outputs a Boolean
        this.setColour(210); // Adjust the color to match the expected appearance
        this.setTooltip("%{BKY_LOGIC_COMPARE_TOOLTIP}");
        this.setHelpUrl("");
      }
  };

  javascriptGenerator.forBlock['logic_compare_custom'] = function(block) {
    var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC);
    var operator = block.getFieldValue('OPERATOR');
    var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC);
    var code = `${leftValue} ${operator} ${rightValue}`;
    return [code, javascriptGenerator.ORDER_NONE];
  };

pythonGenerator.forBlock['logic_compare_custom'] = function(block) {
    var leftValue = pythonGenerator.valueToCode(block, 'LEFT', pythonGenerator.ORDER_ATOMIC) || '0';
    var operator = block.getFieldValue('OPERATOR');
    var rightValue = pythonGenerator.valueToCode(block, 'RIGHT', pythonGenerator.ORDER_ATOMIC) || '0';
    var code = `${leftValue} ${operator} ${rightValue}`;
    return [code, pythonGenerator.ORDER_RELATIONAL];
};

Blockly.Blocks['logic_compare_string_custom'] = {
  init: function() {
      this.appendValueInput("LEFT")
          .setCheck("String"); // Allows connection to blocks that output a string or direct input
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["=", "=="], ["≠", "!="]]), "OPERATOR");
      this.appendValueInput("RIGHT")
          .setCheck("String"); // Allows connection to blocks that output a string or direct input
      this.setInputsInline(true);
      this.setOutput(true, "Boolean"); // This block outputs a Boolean
      this.setColour(210); // Adjust the color to match the expected appearance
      this.setTooltip("%{BKY_LOGIC_COMPARE_STRING_TOOLTIP}");
      this.setHelpUrl("");
    }
};

// JavaScript Generator
javascriptGenerator.forBlock['logic_compare_string_custom'] = function(block) {
  var leftValue = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC) || '""';
  var operator = block.getFieldValue('OPERATOR');
  var rightValue = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC) || '""';
  var code = `${leftValue} ${operator} ${rightValue}`;
  return [code, javascriptGenerator.ORDER_RELATIONAL];
};

// Python Generator
pythonGenerator.forBlock['logic_compare_string_custom'] = function(block) {
  var leftValue = pythonGenerator.valueToCode(block, 'LEFT', pythonGenerator.ORDER_ATOMIC) || '""';
  var operator = block.getFieldValue('OPERATOR');
  var rightValue = pythonGenerator.valueToCode(block, 'RIGHT', pythonGenerator.ORDER_ATOMIC) || '""';
  var code = `${leftValue} ${operator} ${rightValue}`;
  return [code, pythonGenerator.ORDER_RELATIONAL];
};
