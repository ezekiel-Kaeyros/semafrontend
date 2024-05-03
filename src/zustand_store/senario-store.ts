import { create } from 'zustand';
import { SenarioType } from './types';

export const useSenarioCreate = create<SenarioType>((set) => ({
  nodesData: [],
  edgesData: [],
  setAddNodesData: (nds) =>
    set((state) => ({ ...state, nodesData: [...state.nodesData, nds] })),
  setNodesData: (nds) => set((state) => ({ ...state, nodes: nds })),
  setEdgesData: (nds) => set((state) => ({ ...state, nodes: nds })),
  reset: () => set((state) => ({ ...state, nodesData: [], edgesData: [] })),
}));
