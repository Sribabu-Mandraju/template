import React, { useReducer, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Xarrow from 'react-xarrows';

const initialState = {
  boxes: [],
  connections: [],
  history: [],
  future: [],
};

function flowReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOX':
      const newBox = {
        id: `box-${state.boxes.length + 1}`,
        top: 100,
        left: 100,
      };
      return {
        ...state,
        boxes: [...state.boxes, newBox],
        history: [...state.history, state],
        future: [],
      };

    case 'MOVE_BOX':
      const updatedBoxes = state.boxes.map((box) =>
        box.id === action.id ? { ...box, left: action.left, top: action.top } : box
      );
      return {
        ...state,
        boxes: updatedBoxes,
        history: [...state.history, state],
        future: [],
      };

    case 'ADD_CONNECTION':
      const newConnection = { start: action.start, end: action.end };
      return {
        ...state,
        connections: [...state.connections, newConnection],
        history: [...state.history, state],
        future: [],
      };

    case 'UNDO':
      if (state.history.length === 0) return state;
      const previousState = state.history[state.history.length - 1];
      return {
        ...previousState,
        future: [state, ...state.future],
        history: state.history.slice(0, -1),
      };

    case 'REDO':
      if (state.future.length === 0) return state;
      const nextState = state.future[0];
      return {
        ...nextState,
        future: state.future.slice(1),
        history: [...state.history, state],
      };

    default:
      return state;
  }
}

function Box({ id, left, top, moveBox, setSelectedBox }) {
  const [, drag] = useDrag({
    type: 'BOX',
    item: { id },
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;
      const newLeft = Math.round(left + delta.x);
      const newTop = Math.round(top + delta.y);
      moveBox(id, newLeft, newTop);
    },
  });

  const [, drop] = useDrop({
    accept: 'BOX',
    drop: () => setSelectedBox(id),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        position: 'absolute',
        left,
        top,
        width: '100px',
        height: '100px',
        backgroundColor: 'aqua',
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid black',
      }}
    >
      {id}
    </div>
  );
}

function FlowDiagram() {
  const [state, dispatch] = useReducer(flowReducer, initialState);
  const [selectedBox, setSelectedBox] = useState(null);

  const addBox = () => dispatch({ type: 'ADD_BOX' });

  const moveBox = (id, left, top) => dispatch({ type: 'MOVE_BOX', id, left, top });

  const addConnection = (start, end) => dispatch({ type: 'ADD_CONNECTION', start, end });

  const undo = () => dispatch({ type: 'UNDO' });

  const redo = () => dispatch({ type: 'REDO' });

  const handleDrop = (id) => {
    if (selectedBox && selectedBox !== id) {
      addConnection(selectedBox, id);
      setSelectedBox(null);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: 'relative', width: '100%', height: '500px', border: '1px solid black' }}>
        {state.boxes.map((box) => (
          <Box
            key={box.id}
            id={box.id}
            left={box.left}
            top={box.top}
            moveBox={moveBox}
            setSelectedBox={setSelectedBox}
          />
        ))}

        {state.connections.map((conn, index) => (
          <Xarrow key={index} start={conn.start} end={conn.end} />
        ))}

        <button onClick={addBox}>Add Box</button>
        <button onClick={undo} disabled={state.history.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={state.future.length === 0}>
          Redo
        </button>
      </div>
    </DndProvider>
  );
}

export default FlowDiagram;
