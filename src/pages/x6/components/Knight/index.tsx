import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../help';

export default function () {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <span
      ref={drag}
      role="img"
      aria-label="img"
      style={{
        opacity: isDragging ? 0 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
      🤮
    </span>
  );
}
