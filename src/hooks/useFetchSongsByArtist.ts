import { Dispatch, SetStateAction } from 'react';

type UseFetchSongsByArtistProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResult: Dispatch<SetStateAction<any>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchPerformed: Dispatch<SetStateAction<boolean>>;
  setSelectedArtist: Dispatch<SetStateAction<string | null>>;
  setSongsErrorMessage: Dispatch<SetStateAction<string>>;
  artistData: any[];
};

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
      setSearchQuery('');
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