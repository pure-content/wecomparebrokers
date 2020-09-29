import React from 'react'

export default function Pagination({ postsPerPage, totalPosts, currentPage, setCurrentPage, noNumbers }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    if (pageNumbers.length > 4) {
        let prevPage = currentPage > 1 ? currentPage - 1 : null
        let nextPage = currentPage < pageNumbers.length ? currentPage + 1 : null
        let lastPage = pageNumbers.length
        let firstPage = 1

        return (
            <ul class="pagination">
                {currentPage > 1 ? <li><a class="prev pagination" onClick={() => setCurrentPage(currentPage--)}><i class="fa fa-angle-left" aria-hidden="true"></i> Previous</a></li> : null}
                {currentPage > 3 ? <li><a class='pagination' onClick={() => setCurrentPage(firstPage)}>{firstPage}</a></li> : null}
                {currentPage > 3 ? <li><span class="pagination dots">…</span></li> : null}

                {prevPage ? <li><a class='pagination' onClick={() => setCurrentPage(prevPage)}>{prevPage}</a></li> : null}
                <li><span aria-current="page" class="pagination current">{currentPage}</span></li>
                {nextPage ? <li><a class='pagination' onClick={() => setCurrentPage(nextPage)}>{nextPage}</a></li> : null}

                {currentPage !== lastPage ? <li><span class="pagination dots">…</span></li> : null}
                {currentPage !== lastPage ? <li><a class='pagination' onClick={() => setCurrentPage(lastPage)}>{lastPage}</a></li> : null}
                {currentPage !== lastPage ? <li><a class="next pagination" onClick={() => setCurrentPage(currentPage++)} >Next <i class="fa fa-angle-right" aria-hidden="true"></i></a></li> : null}
            </ul>
        )
    }
    if (noNumbers) {
        return (
            <>
                {currentPage > 1 ? <a class="prev pagination" onClick={() => setCurrentPage(currentPage--)}> Previous</a> : <span class="prev">Previous</span>}
                {currentPage !== pageNumbers.length ? <a class="next pagination" onClick={() => setCurrentPage(currentPage++)} >Next </a> : <span class="next">Next</span>}
            </>
        )
    }
    return (
        <ul class="pagination">
            {currentPage > 1 ? <li><a class="prev pagination" onClick={() => setCurrentPage(currentPage--)}><i class="fa fa-angle-left" aria-hidden="true"></i> Previous</a></li> : null}
            {pageNumbers.map(number => {
                return <li key={number}>{currentPage === number ? <span aria-current="page" class="pagination current">{number}</span> : <a class='pagination' onClick={() => setCurrentPage(number)}>{number}</a>}</li>
            })}
            {currentPage !== pageNumbers.length ? <li><a class="next pagination" onClick={() => setCurrentPage(currentPage++)} >Next <i class="fa fa-angle-right" aria-hidden="true"></i></a></li> : null}
        </ul>
    )
}

