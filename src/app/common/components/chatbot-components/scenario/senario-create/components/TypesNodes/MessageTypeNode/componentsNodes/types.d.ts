import React from 'react';

export type TextNodeType = {
  id: string;
  deletefc: any;
  setContent?: (d: string, value: string) => void;
};

export type ImageNodeType = TextNodeType & {};
export type AudioNodeType = TextNodeType & {};
