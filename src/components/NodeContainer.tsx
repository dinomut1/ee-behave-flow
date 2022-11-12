import { NodeSpecJSON } from "behave-graph";
import { PropsWithChildren } from "react";
import cx from "classnames";

import { categoryColorMap, colors } from "../util/colors";
import React from "react";
import styles from "../style.scss"

type NodeProps = {
  title: string;
  category?: NodeSpecJSON["category"];
  selected: boolean;
};

export default function NodeContainer({
  title,
  category = "None",
  selected,
  children,
}: PropsWithChildren<NodeProps>) {
  let colorName = categoryColorMap[category];
  if (colorName === undefined) {
    colorName = "red";
  }
  let [backgroundColor, borderColor, textColor] = colors[colorName];
  if (selected) {
    borderColor = "";
  }
  return (
    <div
      className={styles.nodeContainer}
    >
      <div className={`${backgroundColor} ${textColor} px-2 py-1 rounded-t`}>
        {title}
      </div>
      <div
        className={`flex flex-col gap-2 py-2 border-l border-r border-b ${borderColor} `}
      >
        {children}
      </div>
    </div>
  );
}
