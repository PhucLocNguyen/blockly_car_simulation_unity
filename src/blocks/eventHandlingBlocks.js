import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './gpio';
var GPIO_HUE = 30
Blockly.Blocks['button_press_detection'] = {
    init: function() {
      this.setHelpUrl('');
      this.setColour(210);
      this.appendDummyInput()
          .appendField('when button on pin#')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField('is pressed');
      this.appendStatementInput('DO')
          .appendField('do');
      this.setTooltip('Detect button press on a specific pin and execute statements.');
    }
  };
  
  javascriptGenerator.forBlock['button_press_detection'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var statements = javascriptGenerator.statementToCode(block, 'DO');
    var code = `whenButtonPressed(${pin}, function() {\n${statements}});\n`;
    return code;
  };
  
  pythonGenerator.forBlock['button_press_detection'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var statements = pythonGenerator.statementToCode(block, 'DO');
    pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
    var code = `GPIO.add_event_detect(${pin}, GPIO.FALLING, callback=lambda _: (${statements}))\n`;
    return code;
  };

  Blockly.Blocks['forever_loop'] = {
    init: function() {
      this.setHelpUrl('');
      this.setColour(300);
      this.appendDummyInput()
          .appendField('forever');
      this.appendStatementInput('DO')
          .appendField('do');
      this.setTooltip('Continuously execute the enclosed blocks.');
    }
  };
  
  javascriptGenerator.forBlock['forever_loop'] = function(block) {
    var statements = javascriptGenerator.statementToCode(block, 'DO');
    var code = `while (true) {\n${statements}}\n`;
    return code;
  };
  
  pythonGenerator.forBlock['forever_loop'] = function(block) {
    var statements = pythonGenerator.statementToCode(block, 'DO');
    var code = `while True:\n${statements}`;
    return code;
  };