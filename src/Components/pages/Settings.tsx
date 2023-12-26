import React, { useState, useEffect } from 'react';
import { keysColor as initialKeysColor, UsersColor} from '../../data/KeysColor';

export const Settings = () => {
  const [usersColors, setUsersColors] = useState<UsersColor>({});
  const [keysColor, setKeysColor] = useState(initialKeysColor);
  const [resetKey, setResetKey] = useState<number>(0);

  useEffect(() => {
    const storedColors: UsersColor = JSON.parse(localStorage.getItem('userColors') || '{}');
    setUsersColors(storedColors);
  }, []);

  const handleColorChange = (keyName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColors = { ...usersColors, [keyName]: event.target.value };
    setUsersColors(newColors);
  };

  const handleReset = () => {
    const resetColors = initialKeysColor.reduce((colors, key) => ({ ...colors, [key.name]: key.color }), {});
    setUsersColors(resetColors);
    setKeysColor(initialKeysColor);
    setResetKey(prevKey => prevKey + 1); // increment the resetKey to force re-render
  };

  return (
    <>
      <div className="p-6">・キーの色</div>
      <div className="pl-6">※この機能は未完成です。</div>
      <div className="pl-6">
        {keysColor.map((key) => (
          <div key={key.name}>
            <label>{key.name}:</label>
            <input key={`${key.name}-${resetKey}`} type="color" value={usersColors[key.name]} onChange={handleColorChange(key.name)} />
          </div>
        ))}
        <button className="pt-6"onClick={handleReset}>設定をリセット</button>
      </div>
    </>
  );
};