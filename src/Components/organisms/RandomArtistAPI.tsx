export const getRandomArtists = () => {
  const artistNames = [
    'アーティスト1',
    'アーティスト2',
    'アーティスト3',
    'アーティスト4',
  ];

  // ランダムにアーティスト名を選択
  const randomIndex = Math.floor(Math.random() * artistNames.length);
  const randomArtist = artistNames[randomIndex];

  return randomArtist;
};