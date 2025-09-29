import React from 'react';

const StyleSelector = ({ selectedStyle, onStyleChange }) => {
  const styles = [
    {
      id: 'bottom-centered',
      name: 'Bottom Centered',
      description: 'Classic subtitles at bottom center',
    },
    {
      id: 'top-bar',
      name: 'Top Bar',
      description: 'Banner style captions at top',
    },
    {
      id: 'karaoke',
      name: 'Karaoke Style',
      description: 'Highlight words as they are spoken',
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Caption Style</h2>
      
      <div className="space-y-3">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedStyle === style.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStyleChange(style.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{style.name}</h3>
                <p className="text-sm text-gray-600">{style.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;