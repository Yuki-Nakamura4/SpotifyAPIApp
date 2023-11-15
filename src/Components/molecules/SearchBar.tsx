type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    artistData: { name: string; id: string }[];
    handleArtistClick: (artistId: string) => void;
  };
  
  export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, artistData, handleArtistClick }) => {
    return (
      <div>
        <div className="pt-4 flex justify-center">
          <input
            type="text"
            placeholder="アーティスト名を検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className= "w-1/3 px-2 mx-auto justify-center text-center rounded-full hover:border-blue-500 border-2"
          />
        </div>
        {artistData.map((artist, index) => (
          <div className="w-1/3 mx-auto" key={index} onClick={() => handleArtistClick(artist.id)}>
            <div className="cursor-pointer flex justify-center hover:bg-slate-200 overflow-hidden whitespace-nowrap text-overflow-ellipsis">{artist.name}</div>
          </div>
        ))}
      </div>
    );
  };