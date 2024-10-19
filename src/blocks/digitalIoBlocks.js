import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './gpio';
var GPIO_HUE = 30
Blockly.Blocks['gpio_set_digital'] = {
    /**
     * Description.
     * @this Blockly.Block
     */
    init: function() {
      this.setHelpUrl('');
      this.setColour(GPIO_HUE);
      this.appendDummyInput("")
          .appendField('set Digital GPIO pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField('to').appendField(new Blockly.FieldDropdown([["HIGH","HIGH"],["LOW","LOW"]]),"GPIO_DIGITAL_MODE")
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true,null);
      this.setTooltip('Set a Digital GPIO pin to high or low state.');
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
    pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
    var code = `GPIO.output(${pin}, GPIO.${mode})\n`;
    return code;
  };
  Blockly.Blocks['gpio_read_digital'] = {
    /**
     * Description.
     * @this Blockly.Block
     */
    init: function() {
      this.setHelpUrl('');
      this.setColour(GPIO_HUE);
      this.appendDummyInput()
          .appendField('read Digital GPIO pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
      this.setOutput(true, 'Boolean');
      this.setTooltip('Read the state of a Digital GPIO pin.');
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
    var code = `GPIO.input(${pin})`;
    return [code, pythonGenerator.ORDER_ATOMIC];
  };
  