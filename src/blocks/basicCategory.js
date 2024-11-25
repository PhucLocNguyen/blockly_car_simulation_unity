import * as Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

var TIME_HUE = 140;
// Basic block components translation
Blockly.Blocks['sleep_ms'] = {
    /**
     * Description.
     */
    init: function() {
      this.setHelpUrl('');
      this.setColour(TIME_HUE);
      this.appendDummyInput('')
          .appendField(Blockly.Msg['SLEEP_MS_TITLE'] || 'wait')
          .appendField(
              new Blockly.FieldDropdown([[`100 ${Blockly.Msg['miliseconds_translate']}`, '100'], [`500 ${Blockly.Msg['miliseconds_translate']}`, '500'], [`1 ${Blockly.Msg['1_seconds_translate']}`, '1000'],[`2 ${Blockly.Msg['seconds_translate']}`, '2000'], [`5 ${Blockly.Msg['seconds_translate']}`, '5000']]),
             'SLEEP_TIME_MILI')
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['SLEEP_MS_TOOLTIP'] || 'Wait specific time in milliseconds');
    }
  };
  /**
   * JavaScript code generator for sleep_ms block.
   * @param {!Blockly.Block} block Block to generate the code from.
   * @return {string} Completed code.
   */
  javascriptGenerator.forBlock['sleep_ms'] = function(block) {
      var delayTime = block.getFieldValue('SLEEP_TIME_MILI') || '0';
      var code = 'sleep(' + delayTime + ')\n';
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

  Blockly.Blocks['pin_binary'] = {
    /**
     * Description.
     * @this Blockly.Block
     */
    init: function() {
      this.setHelpUrl('');
      this.setColour(TIME_HUE);
      this.appendDummyInput('')
          .appendField(
              new Blockly.FieldDropdown([[`${Blockly.Msg['High_status']}`, 'HIGH'], [`${Blockly.Msg['Low_status']}`, 'LOW']]),
             'STATE');
      this.setOutput(true, 'pin_value');
      this.setTooltip(`${Blockly.Msg['PIN_BINARY_TOOLTIP']}`);
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