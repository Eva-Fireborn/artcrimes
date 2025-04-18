function Table({ result, categories, resultTotal }) {
    return (
        <>
        <p>{`${resultTotal} results`}</p>
        {!result?.length ? (
            <p>No results found</p>
        ) : (
            <div role="grid" aria-colcount={categories?.length} aria-rowcount={resultTotal > 25 ? 25 : resultTotal}>
                <table>
                    <thead>
                        <tr role="row" aria-rowindex="1">
                            {categories.map((cat, index) => (
                                <th role="columnheader" aria-colindex={index} key={cat.key}>{cat.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((item, i) => (
                            <tr role="row" aria-rowindex={i + 1} key={item?.uid}>
                                {categories.map((cat, index) => (
                                    <td role="gridcell" aria-colindex={index} key={`${item[cat.key]}+${index}`}>{item[cat.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        </>
    )
}

export default Table;