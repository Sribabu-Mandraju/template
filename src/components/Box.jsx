import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Xarrow, { Xwrapper } from 'react-xarrows';

const Box = ({ id, style, onDoubleClick }) => {
  return (
    <Draggable>
      <div
        id={id}
        style={{
          backgroundColor: 'blue',
          border: '1px solid #000',
          textAlign: 'center',
          position: 'absolute',
          ...style,
        }}
        className="rounded-md px-3 py-2 text-white"
        onDoubleClick={() => onDoubleClick(id)}
      >
        {id}
      </div>
    </Draggable>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, onSelect }) => {
  const availableBoxes = ['Profile', '10th class', 'Intermediate', 'Engineering', 'Techzite2k24', 'Travelling_souls', 'Skills', 'Contact_info'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md p-5">
        <h2 className="text-xl mb-4">Select a Box to Add</h2>
        {availableBoxes.map((box) => (
          <div key={box} className="flex items-center mb-2">
            <input type="checkbox" id={box} value={box} className="mr-2" />
            <label htmlFor={box}>{box}</label>
          </div>
        ))}
        <button
          className="bg-blue-600 text-white rounded px-4 py-2 mr-2"
          onClick={() => {
            const selectedBoxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);
            onSelect(selectedBoxes);
            onClose();
          }}
        >
          Select
        </button>
        <button className="bg-red-600 text-white rounded px-4 py-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const DraggableBoxes = () => {
  const [boxIndex, setBoxIndex] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [startBox, setStartBox] = useState(null);
  const [connections, setConnections] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  // Get anchor positions based on box distance logic
  const getAnchorPositions = (startId, endId) => {
    const startBox = boxes.find((box) => box.id === startId);
    const endBox = boxes.find((box) => box.id === endId);

    if (!startBox || !endBox) return { startAnchor: 'auto', endAnchor: 'auto' };

    const xDiff = endBox.defaultPosition.x - startBox.defaultPosition.x;
    const yDiff = endBox.defaultPosition.y - startBox.defaultPosition.y;

    if (Math.abs(yDiff) > Math.abs(xDiff)) {
      if (yDiff > 0) {
        return { startAnchor: 'top', endAnchor: 'bottom' };
      } else {
        return { startAnchor: 'bottom', endAnchor: 'top' };
      }
    } else {
      if (xDiff > 0) {
        return { startAnchor: 'right', endAnchor: 'left' };
      } else {
        return { startAnchor: 'right', endAnchor: 'left' };
      }
    }
  };

  // Handle double click to initiate or complete arrow drawing
  const handleDoubleClick = (boxId) => {
    if (!startBox) {
      setStartBox(boxId); // Start drawing from this box
      setBoxIndex(boxId);
    } else if (startBox !== boxId) {
      const startBoxExists = boxes.some((box) => box.id === startBox);
      const endBoxExists = boxes.some((box) => box.id === boxId);

      if (startBoxExists && endBoxExists) {
        setConnections((prevConnections) => [
          ...prevConnections,
          { start: startBox, end: boxId },
        ]);
      }
      setStartBox(null); // Reset after completing the arrow
    }
  };

  // Handle delete button click
  const handleDelete = () => {
    if (boxIndex) {
      setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== boxIndex));
      setConnections((prevConnections) =>
        prevConnections.filter(
          (connection) =>
            connection.start !== boxIndex && connection.end !== boxIndex
        )
      );
      setStartBox(null);
      setBoxIndex('');
    }
  };

  // Handle adding boxes from modal selection
  const handleAddBoxes = (selectedBoxes) => {
    const newBoxes = selectedBoxes.map((id, index) => ({
      id,
      defaultPosition: {
        x: 100 + index * 150, // Adjust position as needed
        y: 100,
      },
    }));
    setBoxes((prevBoxes) => [...prevBoxes, ...newBoxes]);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center gap-2">
        <button className="bg-red-600 px-3 py-2 text-white m-2 rounded-md" onClick={handleDelete}>
          Delete
        </button>
        <button className="bg-blue-600 px-3 py-2 text-white m-2 rounded-md" onClick={() => setModalOpen(true)}>
          ADD
        </button>
      </div>
      
      <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
        <Xwrapper>
          {boxes.map((box) => (
            <Box
              key={box.id}
              id={box.id}
              style={{
                left: box.defaultPosition.x,
                top: box.defaultPosition.y,
              }}
              onDoubleClick={handleDoubleClick}
            />
          ))}
          
          {/* Render stable arrows between connected boxes */}
          {connections.map((connection, index) => {
            const anchors = getAnchorPositions(connection.start, connection.end);
            return (
              <Xarrow
                key={index}
                start={connection.start}
                end={connection.end}
                color="black"
                strokeWidth={2}
                headSize={6}
                startAnchor={anchors.startAnchor}
                endAnchor={anchors.endAnchor}
                labels={`${connection.start} -- ${connection.end}`}
                labelSize={16}
                labelColor="blue"
                curveness={0.8}
                gridBreak="20%"
              />
            );
          })}

          {/* Show instructions when selecting a target box */}
          {startBox && (
            <div style={{ position: 'absolute', top: 20, left: 20 }}>
              Now select the destination box for the arrow from {startBox}.
            </div>
          )}
        </Xwrapper>
      </div>

      {/* Modal for selecting boxes */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSelect={handleAddBoxes} 
      />
    </>
  );
};

export default DraggableBoxes;
