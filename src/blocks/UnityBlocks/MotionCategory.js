import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import "blockly/blocks"; // Import các khối mặc định
import { pythonGenerator } from "blockly/python";
var GPIO_HUE = 50;
// Define 'set_car_speed_angle' block
Blockly.Blocks["set_car_speed_angle"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("%{BKY_SET_CAR_SPEED_ANGLE_TITLE}")
      .appendField("%{BKY_SET_CAR_SPEED}")
      .appendField(new Blockly.FieldNumber(0, -100, 100, 1), "speed") // Tốc độ từ -100 đến 100, tăng 1 đơn vị
      .appendField("%{BKY_SET_CAR_ANGLE}")
      .appendField(new Blockly.FieldNumber(0, -30, 30, 1), "angle")
      .appendField(Blockly.Msg["BKY_SET_CAR_DURATION"])
      .appendField(new Blockly.FieldNumber(0, -30, 30, 1), "duration");; // Góc từ -30 đến 30, tăng 1 đơn vị

    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("%{BKY_SET_CAR_SPEED_ANGLE_TOOLTIP}");
    this.setHelpUrl("");

  },
};

// JavaScript generator for 'set_car_speed_angle' block
javascriptGenerator.forBlock["set_car_speed_angle"] = function (block) {
  var speed = block.getFieldValue("speed");
  var angle = block.getFieldValue("angle");
  var duration = block.getFieldValue("duration");
  var code = `car.moveCar(${speed},${angle},${duration});\n`;
  return code;
};

// Python generator for 'set_car_speed_angle' block
pythonGenerator.forBlock["set_car_speed_angle"] = function (block) {
  var speed = block.getFieldValue("speed");
  var angle = block.getFieldValue("angle");

  var code = `robot.value = (${speed}); robot.angle = ${angle}\n`;
  return code;
};
