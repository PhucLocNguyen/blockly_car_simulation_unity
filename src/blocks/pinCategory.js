import * as Blockly from 'blockly/core';
import '../fields/BlocklyReactField';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
var GPIO_HUE = 30;

var PINS = [
  ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'],
  ['7', '7'], ['8', '8'], ['9', '9'], ['10', '10'], ['11', '11'],
  ['12', '12'], ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'],
  ['17', '17'], ['18', '18'], ['19', '19'], ['20', '20'], ['21', '21'],
  ['22', '22'], ['23', '23'], ['24', '24'], ['25', '25'], ['26', '26'],
  ['27', '27']
];

// Định nghĩa block 'gpio_set_digital'
Blockly.Blocks['gpio_set_digital'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput("")
        .appendField('%{BKY_GPIO_SET_DIGITAL_WRITE_PIN}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('%{BKY_GPIO_SET_DIGITAL_TO}')
        .appendField(new Blockly.FieldDropdown([["1", "HIGH"], ["0", "LOW"]]), "GPIO_DIGITAL_MODE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_GPIO_SET_DIGITAL_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['gpio_set_digital'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var mode = block.getFieldValue('GPIO_DIGITAL_MODE');
  var code = `setGPIO(${pin}, '${mode}');\n`;
  return code;
};

pythonGenerator.forBlock['gpio_set_digital'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var mode = block.getFieldValue('GPIO_DIGITAL_MODE');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO';
  pythonGenerator.definitions_['setupOut ' + pin] = 'GPIO.setup(' + pin + ',GPIO.OUT)';
  var code = `GPIO.output(${pin}, GPIO.${mode})\n`;
  return code;
};

// Định nghĩa block 'gpio_read_digital'
Blockly.Blocks['gpio_read_digital'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput()
        .appendField('%{BKY_GPIO_READ_DIGITAL_PIN}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip('%{BKY_GPIO_READ_DIGITAL_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['gpio_read_digital'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var code = `readGPIO(${pin})`;
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['gpio_read_digital'] = function(block) {
  var pin = block.getFieldValue('PIN');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  pythonGenerator.definitions_['setupIn ' + pin] = 'GPIO.setup(' + pin + ',GPIO.IN)';
  var code = `GPIO.input(${pin})`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Định nghĩa block 'gpio_cleanup'
Blockly.Blocks['gpio_cleanup'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendDummyInput("")
        .appendField('%{BKY_GPIO_CLEANUP}');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_GPIO_CLEANUP_TOOLTIP}');
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