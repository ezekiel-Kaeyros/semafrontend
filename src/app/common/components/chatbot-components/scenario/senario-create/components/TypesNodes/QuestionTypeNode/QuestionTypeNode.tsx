import React, { useEffect, useState } from 'react';
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
  // const [content, setContent] = useState<ContentNodeType[]>([]);
  const nodesData = useSenarioCreate((state) => state.nodesData);
  const [content, setContent] = useState<NodeDataType[]>(
    nodesData.filter((item) => item.id === data.id)
  );
  const { setNodesData, setAddNodesData } = useSenarioCreate();
  console.log(nodesData);

  function deleteItemById(
    items: NodeDataType[],
    idToDelete: string
  ): NodeDataType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }
  function deleteItemContent(id: string) {
    const tampon = deleteItemById(content, id);
    setNodesData!(nodesData.filter((item) => item.id != id));
    setContent(tampon);
  }
  function addTextNode() {
    // setContent([
    //   ...content,
    //   {
    //     id: data.id,
    //     component: (
    //       <AddTextNode
    //         id={data.id}
    //         deletefc={deleteItemContent}
    //         setContent={updateValueContent}
    //       />
    //     ),
    //   },
    // ]);
    setContent([
      ...content,
      {
        id: data?.id,
        value: '',
        type: 'question',
      },
    ]);
    setAddNodesData!({
      id: data?.id,
      value: '',
      type: 'question',
    });
  }
  function addStockAnswerNode() {
    // const id = generateId();
    // console.log(id);
    // setContent([
    //   ...content,
    //   {
    //     id: id,
    //     component: <StockAnswerNode id={id} deletefc={deleteItemContent} />,
    //   },
    // ]);
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
      let newTable: NodeDataType[] = [];
      let content = cont.forEach((cnt) => {
        if (cnt.id === id) {
          return newTable.push({ ...cnt, value: value });
        } else {
          return newTable.push(cnt);
        }
      });

      return newTable;
    });
  }

  useEffect(() => {
    if (content.length > 0) {
      if (nodesData.some((item) => item.id === content[0]?.id)) {
        let tamponNodeData: NodeDataType[] = nodesData.map((cnt) => {
          if (cnt.id === content[0].id) {
            return { ...cnt, value: content[0].value };
          } else {
            return cnt;
          }
        });
        setNodesData!(tamponNodeData);
      } else {
        setAddNodesData!({
          id: content[0]?.id,
          value: content[0]?.value,
          type: 'question',
        });
      }
    }
  }, [content]);
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
            {/* {content.map((item) => item.component)} */}
            {nodesData.map((item, index) => {
              if (item.id === data.id) {
                if (item.type === 'question') {
                  return (
                    <AddTextNode
                      id={data.id}
                      deletefc={deleteItemContent}
                      setContent={updateValueContent}
                      defaultValue={item.value}
                      key={index}
                    />
                  );
                } else if (item.type === 'response') {
                  return <div key={index}></div>;
                }
              }
            })}
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
