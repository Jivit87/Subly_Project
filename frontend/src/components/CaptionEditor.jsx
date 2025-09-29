import React, { useState } from 'react';

const CaptionEditor = ({ captions, onCaptionsChange }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editingIndex >= 0) {
      const newCaptions = [...captions];
      newCaptions[editingIndex].text = editText;
      onCaptionsChange(newCaptions);
      setEditingIndex(-1);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditText('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Edit Captions</h3>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {captions.map((caption, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 font-mono">
                {caption.start.toFixed(1)}s - {caption.end.toFixed(1)}s
              </span>
              {editingIndex !== index && (
                <button
                  onClick={() => startEdit(index, caption.text)}
                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
            </div>
            
            {editingIndex === index ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border rounded font-noto-sans"
                  rows="2"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800 font-noto-sans">{caption.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptionEditor;