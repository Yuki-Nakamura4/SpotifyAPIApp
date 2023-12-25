import {keysColor} from './KeysColor';

export type KeyInfo = {
    name: string;
    color: string;
    keySign: string;
    sharpNum: number;
    flatNum: number;
    keySignNum: number;
  };
  
  // 12種類の調(キー)のオブジェクトを格納した配列
  // 各調の名前、色、調号、シャープの数、フラットの数、調号の数を格納
  // keySignNum = sharpNum + flatNumとしていないのは、G♭/D♯mがあるため
  // G♭/D#mは♭6つと#6つとも表現できるのでどちらの解釈も残しておきたいが、
  // keySignNum=sharpNum+flatNumとすると、どちらか一方しか表現できない
  export const keysInfo: KeyInfo[] = [
    { name: "C/Am", color: keysColor[0].color, keySign:"♮", sharpNum:0, flatNum:0, keySignNum: 0 },
    { name: "G/Em", color: keysColor[1].color,  keySign:"♯", sharpNum:1, flatNum:0, keySignNum: 1 },
    { name: "D/Bm", color: keysColor[2].color, keySign:"♯♯",sharpNum:2, flatNum:0, keySignNum: 2 },
    { name: "A/F♯m", color: keysColor[3].color, keySign:"♯♯♯",sharpNum:3, flatNum:0, keySignNum: 3 },
    { name: "E/C♯m", color: keysColor[4].color, keySign:'♯♯♯♯',sharpNum:4, flatNum:0, keySignNum: 4 },
    { name: "B/G♯m", color: keysColor[5].color, keySign: '♯♯♯♯♯',sharpNum:5, flatNum:0, keySignNum: 5 },
    { name: "G♭/D♯m", color:keysColor[6].color, keySign:'♭♭♭♭♭♭/♯♯♯♯♯♯',sharpNum:6, flatNum:6, keySignNum: 6 },
    { name: "D♭/B♭m", color:keysColor[7].color,keySign:'♭♭♭♭♭', sharpNum:0, flatNum:5, keySignNum: 5 },
    { name: "A♭/Fm", color: keysColor[8].color, keySign:'♭♭♭♭',sharpNum:0, flatNum:4, keySignNum: 4 },
    { name: "E♭/Cm", color: keysColor[9].color, keySign:'♭♭♭',sharpNum:0, flatNum:3, keySignNum: 3 },
    { name: "B♭/Gm", color: keysColor[10].color, keySign:'♭♭',sharpNum:0, flatNum:2, keySignNum: 2 },
    { name: "F/Dm", color:keysColor[11].color, keySign:'♭',sharpNum:0, flatNum:1, keySignNum: 1 },
  ];

