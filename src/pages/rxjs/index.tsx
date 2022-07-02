import React from 'react';
import { useGraphByCode } from '../dag/graph-core';
export default function Rxjs(props: any) {
  const ins = useGraphByCode('first');
  const name = ins.getName();
  return <div>{`rxjs:${name}`}</div>;
}
