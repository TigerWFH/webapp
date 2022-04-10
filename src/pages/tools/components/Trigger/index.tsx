import * as React from 'react';
import { useDrag } from 'react-dnd';
const style: any = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};
export default function Triger(props: any) {
  const { name } = props;
  const [collect, drag] = useDrag(() => ({
    type: '123',
    item: {
      name,
      type: 'gateway',
      label: name
    },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        let msg = '';
        const isDropAllowed =
          dropResult.allowedDrop === 'any' ||
          dropResult.allowedDrop === dropResult.dropEffect;
        if (isDropAllowed) {
          //   const isCopyAction = dropResult.dropEffect === 'copy';
          // const actionName = isCopyAction ? 'copied' : 'moved';
          msg = 'XXXXXX';
        } else {
          msg = 'OOOOOO';
        }
        // alert(msg);
        console.log(msg);
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  }));

  return (
    <div ref={drag} style={{ ...style, opacity: collect.opacity }}>
      {name}
    </div>
  );
}
