import { useEffect, useState } from 'react';
import { API_URL } from './data/settings';
import Table from './components/Table/Table';

function App() {
  const pageSize = 25;
  const [pageNumber, setPageNumber] = useState(1);
  const [isApiError, setIsApiError] = useState(false);
  const [result, setResult] = useState(null);
  const [resultTotal, setResultTotal] = useState(0);

  const fetchArtcrimeData = async () => {
    let headers = {};
    if (import.meta.env.VITE_API_KEY) {
      headers['X-Api-Key'] = import.meta.env.VITE_API_KEY
    }

    try {
      const response = await fetch(`${API_URL}?pageSize=${pageSize}&page=${pageNumber}&sort_order=desc&sort_on=_score`, {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <header><h1>National Stolen Art File</h1></header>
    <main>
      {isApiError && <p>An error occured, refresh your browser and try again.</p>}
      {!isApiError && result && (
        <div>
          <h2 className='visually-hidden'>List of national stolen art</h2>
          <Table
            result={result}
            resultTotal={resultTotal}
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
        </div>
      )}
    </main>
    </>
  )
}

export default App
