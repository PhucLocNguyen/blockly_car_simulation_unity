import * as Blockly from 'blockly/core';
// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

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