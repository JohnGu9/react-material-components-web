import React from "react";

export type SlotNode = React.ReactNode | ((slotName: string) => React.ReactNode);

export function createSlotNode(node: SlotNode, slotName: string) {
  if (typeof node === 'function') {
    return node(slotName);
  }
  return <div slot={slotName}>{node}</div>
}
