import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './gpio';

// PWM Setup Block
Blockly.Blocks['pwm_setup'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField('setup PWM on pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('with frequency (Hz)')
        .appendField(new Blockly.FieldNumber(1000, 1), 'FREQUENCY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Setup PWM with a specific frequency.');
  }
};

javascriptGenerator['pwm_setup'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var frequency = block.getFieldValue('FREQUENCY');
  var code = `setupPWM(${pin}, ${frequency});\n`;
  return code;
};

pythonGenerator['pwm_setup'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var frequency = block.getFieldValue('FREQUENCY');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  var code = `pwm = GPIO.PWM(${pin}, ${frequency})\n`;
  return code;
};

// PWM Start/Stop Block
Blockly.Blocks['pwm_start_stop'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['start', 'START'], ['stop', 'STOP']]), 'ACTION')
        .appendField('PWM on pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Start or stop PWM on a specific pin.');
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

// PWM Change Duty Cycle Block
Blockly.Blocks['pwm_change_duty_cycle'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField('change PWM duty cycle on pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('to')
        .appendField(new Blockly.FieldNumber(0, 0, 100), 'DUTY_CYCLE')
        .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Change the duty cycle of PWM on a specific pin.');
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
