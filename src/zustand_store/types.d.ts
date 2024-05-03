import { Edge, Node } from 'reactflow';
export type NodeDataType = {
  id: string;
  value: any;
  type?: 'response' | 'question';
};
export type SenarioType = {
  nodesData: NodeDataType[];
  edgesData: NodeDataType[];
  setAddNodesData?: (nds: NodeDataType) => void;
  setNodesData?: (nds: NodeDataType[]) => void;
  setEdgesData?: (nds: Edge[]) => void;
  reset?: () => void;
};
