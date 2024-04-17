import "./styles.css";
import { useState, useEffect } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Cheer Up",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 2,
    title: "TT",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 3,
    title: "Likey",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 4,
    title: "Feel Special",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 5,
    title: "Fancy",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 6,
    title: "What is Love?",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 7,
    title: "MORE & MORE",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 8,
    title: "Heart Shaker",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 9,
    title: "YES or YES",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 10,
    title: "Undefeated",
    artist: "XG",
    genre: "K-Pop",
  },
  {
    id: 11,
    title: "ETA",
    artist: "New Jeans",
    genre: "K-Pop",
  },
  {
    id: 12,
    title: "Signal",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 13,
    title: "Chill Kill",
    artist: "Red Velvet",
    genre: "K-Pop",
  },
  {
    id: 14,
    title: "WANNABE",
    artist: "ITZY",
    genre: "K-Pop",
  },
  {
    id: 15,
    title: "ONE SPARK",
    artist: "TWICE",
    genre: "K-Pop",
  },
  {
    id: 16,
    title: "BDZ",
    artist: "TWICE",
    genre: "J-Pop",
  },
  {
    id: 17,
    title: "Stay by my side",
    artist: "TWICE",
    genre: "J-Pop",
  },
  {
    id: 18,
    title: "Breakthrough",
    artist: "TWICE",
    genre: "J-Pop",
  },
  {
    id: 19,
    title: "Queendom",
    artist: "Red Velvet",
    genre: "K-Pop",
  },
  {
    id: 20,
    title: "Perfect Night",
    artist: "Le Sserafim",
    genre: "K-Pop",
  },
];

const tempPlaylist = [
  {
    id: 1,
    title: "Dance Again",
    artist: "TWICE",
    genre: "J-Pop",
  },
  {
    id: 2,
    title: "Perfect World",
    artist: "TWICE",
    genre: "J-Pop",
  },
];

function Box({ children, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function PlayList({ playlist, removeFromPlaylist }) {
  const handleRemoveFromPlaylist = (title) => {
    removeFromPlaylist(title);
  };

  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <button onClick={() => handleRemoveFromPlaylist(music.title)}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

function Music({ music, addToPlaylist }) {
  const handleAddToPlaylist = (selectedMusic) => {
    addToPlaylist(selectedMusic);
  };

  return (
    <div>
      <ul>
        {music.map((song) => (
          <li key={song.id}>
            {song.title} by {song.artist} ({song.genre}){" "}
            <button onClick={() => handleAddToPlaylist(song)}>❤️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className="container">{children}</nav>;
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}

function NumResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Summary({ playlist }) {
  const [totalSongs, setTotalSongs] = useState(0);
  const [genreDistribution, setGenreDistribution] = useState({});

  useEffect(() => {
    let songsCount = 0;
    let genreCounts = {};

    playlist.forEach((song) => {
      songsCount++;

      if (song.genre in genreCounts) {
        genreCounts[song.genre]++;
      } else {
        genreCounts[song.genre] = 1;
      }
    });

    setTotalSongs(songsCount);
    setGenreDistribution(genreCounts);
  }, [playlist]);

  return (
    <div>
      <h3>Playlist Summary</h3>
      <p>Total Songs: {totalSongs}</p>
      <h4>Genre Distribution:</h4>
      <ul>
        {Object.entries(genreDistribution).map(([genre, count]) => (
          <li key={genre}>
            {genre}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Search({ setSearchResults, music }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const filteredResults = music.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search TITLE or ARTIST"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [searchResults, setSearchResults] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  const addToPlaylist = (selectedMusic) => {
    const isDuplicate = playlist.some(
      (song) => song.title === selectedMusic.title
    );
    if (!isDuplicate) {
      setPlaylist([...playlist, selectedMusic]);
    } else {
      console.log("Song with the same title already exists in the playlist.");
    }
  };

  const removeFromPlaylist = (title) => {
    setPlaylist(playlist.filter((song) => song.title !== title));
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    if (sortOption) {
      const sortedMusic = [...music].sort((a, b) => {
        if (a[sortOption] < b[sortOption]) return -1;
        if (a[sortOption] > b[sortOption]) return 1;
        return 0;
      });
      setMusic(sortedMusic);
    }
  }, [sortOption]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search setSearchResults={setSearchResults} music={music} />
        <NumResult music={searchResults.length ? searchResults : music} />
        <div>
          <label htmlFor="sortOption">Sort by:</label>
          <select id="sortOption" onChange={(e) => handleSort(e.target.value)}>
            <option value="">Select</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="genre">Genre</option>
          </select>
        </div>
      </NavBar>
      <Main>
        <Box title="Music List">
          <Music
            music={searchResults.length ? searchResults : music}
            addToPlaylist={addToPlaylist}
          />
        </Box>
        <Box title="Playlist">
          <PlayList
            playlist={playlist}
            removeFromPlaylist={removeFromPlaylist}
          />
        </Box>
        <Box title="Summary">
          <Summary playlist={playlist} />
        </Box>
      </Main>
    </>
  );
}

export default App;
