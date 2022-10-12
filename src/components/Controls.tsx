import {
  DefaultLogger,
  GraphEvaluator,
  ManualLifecycleEventEmitter,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
} from "behave-graph";
import { useState } from "react";
import { ClearModal } from "./ClearModal";
import { HelpModal } from "./HelpModal";
import {
  faDownload,
  faPlay,
  faQuestion,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LoadModal } from "./LoadModal";
import { SaveModal } from "./SaveModal";
import { flowToBehave } from "../transformers/flowToBehave";
import { useReactFlow, Controls, ControlButton } from "reactflow";

const CustomControls = () => {
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const instance = useReactFlow();

  const handleRun = () => {
    const registry = new Registry();
    registerCoreProfile(registry);
    registerSceneProfile(registry);
    registry.implementations.register("ILogger", new DefaultLogger());
    const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
    registry.implementations.register(
      "ILifecycleEventEmitter",
      manualLifecycleEventEmitter
    );

    const nodes = instance.getNodes();
    const edges = instance.getEdges();
    const graphJson = flowToBehave(nodes, edges);
    const graph = readGraphFromJSON(graphJson, registry);
    const evaluator = new GraphEvaluator(graph);

    manualLifecycleEventEmitter.startEvent.emit();
    evaluator.executeAllAsync();

    manualLifecycleEventEmitter.tickEvent.emit();
    evaluator.executeAllAsync();
  };

  return (
    <>
      <Controls>
        <ControlButton title="Help" onClick={() => setHelpModalOpen(true)}>
          <FontAwesomeIcon icon={faQuestion} />
        </ControlButton>
        <ControlButton title="Load" onClick={() => setLoadModalOpen(true)}>
          <FontAwesomeIcon icon={faUpload} />
        </ControlButton>
        <ControlButton title="Save" onClick={() => setSaveModalOpen(true)}>
          <FontAwesomeIcon icon={faDownload} />
        </ControlButton>
        <ControlButton title="Clear" onClick={() => setClearModalOpen(true)}>
          <FontAwesomeIcon icon={faTrash} />
        </ControlButton>
        <ControlButton title="Run" onClick={() => handleRun()}>
          <FontAwesomeIcon icon={faPlay} />
        </ControlButton>
      </Controls>
      <LoadModal open={loadModalOpen} onClose={() => setLoadModalOpen(false)} />
      <SaveModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} />
      <HelpModal open={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <ClearModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
      />
    </>
  );
};

export default CustomControls;
