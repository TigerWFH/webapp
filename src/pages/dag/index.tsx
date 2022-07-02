import * as React from 'react';
import { Graph } from '@antv/x6';
import { useGraphByCode, umountGraphByCode } from './graph-core';

function Dag(props: any) {
  const [name, setName] = React.useState('');
  const ins = useGraphByCode('first');

  React.useEffect(() => {
    const name = ins.getName();
    setName(name);

    return () => {
      umountGraphByCode('first');
    };
  }, []);

  return (
    <div>
      <span>{`测试:${name}`}</span>
      <a href="/#/rxjs">rxjs</a>
    </div>
  );
}

export default Dag;
