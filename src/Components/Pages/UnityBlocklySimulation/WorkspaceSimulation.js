import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "../../../Blockly";
import "../../../generator/generator";
import WestIcon from "@mui/icons-material/West";
import "../../../blocks/exportBlocks";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { t } from "i18next";
import BlocklyUnityComponent from "../../../Blockly/UnityBlockly/BlocklyUnityComponent";
function WorkspaceSimulation({ projectId, xmlRemember }) {
  return (
    <div className="App">
      <header className="App-header">
        <div className="bg-white w-full py-4">
          <Link to="/">
            <IconButton>
              <WestIcon />
            </IconButton>
          </Link>
        </div>
        <BlocklyUnityComponent
          readOnly={false}
          trashcan={true}
          media={"media/"}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          initialXml={xmlRemember}
          projectId={projectId}
        >
          {/* Danh mục các khối cơ bản*/}
          <Category name={t("category_Basic")} colour="140">
            <Block type="sleep_ms" />
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
          <Category name={t("BlocklyUnityPage_Toolbar_Event")} colour="230">
            <Block type="event_block_obstacle" />
          </Category>
          <Category name={t("BlocklyUnityPage_Toolbar_CarMotion")} colour="50">
            <Block type="set_car_speed_angle" />
          </Category>
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
          <Category
            name={t("category_Create_Variable")}
            colour="320"
            custom="VARIABLE"
          ></Category>
          <Category
            name={t("category_Variable")}
            colour="320"
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
          <Category name={t("category_line_sensor")} colour="380">
            <Block type="variables_get">
              <Field name="VAR">Data_sensor</Field>
            </Block>
            <Block type="Road_map_normal" />
            <Block type="Road_map_LineTracking" />

            <Block type="text_print">
              <Field name="VAR">Data sensor</Field>
            </Block>
          </Category>
        </BlocklyUnityComponent>
      </header>
    </div>
  );
}

export default WorkspaceSimulation;
