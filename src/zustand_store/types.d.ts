import { Edge, Node } from 'reactflow';
export type NodeDataType = {
  id: string;
  value: any;
  type?: 'response' | 'question';
};
export type SenarioType = {
  nameSenario: string;
  nodesData: NodeDataType[];
  edgesData: NodeDataType[];
  setAddNodesData?: (nds: NodeDataType) => void;
  setNodesData?: (nds: NodeDataType[]) => void;
  setEdgesData?: (nds: Edge[]) => void;
  setNameSenario: (nds: string) => void;
  reset?: () => void;
};
export type LoaderDataType = {
  isLoading: boolean;
  setIsLoading: (nds: boolean) => void;
};
export type NomberConversationDataType = {
  nb: number;
  setNb: (nds: number) => void;
};
