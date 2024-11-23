import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // Import các khối mặc định
import { pythonGenerator } from "blockly/python";
var GPIO_HUE = 230;
Blockly.Blocks["event_block_obstacle"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Khi tiếp xúc với vật cản ")
      .appendField(
        new Blockly.FieldNumber(0, 0, 1000, 1),
        "distance_event_count"
      )
      .appendField(" m");
    this.appendStatementInput("DO").setCheck(null).appendField("thực thi");
    this.setColour(GPIO_HUE);
    this.setTooltip("Block này thực thi các khối bên trong khi sự kiện xảy ra");
    this.setHelpUrl("");
  },
};

javascriptGenerator.forBlock["event_block_obstacle"] = function (block) {
  var statements_do = javascriptGenerator.statementToCode(block, "DO");
  var code = `function onEvent() {\n${statements_do}}\nonEvent();\n`;
  return code;
};

pythonGenerator.forBlock["event_block_obstacle"] = function (block) {
  var statements_do = pythonGenerator.statementToCode(block, "DO");
  var code = `def on_event():\n${statements_do}\non_event()\n`;
  return code;
};
Blockly.Blocks["Road_map_normal"] = {
  init: function () {
    this.appendDummyInput().appendField(Blockly.Msg["BKY_Road_Map_Normal_TITLE"]);
    this.appendStatementInput("DO").setCheck(null).appendField(Blockly.Msg["BKY_Road_Map_Normal_Execute_title"]);
    this.setColour(GPIO_HUE);
    this.setTooltip(Blockly.Msg["BKY_Road_Map_Normal_toolTip"]);
    this.setHelpUrl("");
  },
};

javascriptGenerator.forBlock["Road_map_normal"] = function (block) {
  var statements_do = javascriptGenerator.statementToCode(block, "DO");
  var code = `function normalRoadRun() {\n${statements_do}}\nnormalRoadRun();\n`;
  return code;
};

pythonGenerator.forBlock["Road_map_normal"] = function (block) {
  var statements_do = pythonGenerator.statementToCode(block, "DO");
  var code = `def nnormalRoadRun():\n${statements_do}\nnnormalRoadRun()\n`;
  return code;
};



