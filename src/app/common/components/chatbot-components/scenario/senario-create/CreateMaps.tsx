'use client';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Node,
  XYPosition,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SideBar } from './SideBar/SideBar';
import { useCallback, useRef, useState } from 'react';
import {
  MessageTypeNode,
  QuestionTypeNode,
  ConditionalTypeNode,
} from './components/TypesNodes';
import { generateId } from '@/utils/generateId';

const nodeTypes = {
  messageNode: MessageTypeNode,
  questionNode: QuestionTypeNode,
  conditionalNode: ConditionalTypeNode,
};
function CreateMaps() {
  let id = 0;
  const getId = () => generateId();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position: XYPosition | undefined =
        reactFlowInstance?.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
      const idNode = getId();
      if (position) {
        const newNode: Node = {
          id: idNode,
          type,
          position,
          data: {
            label: `${type} node`,
            id: idNode,
            setNodes: setNodes,
            content: [],
          },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );
  // reactFlowInstance?.addNodes

  return (
    <div className=" relative " style={{ height: '100%', width: '100%' }}>
      <SideBar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        // defaultViewport={defaultViewport}
        maxZoom={1.5}
      >
        <Background />

        <Controls position="bottom-right" className=" flex gap-1 mr-20" />
      </ReactFlow>
    </div>
  );
}

export default CreateMaps;
