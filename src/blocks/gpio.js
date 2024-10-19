import * as Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

var GPIO_HUE = 180;

// Setup BCM - GPIO
Blockly.Blocks['gpio_setup_board'] = {
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

var PINS = [['2', '2'], ['3', '3'], ['4', '4'], ['17', '17'], ['27', '27'],
            ['22', '22'], ['10', '10'], ['9', '9'], ['11', '11'],
            ['14', '14'], ['15', '15'], ['18', '18'], ['23', '23'], ['24', '24'],
            ['25', '25'], ['8', '8'], ['7', '7']];

Blockly.Blocks['gpio_set'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput("")
        .appendField('set GPIO pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('to').appendField(new Blockly.FieldDropdown([["GPIO.IN","GPIO.IN"],["GPIO.OUT","GPIO.OUT"]]),"GPIO_MODE")
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,null);
    this.setTooltip('Set a GPIO pin to GPIO.IN or GPIO.OUT state.');
  }
};

/**
 * Python code generator for gpio_set block.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 javascriptGenerator.forBlock['gpio_set'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var state = block.getFieldValue('GPIO_MODE'); // get value from field
  var code = 'GPIO.setup(' + pin + ', ' + state + ')\n';
  return code;
};
pythonGenerator.forBlock['gpio_set'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var state = block.getFieldValue('GPIO_MODE');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  var code = 'GPIO.setup(' + pin + ',' + state + ')\n';
  return code;
};

Blockly.Blocks['pin_binary'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput('')
        .appendField(
            new Blockly.FieldDropdown([['HIGH', 'HIGH'], ['LOW', 'LOW']]),
           'STATE');
    this.setOutput(true, 'pin_value');
    this.setTooltip('Set a pin state logic High or Low.');
  }
};

/**
 * JavaScript code generator for pin_binary block.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
javascriptGenerator.forBlock['pin_binary'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

/**
 * Python code generator for pin_binary block.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
pythonGenerator.forBlock['pin_binary'] = function(block) {
  var code = block.getFieldValue('STATE');
  return [code, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['gpio_cleanup'] = {
  /**
   * Block for cleaning up GPIO settings.
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput("")
        .appendField('reset GPIO settings');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Resets all GPIO settings to their default state.');
  }
};

pythonGenerator.forBlock['gpio_cleanup'] = function(block) {
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  var code = 'GPIO.cleanup()\n';
  return code;
};
javascriptGenerator.forBlock['gpio_cleanup'] = function(block) {
  var code = 'GPIO.cleanup();\n';
  return code;
};
export {PINS}
