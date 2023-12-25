import React, { useState, useEffect } from 'react';
import { keysColor } from '../../data/KeysColor';

export const Settings = () => {
  const storedColors = localStorage.getItem('userColors');
  const initialColors = storedColors
    ? JSON.parse(storedColors)
    : keysColor.reduce((colors, key) => ({ ...colors, [key.name]: key.color }), {});
  const [usersColors, setUsersColors] = useState<{ [key: string]: string }>(initialColors);

  useEffect(() => {
    localStorage.setItem('userColors', JSON.stringify(usersColors));
  }, [usersColors]);

  const handleColorChange = (keyName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = { ...usersColors, [keyName]: event.target.value };
    setUsersColors(newColors);
    localStorage.setItem('userColors', JSON.stringify(newColors));
  };

  return (
    <>
      <div className="p-6">・キーの色</div>
      <div>※この機能は未完成です。</div>
      <div className="pl-6">
        {keysColor.map((key) => (
          <div key={key.name}>
            <label>{key.name}:</label>
            <input type="color" value={usersColors[key.name]} onChange={handleColorChange(key.name)} />
          </div>
        ))}
      </div>
    </>
  );
};