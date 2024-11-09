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
            <Block type="event_block_LineTracking" />

          </Category>
          <Category name={t("BlocklyUnityPage_Toolbar_CarMotion")} colour="50">
            <Block type="set_car_speed_angle" />
          </Category>
        </BlocklyUnityComponent>
      </header>
    </div>
  );
}

export default WorkspaceSimulation;
