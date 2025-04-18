function Pagination({ pageNumber, pageSize, resultTotal, onClickPagination }) {

    const renderPaginationButtons = () => {
        const numberForButtons = [pageNumber];
        const numberofPages = resultTotal / pageSize;
        let userFriendlyNumber = numberofPages ===  Math.floor(numberofPages)
            ? Math.floor(numberofPages)
            : Math.floor(numberofPages) + 1;
        const maximumAmountOfButtons = userFriendlyNumber > 11 ? 11 : userFriendlyNumber;

        const nodes = [
            <p key="information-text">{`Showing page ${pageNumber} of ${userFriendlyNumber}`}</p>
        ]

        if (maximumAmountOfButtons === 0) {
            return nodes;
        }
        while (numberForButtons.length < maximumAmountOfButtons) {
            if (numberForButtons[0] > 1) {
                numberForButtons.unshift(numberForButtons[0] - 1)
            }
            if (numberForButtons[numberForButtons.length - 1] < userFriendlyNumber) {
                numberForButtons.push(numberForButtons[numberForButtons.length - 1] + 1);
            }
        }

        if (pageNumber > 1) {
            nodes.push(
                <button
                    key="returnToFirstButton"
                    onClick={() => onClickPagination(1)}
                >First page</button>
            );
        }
     
        for (let i = 0; i < numberForButtons.length; i++) {
            nodes.push(
                <button
                    key={`paginationbutton${i}`}
                    onClick={() => onClickPagination(numberForButtons[i])}
                >{`${numberForButtons[i]}`}</button>
            );
        }

        if (pageNumber < userFriendlyNumber) {
            nodes.push(
                <button
                    key="returnToLastButton"
                    onClick={() => onClickPagination(userFriendlyNumber)}
                >Last page</button>
            );
        }
        return nodes;
    }

    return (
        <>
        <h3 className='visually-hidden'>Pagination</h3>
        <div>{renderPaginationButtons()}</div>
        </>
    )
}
export default Pagination;