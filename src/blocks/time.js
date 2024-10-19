import * as Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

var TIME_HUE = 140;

Blockly.Blocks['sleep_ms'] = {
    /**
     * Description.
     */
    init: function() {
      this.setHelpUrl('');
      this.setColour(TIME_HUE);
      this.appendDummyInput('')
          .appendField('wait')
          .appendField(
              new Blockly.FieldDropdown([['100 milliseconds', '100'], ['500 milliseconds', '500'], ['1 second', '1000'], ['5 seconds', '5000']]),
             'SLEEP_TIME_MILI')
          .appendField('milliseconds');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Wait specific time in milliseconds');
    }
  };
  /**
   * JavaScript code generator for sleep_ms block.
   * @param {!Blockly.Block} block Block to generate the code from.
   * @return {string} Completed code.
   */
  javascriptGenerator.forBlock['sleep_ms'] = function(block) {
      var delayTime = block.getFieldValue('SLEEP_TIME_MILI') || '0';
      var code = 'delayMs(' + delayTime + ')';
      return code;
  };
  
  /**
   * Python code generator for sleep_ms block.
   * @param {!Blockly.Block} block Block to generate the code from.
   * @return {string} Completed code.
   */
  pythonGenerator.forBlock['sleep_ms'] = function(block) {
      var delayTime = block.getFieldValue('SLEEP_TIME_MILI') || '0';
      pythonGenerator.definitions_['import_sleep'] = 'from time import sleep';
      var code = 'sleep(' + (parseFloat(delayTime) / 1000) + ')\n';
      return code;
  };
  