import { Handle, Position } from "react-flow-renderer";
import { Row } from "./Row";

type InputRowProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  type?: "number" | "string";
  connected?: boolean;
  handleType?: "source" | "target";
  handleId: string;
};

export default function InputRow({
  value,
  onChange,
  label,
  type = "string",
  handleId,
  handleType = "target",
  connected = false,
}: InputRowProps) {
  return (
    <Row>
      {label && <label className="mr-2">{label}</label>}
      {connected === false && (
        <input
          type={type === "string" ? "text" : "number"}
          className=" bg-gray-600 disabled:bg-gray-700 w-full py-1 px-2"
          value={connected ? "" : value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {label === undefined && connected === true && <div className="h-7"></div>}
      <Handle
        id={handleId}
        type={handleType}
        position={handleType === "target" ? Position.Left : Position.Right}
        // className="bg-green-600"
      />
    </Row>
  );
}
