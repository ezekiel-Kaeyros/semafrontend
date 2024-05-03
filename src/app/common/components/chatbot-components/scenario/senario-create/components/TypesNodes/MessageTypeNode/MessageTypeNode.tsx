import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { ContentNodeType, MessageTypeNodeType } from '../types';
import { LayoutTypesNode } from '../LayoutTypesNode';
import messageIcon from '../../../../../../../../../../public/icons/chatbot/message-text.svg';
import Image from 'next/image';
import { ButtonNode } from '../ButtonNode';
import {} from './componentsNodes/TextNode';
import { generateId } from '@/utils/generateId';
import {
  GiftNode,
  TextNode,
  DocumentNode,
  VideoNode,
  AudioNode,
  ImageNode,
} from './componentsNodes';
import { useStoreApi } from 'reactflow';
import { NodeDataType, useSenarioCreate } from '@/zustand_store';

function MessageTypeNode({ data, isConnectable }: MessageTypeNodeType) {
  const [content, setContent] = useState<ContentNodeType[]>(data.content);
  const { nodesData, setNodesData, setAddNodesData } = useSenarioCreate();

  function deleteItemById(
    items: ContentNodeType[],
    idToDelete: string
  ): ContentNodeType[] {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    return updatedItems;
  }

  function deleteItemContent(id: string) {
    console.log('lid', id);

    const tampon = deleteItemById(content, id);
    setContent(tampon);
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
      setAddNodesData!({ id, value, type: 'response' });
    }
  }
  function addTextNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        component: (
          <TextNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
        value: '',
      },
    ]);
  }
  /**
   *
   */
  function addImageNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        component: (
          <ImageNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
      },
    ]);
  }
  /**
   *
   */
  function addAudioNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        component: (
          <AudioNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
      },
    ]);
  }
  /**
   *
   */
  function addVideoNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        component: (
          <VideoNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
      },
    ]);
  }
  /**
   *
   */
  function addDocumentNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        component: (
          <DocumentNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
      },
    ]);
  }
  /**
   *
   */
  function addGiftNode() {
    const id = generateId();
    setContent([
      ...content,
      {
        id: id,
        // TODO:enable setContent for all media becaus is only for text which is available
        component: (
          <GiftNode
            id={id}
            deletefc={deleteItemContent}
            setContent={updateValueContent}
          />
        ),
      },
    ]);
  }
  const store = useStoreApi();
  const { getNodes, setNodes } = store.getState();

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
          content: content.map((item) => {
            return { ...item, id: generateId() };
          }),
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

  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LayoutTypesNode
        icon={<Image src={messageIcon} alt="" width={16} height={16} />}
        title="Message"
        color="bg-blue-message-primary"
        data={data}
        duplicate={duplicateNode}
        deleteNode={deleteNode}
      >
        <div className=" bg-mainDark w-full p-2 ">
          <div className=" flex flex-col gap-1 mb-2">
            {content.map((item) => item.component)}
          </div>
          <div className=" w-full flex flex-wrap  gap-x-1 gap-y-2">
            <ButtonNode title="Text" fc={addTextNode} />
            <ButtonNode title="Image" fc={addImageNode} />
            <ButtonNode title="Audio" fc={addAudioNode} />
            <ButtonNode title="video" fc={addVideoNode} />
            <ButtonNode title="Document" fc={addDocumentNode} />
            <ButtonNode title="Gift" fc={addGiftNode} />
          </div>
        </div>
      </LayoutTypesNode>

      <Handle
        className=""
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export { MessageTypeNode };
