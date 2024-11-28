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
      .appendField(new Blockly.FieldNumber(0, -100, 100, 1), "leftSpeed") // Tốc độ từ -100 đến 100, tăng 1 đơn vị
      .appendField("%{BKY_SET_CAR_SPEED}")
      .appendField(new Blockly.FieldNumber(0, -100, 100, 1), "rightSpeed")
      .appendField(Blockly.Msg["BKY_SET_CAR_DURATION"])
      .appendField(new Blockly.FieldNumber(0, -30, 30, 1), "duration"); // Góc từ -30 đến 30, tăng 1 đơn vị

    this.setColour(GPIO_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("%{BKY_SET_CAR_SPEED_ANGLE_TOOLTIP}");
    this.setHelpUrl("");
  },
};

// JavaScript generator for 'set_car_speed_angle' block
javascriptGenerator.forBlock["set_car_speed_angle"] = function (block) {
  var leftSpeed = block.getFieldValue("leftSpeed");
  var rightSpeed = block.getFieldValue("rightSpeed");
  var duration = block.getFieldValue("duration");
  var code = `car.moveCar(${leftSpeed},${rightSpeed},${duration});\n`;
  return code;
};

// Python generator for 'set_car_speed_angle' block
pythonGenerator.forBlock["set_car_speed_angle"] = function (block) {
  var leftSpeed = block.getFieldValue("leftSpeed");
  var rightSpeed = block.getFieldValue("rightSpeed");
  var duration = block.getFieldValue("duration");
  var code = `robot.value = (${leftSpeed});\n`;
  return code;
};

Blockly.Blocks["set_car_speed_NOLIMIT"] = {
  init: function () {
    this.appendDummyInput().appendField(Blockly.Msg['SET_CAR_MOVE_SPEED'] );  // English version using Blockly.Msg
    this.appendDummyInput().appendField(Blockly.Msg['SET_CAR_LEFT_SPEED'] );
    this.appendValueInput("LEFT_SPEED").setCheck("Number"); // Editable number field for left wheel speed
    this.appendDummyInput().appendField(Blockly.Msg['SET_CAR_RIGHT_SPEED'] );
    this.appendValueInput("RIGHT_SPEED").setCheck("Number"); // Editable number field for right wheel speed
    this.setInputsInline(true); // All elements in one line
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(GPIO_HUE); // Block color
    this.setTooltip(Blockly.Msg['SET_CAR_SPEED_TOOLTIP']); // Tooltip explaining the action
    this.setHelpUrl(""); // Provide a help URL if required
  },
};

// JavaScript generator for 'set_car_speed_NOLIMIT' block
javascriptGenerator.forBlock["set_car_speed_NOLIMIT"] = function (block) {
  // Get the values for the left and right speed inputs
  var leftSpeed = javascriptGenerator.valueToCode(block, "LEFT_SPEED", javascriptGenerator.ORDER_ATOMIC);
  var rightSpeed = javascriptGenerator.valueToCode(block, "RIGHT_SPEED", javascriptGenerator.ORDER_ATOMIC);

  // Generate the code to set the car speed
  var code = `car.moveCar(${leftSpeed}, ${rightSpeed});\n`;
  console.log(code);

  return code;
};

// Python generator for 'set_car_speed_angle' block
pythonGenerator.forBlock["set_car_speed_angle"] = function (block) {
  var leftSpeed = block.getFieldValue("LEFT_SPEED");
  var rightSpeed = block.getFieldValue("RIGHT_SPEED");

  var code = `robot.value = (${leftSpeed});\n`;
  return code;
};
