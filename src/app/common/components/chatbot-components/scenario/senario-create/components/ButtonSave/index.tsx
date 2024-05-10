'use client';
import Image from 'next/image';
import React from 'react';
import saveIcon from '../../../../../../../../../public/icons/chatbot/bx_save.svg';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';
import { Edge, useStoreApi } from 'reactflow';
import { MainModel, ResponseModel, ScenarioInput } from './types';
import { SenarioService } from '@/services';
import DataService from '@/services/dataService';
import toast from 'react-hot-toast';
import { GetSenario } from '@/services';
import { getUserCookies } from '@/cookies/cookies';
// import { useRouter } from 'next/router';
interface ButtonSaveProps {
  edges: Edge[];
  updateOrCreate: string | undefined;
  cacheUpdate: GetSenario | undefined;
}

function ButtonSave({ edges, updateOrCreate, cacheUpdate }: ButtonSaveProps) {
  const { setNameSenario, nameSenario } = useSenarioCreate();
  const nodesData = useSenarioCreate((state) => state.nodesData);
  // const { push } = useRouter();
  console.log(edges);
  function findStartNode(edges: Edge[]) {
    const targetNodes = new Set(edges.map((edge: Edge) => edge.target));
    for (const edge of edges) {
      if (!targetNodes.has(edge.source)) {
        return edge.source;
      }
    }
    return undefined;
  }
  async function saveNewScenario(nodesData: NodeDataType[]) {
    const traverseEdges = (nodeId: string, isQuestion: boolean): MainModel => {
      const edgesFromNode = edges.filter((edge) => edge.source === nodeId);
      let responseOrQuestion: MainModel;

      if (isQuestion) {
        const question: MainModel = {
          label: nodesData.find((item) => item.id === nodeId)?.value || '',
          responses: [],
        };
        for (const edge of edgesFromNode) {
          question.responses?.push(traverseEdges(edge.target, false));
        }
        responseOrQuestion = question;
      } else {
        const response: MainModel = {
          label: nodesData.find((item) => item.id === nodeId)?.value || '',
          questions: [],
        };
        for (const edge of edgesFromNode) {
          response.questions?.push(traverseEdges(edge.target, true));
        }
        responseOrQuestion = response;
      }
      return responseOrQuestion;
    };

    const nodeStart = findStartNode(edges);
    if (nodeStart) {
      const currentModel: MainModel = traverseEdges(nodeStart, true);
      let desc: MainModel[] = [];
      if (updateOrCreate && cacheUpdate) {
        const data: ScenarioInput = {
          ...cacheUpdate,
          title: nameSenario,
          description: [currentModel],
        };
        console.log(data);

        debugger;
        const hisEmail = getUserCookies().email;
        const response = await new SenarioService().edit({
          email: hisEmail,
          data: data,
          id: cacheUpdate._id,
        });
        if (response?.status === 201) {
          toast.success('Votre scénario a été Mis a jour avec succès.');
        } else {
          console.log(response);

          toast.error('une Erreur survenu lors de la sauvegarde');
        }
      } else {
        const data: ScenarioInput = {
          title: nameSenario,
          phone_number_id: '100609346426084',
          company: 'Kaeyros',
          description: [...desc, currentModel],
        };
        const response = await new SenarioService().create(data);
        if (response?.status === 201) {
          toast.success('Votre scénario a été sauvegardé avec succès.');
        } else {
          console.log(response);

          toast.error('une Erreur survenu lors de la sauvegarde');
        }
      }
    }
  }
  return (
    <div
      onClick={() => saveNewScenario(nodesData)}
      className=" flex justify-center w-40 bg-blue-secondary py-3 px-4 rounded-3xl hover:bg-blue-600 transition-all ease-in-out cursor-pointer"
    >
      {/* <Image src={saveIcon} alt="" /> */}
      <p>Save Chatbot</p>
    </div>
  );
}

export { ButtonSave };
