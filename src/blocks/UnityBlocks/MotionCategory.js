import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
var GPIO_HUE = 30;
// Define 'set_car_speed_angle' block
Blockly.Blocks['set_car_speed_angle'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('%{BKY_SET_CAR_SPEED_ANGLE_TITLE}')
          .appendField('%{BKY_SET_CAR_SPEED_LEFT}')
          .appendField(new Blockly.FieldNumber(100, 1), 'left_speed') // Tốc độ từ -100 đến 100, tăng 1 đơn vị
          .appendField('%{BKY_SET_CAR_SPEED_RIGHT}')
          .appendField(new Blockly.FieldNumber(100,  1), 'right_speed') // Tốc độ từ -100 đến 100, tăng 1 đơn vị
          .appendField('%{BKY_SET_CAR_ANGLE}')
          .appendField(new Blockly.FieldNumber(0, -30, 30, 1), 'angle'); // Góc từ -30 đến 30, tăng 1 đơn vị
      this.setColour(160);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('%{BKY_SET_CAR_SPEED_ANGLE_TOOLTIP}');
      this.setHelpUrl('');
    }
};


  // JavaScript generator for 'set_car_speed_angle' block
javascriptGenerator.forBlock['set_car_speed_angle'] = function(block) {
    var left_speed = block.getFieldValue('left_speed');
    var right_speed = block.getFieldValue('right_speed');
    var angle = block.getFieldValue('angle');
    var code = `sendMessage("Maruti800", "MoveCar", "${left_speed},${right_speed},${left_speed},${right_speed},${angle},3");\n`;
    return code;
  };
  
  // Python generator for 'set_car_speed_angle' block
  pythonGenerator.forBlock['set_car_speed_angle'] = function(block) {
    var left_speed = block.getFieldValue('left_speed');
    var right_speed = block.getFieldValue('right_speed');
    var angle = block.getFieldValue('angle');
    
    var code = `robot.value = (${left_speed}, ${right_speed}); robot.angle = ${angle}\n`;
    return code;
  };
  