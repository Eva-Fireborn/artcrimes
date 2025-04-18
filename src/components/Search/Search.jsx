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
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="artist">Artist</label>
                <input
                    type="text"
                    id="artist"
                    name="name"
                    placeholder="Search for artist name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button className="btn primary" type="submit" disabled={!searchName}>Search</button>
            </form>
            {<button className="btn secondary" onClick={onClickClearResult}>Clear search results</button>}
        </div>
    )
}

export default Search;