import React, { useState, useEffect } from 'react';
import {keysColor} from '../../data/KeysColor';

export const Settings = () => {
  const storedColors = localStorage.getItem('userColors');
  const defaultColors = keysColor.map(key => key.color);
  const initialColors = storedColors ? JSON.parse(storedColors) : defaultColors;
  const [usersColors, setUsersColors] = useState<string[]>(initialColors);

  useEffect(() => {
    localStorage.setItem('userColors', JSON.stringify(usersColors));
  }, [usersColors]);

  const handleColorChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColors = [...usersColors];
    newColors[index] = event.target.value;
    setUsersColors(newColors);
  };

  return (
    <>
      <div className="p-6">・キーの色</div>
      <div>※この機能は未完成です。</div>
      <div className="pl-6">
      {usersColors.map((color, index) => (
        <div key={index}>
          <label>{keysColor[index].name}:</label>
          <input type="color" value={color} onChange={handleColorChange(index)} />
        </div>
      ))}
      </div>
    </>
  );
};