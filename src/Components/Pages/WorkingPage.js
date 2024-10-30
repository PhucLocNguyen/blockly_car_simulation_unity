import logo from "../../Assets/logoApp.jpg";

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "../../Blockly";

// import './blocks/customblocks';
// import './blocks/gpio';  // Import file gpio.js chứa khối GPIO
import "../../generator/generator";
// import "./blocks/text"
// import "./Components/Gpio_simulator"
// import "./blocks/mathBlocks"
// import "./time.js"
import "../../blocks/exportBlocks";

import { t } from "i18next";
import { useState } from "react";
function WorkingPage() {
  const [xmlRemember] = useState(localStorage.getItem("blocklyCache") || "");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BlocklyComponent
          readOnly={false}
          trashcan={true}
          media={"media/"}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          initialXml={xmlRemember}
        >
          {/* Danh mục các khối cơ bản*/}
          <Category name={t("category_Basic")} colour="85">
            <Block type="sleep_ms" />
            <Block type="pin_binary" />
          </Category>
          {/* Danh mục các khối logic */}
          <Category name={t("category_Logic")} colour="210">
            <Block type="controls_ifelse" />
            <Block type="logic_compare_custom">
              <Value name="LEFT">
                <Shadow type="math_number">
                  <Field name="NUM"></Field>
                </Shadow>
              </Value>
              <Value name="RIGHT">
                <Shadow type="math_number">
                  <Field name="NUM"></Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_compare_string_custom">
              <Value name="LEFT">
                <Shadow type="text">
                  <Field name="TEXT">Default String 1</Field>
                </Shadow>
              </Value>
              <Value name="RIGHT">
                <Shadow type="text">
                  <Field name="TEXT">Default String 2</Field>
                </Shadow>
              </Value>
            </Block>
          </Category>
          {/* Danh mục các khối vòng lặp */}
          <Category name={t("category_Loops")} colour="120">
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM"></Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="forever_loop" />
            <Block type="controls_whileUntil" />
          </Category>
          {/* Danh mục các khối Digital I/O */}
          <Category name={t("category_Pin")} colour="50">
            <Block type="gpio_read_digital" />
            <Block type="gpio_set_digital" />
            <Block type="gpio_cleanup" />
          </Category>
          {/* Danh mục các khối PWM Control */}
          <Category name={t("category_Pwm_Control")} colour="10">
            <Block type="pwm_setup" />
            <Block type="pwm_start_stop" />
            <Block type="pwm_change_duty_cycle" />
          </Category>
          {/* Danh mục các khối lấy dữ liệu Sensor */}
          <Category name={t("category_Sensors")} colour="180">
            <Block type="ultrasonic_sensor_trigger" />
            <Block type="temperature_sensor_read" />
          </Category>
          {/* Danh mục các khối xử lý sự kiện */}

          {/* Danh mục các khối hàm tùy chỉnh */}
          <Category name={t("category_Function")} colour="290">
            <Block type="define_custom_function" />
            <Block type="call_custom_function" />
            <Block type="procedures_ifreturn" />
          </Category>
          {/* Danh mục các khối Text */}
          <Category name={t("category_Math")} colour="250">
            <Block type="math_number" />
            <Block type="math_arithmetic" />
            <Block type="math_single" />
            <Block type="math_constant" />
            <Block type="math_random_int" />
            <Block type="math_random_float" />
            <Block type="math_round" />
            <Block type="math_on_list" />
          </Category>
          <Category name={t("category_Text")} colour="162">
            <Block type="text" />
            <Block type="text_join" />
            <Block type="text_append" />
            <Block type="text_isEmpty" />
            <Block type="text_getSubstring" />
            <Block type="text_reverse" />
            <Block type="text_count" />
            <Block type="text_charAt" />
          </Category>
          {/* Danh mục các khối biến */}
          <Category
            name={t("category_Variable")}
            colour="320"
            custom="VARIABLE"
          >
            <Block type="variable_untyped" />
            <Block type="variable_typed" />
            <Block type="text_print">
              <Value name="VALUE">
                <Shadow type="text">
                  <Field name="TEXT">Hello World</Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="variables_get">
              <Field name="VAR">Y</Field>
            </Block>
            <Block type="variables_set">
              <field name="VAR">x</field>
              <value name="VALUE">
                <shadow type="math_number">
                  <field name="NUM">5</field>
                </shadow>
              </value>
            </Block>
          </Category>

          {/* Danh mục các khối của FSTEM */}
          <Category name={t("category_FSTEM_Library")} colour="193">
            <Block type="gpio_setup_board" />
            <Block type="set_motor_speed" />
            <Block type="set_motor_pins" />
          </Category>
        </BlocklyComponent>
      </header>
    </div>
  );
}

export default WorkingPage;
