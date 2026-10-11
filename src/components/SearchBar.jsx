
import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!city.trim()) return;

    onSearch(city.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
