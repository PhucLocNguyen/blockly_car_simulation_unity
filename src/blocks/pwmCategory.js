import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import '../fields/BlocklyReactField';
import { pythonGenerator } from 'blockly/python';
import { PINS } from './pinCategory';

// Định nghĩa block 'pwm_setup'
Blockly.Blocks['pwm_setup'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField('%{BKY_PWM_SETUP_PIN}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('%{BKY_PWM_SETUP_FREQUENCY}')
        .appendField(new Blockly.FieldNumber(1000, 1), 'FREQUENCY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_PWM_SETUP_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['pwm_setup'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var frequency = block.getFieldValue('FREQUENCY');
  var code = `setupPWM(${pin}, ${frequency});\n`;
  return code;
};

pythonGenerator.forBlock['pwm_setup'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var frequency = block.getFieldValue('FREQUENCY');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  var code = `pwm = GPIO.PWM(${pin}, ${frequency})\n`;
  return code;
};

// Định nghĩa block 'pwm_start_stop'
Blockly.Blocks['pwm_start_stop'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField('%{BKY_PWM_START_STOP_ACTION}')
        .appendField(new Blockly.FieldDropdown([['%{BKY_PWM_START}', 'START'], ['%{BKY_PWM_STOP}', 'STOP']]), 'ACTION')
        .appendField('%{BKY_PWM_ON_PIN}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_PWM_START_STOP_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['pwm_start_stop'] = function(block) {
  var action = block.getFieldValue('ACTION');
  var pin = block.getFieldValue('PIN');
  var code = (action === 'START') ? `startPWM(${pin});\n` : `stopPWM(${pin});\n`;
  return code;
};

pythonGenerator.forBlock['pwm_start_stop'] = function(block) {
  var action = block.getFieldValue('ACTION');
  var pin = block.getFieldValue('PIN');
  var code = (action === 'START') ? `pwm.start(0)\n` : `pwm.stop()\n`;
  return code;
};

// Định nghĩa block 'pwm_change_duty_cycle'
Blockly.Blocks['pwm_change_duty_cycle'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField('%{BKY_PWM_CHANGE_DUTY_CYCLE_PIN}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('%{BKY_PWM_CHANGE_DUTY_CYCLE_TO}')
        .appendField(new Blockly.FieldNumber(0, 0, 100), 'DUTY_CYCLE')
        .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_PWM_CHANGE_DUTY_CYCLE_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['pwm_change_duty_cycle'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var dutyCycle = block.getFieldValue('DUTY_CYCLE');
  var code = `changePWMDutyCycle(${pin}, ${dutyCycle});\n`;
  return code;
};

pythonGenerator.forBlock['pwm_change_duty_cycle'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var dutyCycle = block.getFieldValue('DUTY_CYCLE');
  var code = `pwm.ChangeDutyCycle(${dutyCycle})\n`;
  return code;
};