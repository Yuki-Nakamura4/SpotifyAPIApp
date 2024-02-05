import { Dispatch, SetStateAction } from 'react';

type UseFetchSongsByArtistProps = {
  // Dispatchは「なんらかの値を受け取って処理する関数(戻り値なし)」を意味するだけの汎用的な型
  // SetStateActionは「なんらかの値そのもの」か「なんらかの値を受け取り、処理した結果を同じ型で返す関数」であることを意味する
  // つまり、Dispatch<SetStateAction<boolean>>は「boolean型の値を受け取って処理する関数(戻り値なし)」
  // よく分からんけどsetState関数の型はDispatch<SetStateAction<更新するstateの型>>になるってコト？
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResult: Dispatch<SetStateAction<any>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchPerformed: Dispatch<SetStateAction<boolean>>;
  setSelectedArtist: Dispatch<SetStateAction<string | null>>;
  setSongsErrorMessage: Dispatch<SetStateAction<string>>;
  artistData: { id: string; name: string }[];
};

// 指定されたアーティストの曲データを取得するカスタムフック
export const useFetchSongsByArtist = ({
  setLoading,
  setSearchResult,
  setSearchQuery,
  setSearchPerformed,
  setSelectedArtist,
  setSongsErrorMessage,
  artistData,
}: UseFetchSongsByArtistProps) => {
  return async (artistId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/get_songs_by_artist/?artist_id=${artistId}`);
      const data = await response.json();
      setSearchResult(data);
      setSearchQuery(''); // データを取得したら検索欄を空にする
      setSearchPerformed(true);
      const artistName = artistData.find(artist => artist.id === artistId)?.name;
      setSelectedArtist(artistName || null);
    } catch (error) {
      console.error(error);
      setSongsErrorMessage('データの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };
};