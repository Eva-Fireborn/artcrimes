function Search({ searchName, setSearchName, onClickSearch }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onClickSearch(1);
    };

    const onClickClearResult = () => {
        setSearchName('');
        onClickSearch(1, '');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="artist">Artist</label>
                <input
                    type="text"
                    id="artist"
                    name="name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button type="submit" disabled={!searchName}>Search</button>
            </form>
            {<button onClick={onClickClearResult}>Clear search results</button>}
        </div>
    )
}

export default Search;