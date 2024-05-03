import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { ContentNodeType, QuestionTypeNodeType } from '../types';
import { LayoutTypesNode } from '../LayoutTypesNode';
import messageIcon from '../../../../../../../../../../public/icons/chatbot/message-text.svg';
import messageQuestion from '../../../../../../../../../../public/icons/chatbot/message-question.svg';
import Image from 'next/image';
import { ButtonNode } from '../ButtonNode';
import { generateId } from '@/utils/generateId';
import { AddTextNode, StockAnswerNode } from './componentsNodes';
import { useStoreApi } from 'reactflow';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';

function QuestionTypeNode({ data, isConnectable }: QuestionTypeNodeType) {
  const [content, setContent] = useState<ContentNodeType[]>([]);
  const { nodesData, setNodesData, setAddNodesData } = useSenarioCreate();

  function deleteItemById(
    items: ContentNodeType[],
    idToDelete: string
  ): ContentNodeType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }

  function deleteItemContent(id: string) {
    const tampon = deleteItemById(content, id);
    setContent(tampon);
  }
  function addTextNode() {
    const id = generateId();
    console.log(id);

    setContent([
      ...content,
      {
        id: id,
        component: (
          <AddTextNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
      },
    ]);
  }
  function addStockAnswerNode() {
    const id = generateId();
    console.log(id);

    setContent([
      ...content,
      {
        id: id,
        component: <StockAnswerNode id={id} deletefc={deleteItemContent} />,
      },
    ]);
  }
  const store = useStoreApi();
  const { getNodes, setNodes, edges } = store.getState();
  console.log(edges);

  function duplicateNode() {
    const nodes = getNodes();
    let nodeToduplicate = nodes.find((item) => item.id === data?.id);

    if (nodeToduplicate) {
      const idNow = generateId();
      const nodeToduplicateDuplicate = {
        ...nodeToduplicate,
        position: {
          x: nodeToduplicate.position.x + 300,
          y: nodeToduplicate.position.y + 50,
        },
        id: idNow,
        data: {
          ...nodeToduplicate.data,
          content: content,
          id: idNow,
        },
      };
      data?.setNodes([...nodes, nodeToduplicateDuplicate]);
    }
  }
  function deleteNode() {
    const nodes = getNodes();
    let nodeToduplicate = nodes.filter((item) => item.id !== data?.id);
    data?.setNodes([...nodeToduplicate]);
  }
  function updateValueContent(id: string, value: string) {
    setContent((cont) => {
      let newTable: ContentNodeType[] = [];
      let content = cont.forEach((cnt) => {
        if (cnt.id === id) {
          return newTable.push({ ...cnt, value: value });
        } else {
          return newTable.push(cnt);
        }
      });

      return newTable;
    });

    if (nodesData.find((item) => item.id === id)) {
      let tamponNodeData: NodeDataType[] = nodesData.map((cnt) => {
        if (cnt.id === id) {
          return { ...cnt, value: value };
        } else {
          return cnt;
        }
      });
      setNodesData!(tamponNodeData);
    } else {
      setAddNodesData!({ id, value, type: 'question' });
    }
  }
  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LayoutTypesNode
        icon={<Image src={messageQuestion} alt="" width={16} height={16} />}
        title="Question"
        color="bg-error-default-light"
        data={data}
        duplicate={duplicateNode}
        deleteNode={deleteNode}
      >
        <div className=" bg-mainDark w-full p-2 ">
          <div className=" flex flex-col gap-1 mb-2">
            {content.map((item) => item.component)}
          </div>
          <div className=" w-full flex flex-wrap  gap-x-1 gap-y-2">
            {content.length === 0 && (
              <ButtonNode title="Add text" fc={addTextNode} />
            )}
            {content.length !== 2 && (
              <ButtonNode
                disabled={content.length !== 1}
                title="Stock answer var"
                fc={addStockAnswerNode}
              />
            )}
          </div>
        </div>
      </LayoutTypesNode>

      <Handle
        className=""
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
        onConnect={(connection) => console.log(nodesData)}
      ></Handle>
    </div>
  );
}

export { QuestionTypeNode };
