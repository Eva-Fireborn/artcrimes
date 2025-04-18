function Pagination({ pageNumber, pageSize, resultTotal, onClickPagination }) {

    const renderPaginationButtons = () => {
        const numberForButtons = [pageNumber];
        const numberofPages = resultTotal / pageSize;
        let userFriendlyNumber = numberofPages ===  Math.floor(numberofPages)
            ? Math.floor(numberofPages)
            : Math.floor(numberofPages) + 1;
        const maximumAmountOfButtons = userFriendlyNumber > 11 ? 11 : userFriendlyNumber;

        const nodes = [
            <p className="bold-text" key="information-text">{`Showing page ${pageNumber} of ${userFriendlyNumber}`}</p>
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
                    className="pagination-end-buttons"
                    onClick={() => onClickPagination(1)}
                >
                    <svg aria-hidden="true" className="arrow-icon -left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                    First page
                </button>
            );
        }
     
        for (let i = 0; i < numberForButtons.length; i++) {
            nodes.push(
                <button
                    key={`paginationbutton${i}`}
                    className={`pagination-button ${numberForButtons[i] === pageNumber && '-active'}`}
                    onClick={() => onClickPagination(numberForButtons[i])}
                >{`${numberForButtons[i]}`}</button>
            );
        }

        if (pageNumber < userFriendlyNumber) {
            nodes.push(
                <button
                    key="returnToLastButton"
                     className="pagination-end-buttons"
                    onClick={() => onClickPagination(userFriendlyNumber)}
                >
                    Last page
                    <svg aria-hidden="true" className="arrow-icon -right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                    </svg>
                </button>
            );
        }
        return nodes;
    }

    return (
        <>
        <h3 className='visually-hidden'>Pagination</h3>
        <div className="pagination-wrapper">{renderPaginationButtons()}</div>
        </>
    )
}
export default Pagination;