// keysInfo.ts
export type KeyInfo = {
    name: string;
    color: string;
    sharpNum: number;
    flatNum: number;
    keySignNum: number;
  };
  
  // 12種類の調(キー)のオブジェクトを格納した配列
  // 各調の名前、色、フラットの数、シャープの数、調号の数を格納
  // keySignNum = sharpNum + flatNumとしていないのは、G♭/D♯mがあるため
  // G♭/D#mは♭6つと#6つとも表現できるのでどちらの解釈も残しておきたいが、
  // keySignNum=sharpNum+flatNumとすると、どちらか一方しか表現できない
  export const KeysInfo: KeyInfo[] = [
    { name: "C/Am", color: '#fff8ff',  sharpNum:0, flatNum:0, keySignNum: 0 },
    { name: "G/Em", color: '#00CEFF',  sharpNum:1, flatNum:0, keySignNum: 1 },
    { name: "D/Bm", color: '#FFFF8A', sharpNum:2, flatNum:0, keySignNum: 2 },
    { name: "A/F♯m", color: '#FF596D', sharpNum:3, flatNum:0, keySignNum: 3 },
    { name: "E/C♯m", color: '#00FF7E', sharpNum:4, flatNum:0, keySignNum: 4 },
    { name: "B/G♯m", color: '#FFC88A', sharpNum:5, flatNum:0, keySignNum: 5 },
    { name: "G♭/D♯m", color: '#BB62FF', sharpNum:6, flatNum:6, keySignNum: 6 },
    { name: "D♭/B♭m", color: '#D4FFF6', sharpNum:0, flatNum:5, keySignNum: 5 },
    { name: "A♭/Fm", color: '#4F5EFF', sharpNum:0, flatNum:4, keySignNum: 4 },
    { name: "E♭/Cm", color: '#00B5D4', sharpNum:0, flatNum:3, keySignNum: 3 },
    { name: "B♭/Gm", color: '#ECEBEC', sharpNum:0, flatNum:2, keySignNum: 2 },
    { name: "F/Dm", color: '#FFF8D8', sharpNum:0, flatNum:1, keySignNum: 1 },
  ];