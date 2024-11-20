import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // Import các khối mặc định
import { pythonGenerator } from "blockly/python";
var GPIO_HUE = 230;



Blockly.Blocks['event_block_LineTracking'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Khi xe chạy trên line");
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setColour(GPIO_HUE);
        this.setTooltip("Block này thực thi các khối bên trong khi sự kiện xảy ra");
        this.setHelpUrl("");
    }
};


javascriptGenerator.forBlock['event_block_LineTracking'] = function (block) {
    var statements_do = javascriptGenerator.statementToCode(block, 'DO');
    var code = `function listenEventLineTracking(event) {\n Data_sensor=event?.detail;\n ${statements_do}}\;window.addEventListener("UnityData", listenEventLineTracking);\n\n`;
    return code;
};

pythonGenerator.forBlock['event_block_LineTracking'] = function (block) {
    var statements_do = pythonGenerator.statementToCode(block, 'DO');
    var code = `def on_event():\n${statements_do}\non_event()\n`;
    return code;
};