import { useEffect, useState } from 'react';
import { API_URL } from './data/settings';
import Table from './components/Table/Table';
import Search from './components/Search/Search';
import Modal from './components/Modal/Modal';

function App() {
  const pageSize = 25;
  const [pageNumber, setPageNumber] = useState(1);
  const [isApiError, setIsApiError] = useState(false);
  const [result, setResult] = useState(null);
  const [resultTotal, setResultTotal] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchArtcrimeData = async (requestedPage = 1, search = searchName) => {
    let headers = {};
    if (import.meta.env.VITE_API_KEY) {
      headers['X-Api-Key'] = import.meta.env.VITE_API_KEY
    }
    let artistSearch = '';
    if (search) {
      artistSearch = `maker=${search}&`;
    }

    try {
      const response = await fetch(`${API_URL}?${artistSearch}pageSize=${pageSize}&page=${requestedPage}&sort_order=desc&sort_on=_score`, {
        headers
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      setPageNumber(jsonResponse?.page);
      setResultTotal(jsonResponse?.total);
      setResult(jsonResponse?.items);
      console.log(jsonResponse);
    } catch (error) {
      console.error(error.message);
      setIsApiError(true);
    }
  }

  useEffect(() => {
    fetchArtcrimeData();
  }, []);

  return (
    <>
    <header><h1>National Stolen Art File</h1></header>
    <main>
      {isApiError && <p>An error occured, refresh your browser and try again.</p>}
      <Modal content={selectedItem === null ? null : result[selectedItem]} setSelectedItem={setSelectedItem} />
      {!isApiError && result && (
        <Search
          searchName={searchName}
          setSearchName={setSearchName}
          onClickSearch={fetchArtcrimeData}
        />
      )}
      {!isApiError && result && ( 
          <Table
            result={result}
            resultTotal={resultTotal}
            pageNumber={pageNumber}
            pageSize={pageSize}
            onClickPagination={fetchArtcrimeData}
            setSelectedItem={setSelectedItem}
            categories={[
              {
                title: 'Artwork title',
                key: 'title'
              },
              {
                title: 'Artist',
                key: 'maker'
              },
              {
                title: 'Crime category',
                key: 'crimeCategory'
              }
            ]}
          />
      )}
    </main>
    </>
  )
}

export default App
