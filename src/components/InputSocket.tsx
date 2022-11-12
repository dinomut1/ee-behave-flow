import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Connection, Handle, Position, useReactFlow } from "reactflow";
import cx from "classnames";
import { colors, valueTypeColorMap } from "../util/colors";
import { InputSocketSpecJSON } from "behave-graph";
import { isValidConnection } from "../util/isValidConnection";
import { AutoSizeInput } from "./AutoSizeInput";
import React from "react";
import styles from "../style.scss"
export type InputSocketProps = {
  connected: boolean;
  value: any | undefined;
  onChange: (key: string, value: any) => void;
} & InputSocketSpecJSON;

export default function InputSocket({
  connected,
  value,
  onChange,
  name,
  valueType,
  defaultValue,
}: InputSocketProps) {
  const instance = useReactFlow();
  const isFlowSocket = valueType === "flow";

  let colorName = valueTypeColorMap[valueType];
  if (colorName === undefined) {
    colorName = "red";
  }

  const [backgroundColor, borderColor] = colors[colorName];
  const showName = isFlowSocket === false || name !== "flow";

  return (
    <div className={styles.InputSocket}>
      {isFlowSocket && (
        <FontAwesomeIcon icon={faCaretRight} color="#ffffff" size="lg" />
      )}
      {showName && <div className="capitalize mr-2">{name}</div>}
      {isFlowSocket === false && connected === false && (
        <>
          {valueType === "string" && (
            <AutoSizeInput
              type="text"
              className={styles.inputField}
              value={String(value) ?? defaultValue ?? ""}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === "number" && (
            <AutoSizeInput
              type="number"
              className={styles.inputField}
              value={String(value) ?? defaultValue ?? ""}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === "float" && (
            <AutoSizeInput
              type="number"
              className={styles.inputField}
              value={String(value) ?? defaultValue ?? ""}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === "integer" && (
            <AutoSizeInput
              type="number"
              className={styles.inputField}
              value={String(value) ?? defaultValue ?? ""}
              onChange={(e) => onChange(name, e.currentTarget.value)}
            />
          )}
          {valueType === "boolean" && (
            <input
              type="checkbox"
              className={styles.inputField}
              value={String(value) ?? defaultValue ?? ""}
              onChange={(e) => onChange(name, e.currentTarget.checked)}
            />
          )}
        </>
      )}
      <Handle
        id={name}
        type="target"
        position={Position.Left}
        className={cx(borderColor, connected ? backgroundColor : styles.inputField)}
        isValidConnection={(connection: Connection) =>
          isValidConnection(connection, instance)
        }
      />
    </div>
  );
}
