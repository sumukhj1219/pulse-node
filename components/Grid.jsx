'use client'
import React from 'react'
import GridLines from 'react-gridlines';

const Grid = ({ children }) => {
  return (
    <GridLines 
      className="grid-area" 
      cellWidth={20} 
      strokeWidth={8} 
      cellWidth2={20}
    >
      <div  style={{
        background: 'radial-gradient(circle, rgba(0, 0, 0, 0.8) 0%, rgba(255, 255, 255, 255) 80%)',
        padding: '20px', 
      }}>
      {children}
      </div>
    </GridLines>
  );
};

export default Grid;
