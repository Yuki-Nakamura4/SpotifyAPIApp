// SearchSection.tsx
import React from 'react';
import {SearchBar} from '../molecules/SearchBar';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  artistData: { name: string; id: string }[];
  handleArtistClick: (artistId: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  artistData,
  handleArtistClick,
}) => {
  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        artistData={artistData}
        handleArtistClick={handleArtistClick}
      />
    </div>
  );
};

export default SearchSection;
