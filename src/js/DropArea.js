import React from 'react';

function DropArea({ children, onDrop }) {
  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    onDrop(e);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
}

export { DropArea };
