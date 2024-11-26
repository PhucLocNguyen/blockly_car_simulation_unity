import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // Import các khối mặc định
import { pythonGenerator } from "blockly/python";
var GPIO_HUE = 230;

Blockly.Blocks["Road_map_LineTracking"] = {
  init: function () {
    this.appendDummyInput().appendField(Blockly.Msg['BKY_Road_Map_LineTracking_TITLE']);
    this.appendStatementInput("DO").setCheck(null).appendField(Blockly.Msg['Event_Execute_title']);
    this.setColour(GPIO_HUE);
    this.setTooltip(Blockly.Msg['BKY_Road_Map_LineTracking_toolTip']);
    this.setHelpUrl("");
  },
};

javascriptGenerator.forBlock["Road_map_LineTracking"] = function (block) {
  var statements_do = javascriptGenerator.statementToCode(block, "DO");
  var code = `function listenEventLineTracking(event) {\n var Data_sensor=event?.detail;\n ${statements_do}};\nwindow.addEventListener("UnityData", listenEventLineTracking);\n`;
  return code;
};

pythonGenerator.forBlock["Road_map_LineTracking"] = function (block) {
  var statements_do = pythonGenerator.statementToCode(block, "DO");
  var code = `def on_event():\n${statements_do}\non_event()\n`;
  return code;
};
