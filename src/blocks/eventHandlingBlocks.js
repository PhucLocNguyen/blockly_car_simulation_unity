import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './pinCategory';
var GPIO_HUE = 30;

// Định nghĩa block 'button_press_detection'
Blockly.Blocks['button_press_detection'] = {
    init: function() {
      this.setHelpUrl('');
      this.setColour(210);
      this.appendDummyInput()
          .appendField('%{BKY_BUTTON_PRESS_TITLE}')
          .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
          .appendField('%{BKY_BUTTON_PRESS_PRESSED}');
      this.appendStatementInput('DO')
          .appendField('%{BKY_BUTTON_PRESS_DO}');
      this.setTooltip('%{BKY_BUTTON_PRESS_TOOLTIP}');
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

// Định nghĩa block 'forever_loop'
Blockly.Blocks['forever_loop'] = {
    init: function() {
      this.setHelpUrl('');
      this.setColour(120);
      this.appendDummyInput()
          .appendField('%{BKY_FOREVER_LOOP_TITLE}');
      this.appendStatementInput('DO')
          .appendField('%{BKY_FOREVER_LOOP_DO}');
      this.setTooltip('%{BKY_FOREVER_LOOP_TOOLTIP}');
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