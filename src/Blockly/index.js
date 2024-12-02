/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview XML wrappers for block, category, value, field and shadow.
 * @author samelh@google.com (Sam El-Husseini)
 */

import i18next, { t } from "i18next";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../context/LanguageProvider";
import BlocklyComponent from "./BlocklyComponent";

export default BlocklyComponent;

const Block = (p) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("block", props, children);
};

const Category = (p) => {
  const { language } = useContext(LanguageContext); // Lấy ngôn ngữ từ context
  const { children, name, ...props } = p;
  const [nameCategory, setName]=useState(t(p.name));
  const categoryRef = useRef(null);
  const HandleLanguage = async () => {
    if (language != i18next.language) {
      await i18next.changeLanguage(language);
      console.log(t(p.name));
      setName(t(p.name));
    }
  };
  useEffect(() => {
    console.log(
      "Before difference: " + language + ", i18next: " + i18next.language
    );
    HandleLanguage();
    console.log(
      "After difference: " + language + ", i18next: " + i18next.language
    );
  }, [language]);
  useEffect(() => {
    console.log("first " + i18next.language);
  }, []);
  const changeCategoryValue = (newValue) => {
    if (categoryRef.current) {
      categoryRef.current.setAttribute('value', newValue);  // Thay đổi giá trị của category
    }
  };


  useEffect(() => {
    if (categoryRef.current) {
      changeCategoryValue(nameCategory);  // Ví dụ: thay đổi giá trị category
    }
  }, [nameCategory]);
  props.is = "blockly";
  return React.createElement("category", { ...props,name:nameCategory,ref: categoryRef, key: language }, children);
};

const Value = (p) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("value", props, children);
};

const Field = (p) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("field", props, children);
};

const Shadow = (p) => {
  const { children, ...props } = p;
  props.is = "blockly";
  return React.createElement("shadow", props, children);
};

export { Block, Category, Value, Field, Shadow };
