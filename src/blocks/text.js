import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript'; // Import JavaScript generator
import { pythonGenerator } from 'blockly/python';

/** Overwriting JavaScript generator to print into the html "fake console" */
javascriptGenerator.forBlock['text_print'] = function(block) {
  // Print statement.
  var argument0 = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE || 0) || '\'\'';
  return 'console.log(' + argument0 + ');\n';
};

pythonGenerator.forBlock['text_print'] = function(block) {
  // Print statement.
  var argument0 = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE || 0) || '\'\'';
  return 'print(' + argument0 + ');\n';
};
