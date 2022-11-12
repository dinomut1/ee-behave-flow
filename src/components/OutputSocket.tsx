import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Connection, Handle, Position, useReactFlow } from "reactflow";
import { colors, valueTypeColorMap } from "../util/colors";
import { OutputSocketSpecJSON } from "behave-graph";
import { isValidConnection } from "../util/isValidConnection";
import React from "react";
import styles from "../styles.module.scss"

export type OutputSocketProps = {
  connected: boolean;
} & OutputSocketSpecJSON;

export default function OutputSocket({
  connected,
  valueType,
  name,
}: OutputSocketProps) {
  const instance = useReactFlow();
  const isFlowSocket = valueType === "flow";
  let colorName = valueTypeColorMap[valueType];
  if (colorName === undefined) {
    colorName = "red";
  }
  const [backgroundColor, borderColor] = colors[colorName];
  const showName = isFlowSocket === false || name !== "flow";

  return (
    <div className={styles.outputSocket}>
      {showName && <div className={styles.socketName}>{name}</div>}
      {isFlowSocket && (
        <FontAwesomeIcon
          icon={faCaretRight}
          color="#ffffff"
          size="lg"
          className={styles.flowIcon}
        />
      )}

      <Handle
        id={name}
        type="source"
        position={Position.Right}
        className={styles.handle}
        isValidConnection={(connection: Connection) =>
          isValidConnection(connection, instance)
        }
      />
    </div>
  );
}
