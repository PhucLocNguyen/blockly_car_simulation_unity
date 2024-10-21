import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './pinCategory';
var GPIO_HUE = 30;

// Định nghĩa block 'gpio_setup_board'
Blockly.Blocks['gpio_setup_board'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('%{BKY_GPIO_SETUP_BOARD_TITLE}')
        .appendField(new Blockly.FieldDropdown([['BCM', 'BCM'], ['BOARD', 'BOARD']]), 'mode');
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_GPIO_SETUP_BOARD_TOOLTIP}');
    this.setHelpUrl('');
  }
};

javascriptGenerator.forBlock['gpio_setup_board'] = function(block) {
  var dropdown_mode = block.getFieldValue('mode');
  var code = `GPIO.setmode(GPIO.${dropdown_mode});\n`;
  return code;
};

pythonGenerator.forBlock['gpio_setup_board'] = function(block) {
  var dropdown_mode = block.getFieldValue('mode');
  var code = `GPIO.setmode(GPIO.${dropdown_mode})\n`;
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  return code;
};

// Định nghĩa block 'set_motor_speed'
Blockly.Blocks['set_motor_speed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('%{BKY_SET_MOTOR_SPEED_TITLE}')
        .appendField('%{BKY_SET_MOTOR_SPEED_LEFT}')
        .appendField(new Blockly.FieldNumber(0.5), 'left_speed')
        .appendField('%{BKY_SET_MOTOR_SPEED_RIGHT}')
        .appendField(new Blockly.FieldNumber(0.5), 'right_speed');
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_SET_MOTOR_SPEED_TOOLTIP}');
    this.setHelpUrl('');
  }
};

javascriptGenerator.forBlock['set_motor_speed'] = function(block) {
  var left_speed = block.getFieldValue('left_speed');
  var right_speed = block.getFieldValue('right_speed');
  var code = `robot.value = (${left_speed}, ${right_speed});\n`;
  return code;
};

pythonGenerator.forBlock['set_motor_speed'] = function(block) {
  var left_speed = block.getFieldValue('left_speed');
  var right_speed = block.getFieldValue('right_speed');
  var code = `robot.value = (${left_speed}, ${right_speed})\n`;
  return code;
};

// Định nghĩa block 'set_motor_pins'
Blockly.Blocks['set_motor_pins'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('%{BKY_SET_MOTOR_PINS_TITLE}')
        .appendField('%{BKY_SET_MOTOR_PINS_MOTOR_A}')
        .appendField(new Blockly.FieldDropdown(PINS), 'motorA_1A')
        .appendField(new Blockly.FieldDropdown(PINS), 'motorA_1B');
    this.appendDummyInput()
        .appendField('%{BKY_SET_MOTOR_PINS_MOTOR_B}')
        .appendField(new Blockly.FieldDropdown(PINS), 'motorB_1A')
        .appendField(new Blockly.FieldDropdown(PINS), 'motorB_1B');
    this.setColour(230);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_SET_MOTOR_PINS_TOOLTIP}');
    this.setHelpUrl('');
  }
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

// Định nghĩa block 'define_custom_function'
Blockly.Blocks['define_custom_function'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(300);
    this.appendDummyInput()
        .appendField('%{BKY_DEFINE_CUSTOM_FUNCTION_TITLE}')
        .appendField(new Blockly.FieldTextInput('myFunction'), 'FUNC_NAME');
    this.appendStatementInput('DO')
        .appendField('%{BKY_DEFINE_CUSTOM_FUNCTION_DO}');
    this.setTooltip('%{BKY_DEFINE_CUSTOM_FUNCTION_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['define_custom_function'] = function(block) {
  var functionName = block.getFieldValue('FUNC_NAME');
  var statements = javascriptGenerator.statementToCode(block, 'DO');
  var code = `function ${functionName}() {\n${statements}}\n`;
  javascriptGenerator.definitions_[functionName] = code;
  return '';
};

pythonGenerator.forBlock['define_custom_function'] = function(block) {
  var functionName = block.getFieldValue('FUNC_NAME');
  var statements = pythonGenerator.statementToCode(block, 'DO');
  var code = `def ${functionName}():\n${statements}`;
  pythonGenerator.definitions_[functionName] = code;
  return '';
};

// Định nghĩa block 'call_custom_function'
Blockly.Blocks['call_custom_function'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(300);
    this.appendDummyInput()
        .appendField('%{BKY_CALL_CUSTOM_FUNCTION_TITLE}')
        .appendField(new Blockly.FieldDropdown(function() {
          var functionNames = Blockly.getMainWorkspace().getBlocksByType('define_custom_function', false).map(block => {
            return [block.getFieldValue('FUNC_NAME'), block.getFieldValue('FUNC_NAME')];
          });
          return functionNames.length ? functionNames : [['myFunction', 'myFunction']];
        }), 'FUNC_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_CALL_CUSTOM_FUNCTION_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['call_custom_function'] = function(block) {
  var functionName = block.getFieldValue('FUNC_NAME');
  var code = `${functionName}();\n`;
  return code;
};

pythonGenerator.forBlock['call_custom_function'] = function(block) {
  var functionName = block.getFieldValue('FUNC_NAME');
  var code = `${functionName}()\n`;
  return code;
};

