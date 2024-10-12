import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Xarrow, { Xwrapper } from 'react-xarrows';
import ProfileCard from './cards/Profile';
import ContactInfoCard from './cards/Contact';
import ProjectsCard from './cards/Project';
import EngineeringCard from './cards/Engineering';
import IntermediateCard from './cards/Inter';
import SkillsCard from './cards/Skills';
import Class10 from './cards/Class10';

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

const Modal = ({ isOpen, onClose, onSelect }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  
  const availableBoxes = [
    { name: 'Profile', component: <ProfileCard /> },
    { name: '10th class', component: <Class10 /> },
    { name: 'Intermediate', component: <IntermediateCard /> },
    { name: 'Engineering', component: <EngineeringCard /> },
    { name: 'Projects', component: <ProjectsCard /> },
    { name: 'Skills', component: <SkillsCard /> },
    { name: 'Contact_info', component: <ContactInfoCard /> },
  ];

  const handleSelectBox = (box) => {
    setSelectedBox(box);
  };

  const handleConfirm = () => {
    if (selectedBox) {
      onSelect([selectedBox.name]); // Pass selected box name to parent
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full h-[80vh] max-w-[1000px] rounded-md p-5 flex">
        <div className="w-1/3 border-r pr-4">
          <h2 className="text-xl mb-4">Select a Box</h2>
          {availableBoxes.map((box) => (
            <div
              key={box.name}
              className={`flex items-center mb-2 cursor-pointer ${selectedBox?.name === box.name ? 'bg-purple-200 rounded-md' : ''}`}
              onClick={() => handleSelectBox(box)}
            >
              <label className='py-2 ps-3 font-semibold text-violet-700' htmlFor={box.name}>{box.name}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col min-w-[500px]">
          <div className="flex items-center justify-end gap-2">
            <button
              className="bg-blue-600 text-white h-[30px] flex justify-center items-center rounded px-2"
              onClick={handleConfirm}
              disabled={!selectedBox}
            >
              <div className="mb-2">Confirm</div>
            </button>
            <button className="bg-red-600 text-white h-[30px] flex justify-center items-center rounded px-2" onClick={onClose}>
              <div className="pb-2">Cancel</div>
            </button>
          </div>
          <div className="w-2/3 pl-4">
            <h2 className="text-xl mb-4">Selected Box Details</h2>
            {selectedBox ? (
              <div>
                <h3 className="font-bold">{selectedBox.name}</h3>
                {selectedBox.component} {/* Render the selected component */}
              </div>
            ) : (
              <p>Please select a box from the left.</p>
            )}
          </div>
        </div>
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
    const newBoxes = selectedBoxes.map((name, index) => ({
      id: `${name}-${Date.now()}-${index}`, // Unique ID for each box
      defaultPosition: {
        x: 100 + index * 150, // Adjust position as needed
        y: 100,
      },
      name, // Store the name of the box
    }));

    // Filter out duplicates based on the name before adding
    const existingBoxNames = boxes.map(box => box.name);
    const filteredNewBoxes = newBoxes.filter(newBox => !existingBoxNames.includes(newBox.name));

    setBoxes((prevBoxes) => [...prevBoxes, ...filteredNewBoxes]);
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
                // labels={`${connection.start} → ${connection.end}`}
              />
            );
          })}
        </Xwrapper>
      </div>

      {/* Modal for selecting boxes */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleAddBoxes} // Pass down the selection function
      />
    </>
  );
};

export default DraggableBoxes;
