import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Xarrow, { Xwrapper } from 'react-xarrows';
import Header from './repeats/Header';

const Box = ({ id, style, onDoubleClick, isSelected }) => {
    return (
        <Draggable>
            <div
                id={id}
                style={{
                    backgroundColor: 'white',
                    border: isSelected ? '2px solid blue' : '1px solid #000', // Highlight selected box
                    textAlign: 'center',
                    position: 'absolute',
                    ...style,
                }}
                className="rounded-md px-3 py-2 text-black"
                onDoubleClick={() => onDoubleClick(id)}
            >
                {id}
            </div>
        </Draggable>
    );
};

const Modal = ({ isOpen, onClose, onSelect, availableBoxes }) => {
    const [selectedBox, setSelectedBox] = useState(null);
    const [newBox, setNewBox] = useState({ title: '', description: '' });

    const handleSelectBox = (box) => {
        setSelectedBox(box);
    };

    const handleConfirm = () => {
        if (selectedBox) {
            onSelect([selectedBox]);
            onClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBox((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateBox = async () => {
        const storedData = localStorage.getItem("user");
        const userData = JSON.parse(storedData);
        const userEmail = userData?.user?.email;

        if (newBox.title && newBox.description) {
            try {
                const response = await fetch(`http://localhost:3000/box/createBox`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: newBox.title,
                        description: newBox.description,
                        email: userEmail,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    setAvailableBoxes((prev) => [...prev, data.box]);
                    setNewBox({ title: '', description: '' });
                } else {
                    console.error('Error creating box:', data);
                }
            } catch (error) {
                console.error('Error creating box:', error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed w-full h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-full h-[80vh] max-w-[1000px] rounded-md p-5 flex">
                <div className="w-1/3 h-full overflow-y-scroll border-r pr-4">
                    <h2 className="text-xl mb-4">Select a Box</h2>
                    {availableBoxes.map((box) => (
                        <div
                            key={box._id}
                            className={`flex items-center mb-2 cursor-pointer ${selectedBox?._id === box._id ? 'bg-purple-200 rounded-md' : ''}`}
                            onClick={() => handleSelectBox(box)}
                        >
                            <label className='py-2 ps-3 font-semibold text-violet-700' htmlFor={box._id}>{box.title}</label>
                        </div>
                    ))}
                    <h2 className="text-xl mb-4 mt-5">Create a New Box</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Box Title"
                        value={newBox.title}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 mb-2 w-full"
                    />
                    <textarea
                        name="description"
                        placeholder="Box Description"
                        value={newBox.description}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 mb-4 w-full"
                    />
                    <button
                        className="bg-green-600 text-white h-[30px] flex justify-center items-center rounded px-2"
                        onClick={handleCreateBox}
                        disabled={!newBox.title || !newBox.description}
                    >
                        Create Box
                    </button>
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
                                <h3 className="font-bold">{selectedBox.title}</h3>
                                <p>{selectedBox.description}</p>
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

const DraggableBoxes2 = () => {
    const storedData = localStorage.getItem("user");
    const userData = JSON.parse(storedData);
    const [boxIndex, setBoxIndex] = useState('');
    const [selectedBoxId, setSelectedBoxId] = useState(null); // Track selected box
    const [boxes, setBoxes] = useState([
        { id: 'start', defaultPosition: { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 50 }, name: 'Start', backgroundColor: 'green' }, // Start box centered
        { id: 'end', defaultPosition: { x: window.innerWidth / 2 + 50, y: window.innerHeight / 2 - 50 }, name: 'End', backgroundColor: 'red' }, // End box centered
    ]);
    const [connections, setConnections] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [availableBoxes, setAvailableBoxes] = useState([]);

    // Handle modal and userEmail logic here...

    const handleDoubleClick = (boxId) => {
        if (!boxIndex) {
            setBoxIndex(boxId);
            setSelectedBoxId(boxId); // Set selected box
        } else if (boxIndex !== boxId) {
            const startBoxExists = boxes.some((box) => box.id === boxIndex);
            const endBoxExists = boxes.some((box) => box.id === boxId);

            if (startBoxExists && endBoxExists) {
                setConnections((prevConnections) => [
                    ...prevConnections,
                    { start: boxIndex, end: boxId },
                ]);
            }
            setBoxIndex('');
            setSelectedBoxId(null); // Reset selected box when connection is made
        }
    };

    const handleDelete = () => {
        if (boxIndex) {
            setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== boxIndex));
            setConnections((prevConnections) =>
                prevConnections.filter(
                    (connection) =>
                        connection.start !== boxIndex && connection.end !== boxIndex
                )
            );
            setBoxIndex('');
            setSelectedBoxId(null); // Reset selected box on delete
        }
    };

    const handleAddBoxes = (selectedBoxes) => {
        const newBoxes = selectedBoxes.map((box, index) => ({
            id: `${box.title}`,
            defaultPosition: {
                x: 100 + index * 150,
                y: 100,
            },
            name: box.title,
        }));

        const existingBoxNames = boxes.map(box => box.name);
        const filteredNewBoxes = newBoxes.filter(newBox => !existingBoxNames.includes(newBox.name));

        setBoxes((prevBoxes) => [...prevBoxes, ...filteredNewBoxes]);
    };

    return (
        <>
            <Header />
            <div className="w-full flex items-center justify-center gap-2 mt-[60px]">
                <button className="bg-red-600 px-3 py-2 text-white m-2 rounded-md" onClick={handleDelete}>
                    Delete
                </button>
                <button className="bg-blue-600 px-3 py-2 text-white m-2 rounded-md" onClick={() => setModalOpen(true)}>
                    Add Box
                </button>
            </div>
            <div className="relative w-full h-[calc(100vh-80px)]">
                <Xwrapper>
                    {boxes.map((box) => (
                        <Box
                            key={box.id}
                            id={box.id}
                            style={{
                                left: box.defaultPosition.x,
                                top: box.defaultPosition.y,
                                backgroundColor: box.backgroundColor,
                            }}
                            onDoubleClick={handleDoubleClick}
                            isSelected={selectedBoxId === box.id} // Highlight selected box
                        />
                    ))}
                    {connections.map((connection, index) => (
                        <Xarrow
                            key={index}
                            start={connection.start}
                            end={connection.end}
                            color="black"
                            strokeWidth={2}
                        />
                    ))}
                </Xwrapper>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={handleAddBoxes}
                availableBoxes={availableBoxes}
            />
        </>
    );
};

export default DraggableBoxes2;
