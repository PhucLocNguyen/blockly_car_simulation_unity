import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';

// Định nghĩa block 'variable_untyped'
Blockly.Blocks["variable_untyped"] = {
    init: function() {
      this.appendValueInput('VALUE_Variable')
          .appendField('%{BKY_VARIABLE_UNTYPED}')
          .appendField('=')
          .appendField(new Blockly.FieldVariable('Y', true, ['Number', 'String'], 'String'), 'VAR_NAME2');
          this.setPreviousStatement(true, null); // Cho phép kết nối với khối khác phía trên
          this.setNextStatement(true, null); // Cho phép kết nối với khối khác phía dưới
          this.setTooltip("%{BKY_VARIABLE_UNTYPED_TOOLTIP}");
        }
  };

javascriptGenerator.forBlock['variable_untyped'] = function(block) {
    var variableName = javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME2'), Blockly.Names.NameType.VARIABLE);
    var argument0 = javascriptGenerator.valueToCode(block, 'VALUE_Variable', javascriptGenerator.ORDER_NONE || 0) || '';
    var code = 'var ' + variableName + ' = ' + argument0 + ';';
    return code;
};

pythonGenerator.forBlock['variable_untyped'] = function(block) {
    var variableName = pythonGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME2'), Blockly.Names.NameType.VARIABLE);
    var argument0 = pythonGenerator.valueToCode(block, 'VALUE_Variable', pythonGenerator.ORDER_NONE || 0) || '';
    var code = variableName + ' = ' + argument0;
    return code;
};

// Định nghĩa block 'variable_typed'
Blockly.Blocks["variable_typed"] = {
    init: function() {
      this.appendDummyInput()
        .appendField('%{BKY_VARIABLE_TYPED}')
        .appendField(new Blockly.FieldVariable(
            'X', // Tên mặc định của biến
            null, // Function để lọc biến, null để không lọc
            ['Number', 'String'], // Danh sách kiểu dữ liệu của biến
            'String' // Kiểu dữ liệu mặc định là String
        ), 'VAR_NAME')
        .appendField(" = ")
        .appendField(new Blockly.FieldTextInput('Hello World'), 'DEFAULT_VALUE'); // Giá trị mặc định
  
      this.setColour(230); // Đặt màu cho khối
      this.setPreviousStatement(true, null); // Cho phép kết nối với khối khác phía trên
      this.setNextStatement(true, null); // Cho phép kết nối với khối khác phía dưới
  
      this.setTooltip("%{BKY_VARIABLE_TYPED_TOOLTIP}");
      this.setHelpUrl("");
    }
};

javascriptGenerator.forBlock['variable_typed'] = function(block) {
    var variableName = javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Names.NameType.VARIABLE);
    var defaultValue = JSON.stringify(block.getFieldValue('DEFAULT_VALUE')) || '"Hello World"';
    var code = 'var ' + variableName + ' = ' + defaultValue + ';';
    return code;
};

pythonGenerator.forBlock['variable_typed'] = function(block) {
    var variableName = pythonGenerator.nameDB_.getName(block.getFieldValue('VAR_NAME'), Blockly.Names.NameType.VARIABLE);
    var defaultValue = JSON.stringify(block.getFieldValue('DEFAULT_VALUE')) || '"Hello World"';
    var code = variableName + ' = ' + defaultValue;
    return code;
};

// Định nghĩa block 'text_print'
Blockly.Blocks['text_print'] = {
    init: function() {
      this.appendValueInput('VALUE')
          .setCheck(null)
          .appendField('%{BKY_TEXT_PRINT}');
  
      this.setColour(160);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
  
      this.setTooltip('%{BKY_TEXT_PRINT_TOOLTIP}');
      this.setHelpUrl('');
    }
};

javascriptGenerator.forBlock['text_print'] = function(block) {
    var argument0 = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE || 0) || '';
    return 'console.log(' + argument0 + ')\n';
};
  
pythonGenerator.forBlock['text_print'] = function(block) {
    var argument0 = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE || 0) || '';
    return 'print(' + argument0 + ')\n';
};

