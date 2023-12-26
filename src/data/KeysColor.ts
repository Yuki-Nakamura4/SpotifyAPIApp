export type KeysColor = {
    name: string;
    color: string;
  };
  
  export type UsersColor = {
    [key: string]: string;
  };
  
  const storedUsersColor: UsersColor = JSON.parse(localStorage.getItem('userColors') || '{}');

  export const keysColor: KeysColor[] = [
    { name: "C/Am", color: storedUsersColor["C/Am"] || '#fff8ff' },
    { name: "G/Em", color: storedUsersColor["G/Em"] || '#00CEFF' },
    { name: "D/Bm", color: storedUsersColor["D/Bm"] || '#FFFF8A' },
    { name: "A/F♯m", color: storedUsersColor["A/F♯m"] || '#FF596D' },
    { name: "E/C♯m", color: storedUsersColor["E/C♯m"] || '#00FF7E' },
    { name: "B/G♯m", color: storedUsersColor["B/G♯m"] || '#FFC88A' },
    { name: "G♭/D♯m", color: storedUsersColor["G♭/D♯m"] || '#BB62FF' },
    { name: "D♭/B♭m", color: storedUsersColor["D♭/B♭m"] || '#D4FFF6' },
    { name: "A♭/Fm", color: storedUsersColor["A♭/Fm"] || '#4F5EFF' },
    { name: "E♭/Cm", color: storedUsersColor["E♭/Cm"] || '#00B5D4' },
    { name: "B♭/Gm", color: storedUsersColor["B♭/Gm"] || '#ECEBEC' },
    { name: "F/Dm", color: storedUsersColor["F/Dm"] || '#FFF8D8' },
  ];

  