import * as Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

/** Common HSV hue for all blocks in this file. */
var GPIO_HUE = 250;

var PINS = [['2', '3'], ['3', '5'], ['4', '7'], ['17', '11'], ['27', '13'],
            ['22', '15'], ['10', '19'], ['9', '21'], ['11', '23'],
            ['14', '8'], ['15', '10'], ['18', '12'], ['23', '16'], ['24', '18'],
            ['25', '22'], ['8', '24'], ['7', '26']];

Blockly.Blocks['led_set'] = {
  /**
   * Description.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('');
    this.setColour(GPIO_HUE);
    this.appendValueInput('STATE', 'pin_value')
        .appendField('set LED on pin#')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('to')
        .setCheck('pin_value');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

/**
 * Description.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
  javascriptGenerator.forBlock['led_set'] = function(block) {
  var pin = block.getFieldValue('PIN');
  
  // Very hackish way to get the BCM pin number, need to create a proper lookup
  // dictionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] === pin) { // Changed == to ===
      pin = PINS[i][0];
      break;
    }
  }

  // Lấy giá trị của trạng thái HIGH/LOW
  var state = javascriptGenerator.valueToCode(
      block, 'STATE', javascriptGenerator.ORDER_ATOMIC) || '0';

  // Tạo định nghĩa cho LED giả lập hoặc điều khiển trực tiếp (tùy vào môi trường)
  javascriptGenerator.definitions_['declare_led' + pin] = 'const led' + pin + ' = new Gpio(' + pin + ', "out");';

  // Sinh mã điều khiển LED
  var code = 'led' + pin + '.writeSync(';
  if (state === 'HIGH') {
    code += '1';  // Set GPIO to HIGH
  } else {
    code += '0';  // Set GPIO to LOW
  }
  code += ');\n';
  
  return code;
};

pythonGenerator.forBlock['led_set'] = function(block) {
  var pin = block.getFieldValue('PIN');
  // Very hackish way to get the BCM pin number, need to create a proper lookup
  // dictionary with a function to generate the dropdown
  for (var i = 0; i < PINS.length; i++) {
    if (PINS[i][1] === pin) { // Changed == to ===
      pin = PINS[i][0];
      break;
    }
  }
  var state = pythonGenerator.valueToCode(
      block, 'STATE', pythonGenerator.ORDER_ATOMIC) || '0';

  pythonGenerator.definitions_['import_gpiozero'] = 'from gpiozero import LED';
  pythonGenerator.definitions_['declare_led' + pin] =
      'led' + pin + ' = LED(' + pin + ')';

  var code = 'led' + pin + '.';
  if (state === 'HIGH') { // Changed == to ===
    code += 'on()\n';
  } else {
    code += 'off()\n';
  }
  return code;
};
