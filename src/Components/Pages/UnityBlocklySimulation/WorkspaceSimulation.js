import logo from "../../../Assets/logoApp.jpg";

import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Category,
} from "../../../Blockly";

// import './blocks/customblocks';
// import './blocks/gpio';  // Import file gpio.js chứa khối GPIO
import "../../../generator/generator";
// import "./blocks/text"
// import "./Components/Gpio_simulator"
// import "./blocks/mathBlocks"
// import "./time.js"
import WestIcon from "@mui/icons-material/West";
import "../../../blocks/exportBlocks";
import { IconButton } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { t } from "i18next";
import { useState } from "react";
import BlocklyUnityComponent from "../../../Blockly/UnityBlockly/BlocklyUnityComponent";
import Header from "./Header";
function WorkspaceSimulation({projectId, xmlRemember}) {

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <div className="bg-white w-full py-4">
          <Link to="/">
            <IconButton >
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
          projectId ={projectId}
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
        </BlocklyUnityComponent>
      </header>
    </div>
  );
}

export default WorkspaceSimulation;
