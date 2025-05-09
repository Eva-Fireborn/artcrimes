import Pagination from "../Pagination/Pagination";

function Table({ result, categories, resultTotal, pageNumber, pageSize, onClickPagination, setSelectedItem }) {
    return (
        <>
        <h2 className='visually-hidden'>List of national stolen art</h2>
        <p className="bold-text">{`${resultTotal} results found`}</p>
        {!result?.length ? (
            <p>No results found</p>
        ) : (
            <>
                <div role="grid" aria-colcount={categories?.length} aria-rowcount={resultTotal > 25 ? 25 : resultTotal}>
                    <table className="table">
                        <thead>
                            <tr role="row" aria-rowindex="1">
                                {categories.map((cat, index) => (
                                    <th role="columnheader" aria-colindex={index} key={cat.key}>{cat.title}</th>
                                ))}
                                <th>More information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, i) => (
                                <tr role="row" aria-rowindex={i + 1} key={item?.uid}>
                                    {categories.map((cat, index) => (
                                        <td role="gridcell" aria-colindex={index} key={`${item[cat.key]}+${index}`}>{item[cat.key]}</td>
                                    ))}
                                    <td>
                                        <button
                                            className="btn primary"
                                            onClick={() => setSelectedItem(i)}
                                        >See details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    resultTotal={resultTotal}
                    onClickPagination={onClickPagination}
                />
            </>
        )}
        </>
    )
}

export default Table;