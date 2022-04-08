import * as React from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const style: any = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

interface IProps {}

const dustbinStyle: any = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};

function Dustbin(props: any) {
  const { allowedDrop } = props;
  const [itemList, setItemList] = React.useState([] as any);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: '123',
    drop: (item: any, monitor) => {
      setItemList((prevItemList: any[]) => [...prevItemList, item]);
      return {
        name: `${allowedDrop} Dustbin`,
        allowedDrop
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  console.log('itemList8888888====>', itemList);
  return (
    <div ref={drop} role="Dustbin" style={{ ...dustbinStyle, backgroundColor }}>
      {isActive ? 'drop' : 'drag'}
      {itemList.map((item: any, index: number) => {
        return (
          <span key={index} style={{ color: 'red' }}>
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

function Box(props: any) {
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
          // const isCopyAction = dropResult.dropEffect === 'copy';
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
    <div ref={drag} role="Box" style={{ ...style, opacity: collect.opacity }}>
      {name}
    </div>
  );
}

function Container(props: IProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Dustbin key={1} allowedDrop="any" />
        <Dustbin key={2} allowedDrop="copy" />
        <Dustbin key={3} allowedDrop="move" />
      </div>
      <div>
        <Box key={1} name="Glass" />
        <Box key={2} name="Banana" />
        <Box key={3} name="Paper" />
      </div>
    </DndProvider>
  );
}

export default React.memo(Container);
