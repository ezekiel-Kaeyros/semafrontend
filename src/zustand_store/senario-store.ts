import { create } from 'zustand';
import { SenarioType } from './types';

export const useSenarioCreate = create<SenarioType>((set) => ({
  nameSenario: 'Scenario name',
  nodesData: [],
  edgesData: [],
  setAddNodesData: (nds) =>
    set((state) => ({ ...state, nodesData: [...state.nodesData, nds] })),
  setNodesData: (nds) => set((state) => ({ ...state, nodesData: nds })),
  setNameSenario: (nameSena) =>
    set((state) => ({ ...state, nameSenario: nameSena })),
  reset: () => set((state) => ({ ...state, nodesData: [], edgesData: [] })),
}));
