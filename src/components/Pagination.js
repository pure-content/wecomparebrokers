import React from 'react'

export default function Pagination({ postsPerPage, totalPosts, currentPage, setCurrentPage, noNumbers }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    if (noNumbers) {
        return (
            <>
                {currentPage > 1 ? <a class="prev pagination" onClick={() => setCurrentPage(currentPage--)}> Previous</a> : <span class="prev">Previous</span>}
                {currentPage !== pageNumbers ? <a class="next pagination" onClick={() => setCurrentPage(currentPage++)} >Next </a> : <span class="next">Next</span>}
            </>
        )
    }
    return (
        <ul class="pagination">
            {currentPage > 1 ? <li><a class="prev pagination" onClick={() => setCurrentPage(currentPage--)}><i class="fa fa-angle-left" aria-hidden="true"></i> Previous</a></li> : null}
            {pageNumbers.map(number => {
                return <li key={number}>{currentPage === number ? <span aria-current="page" class="pagination current">{number}</span> : <a class='pagination' onClick={() => setCurrentPage(number)}>{number}</a>}</li>
            })}
            {currentPage !== pageNumbers ? <li><a class="next pagination" onClick={() => setCurrentPage(currentPage++)} >Next <i class="fa fa-angle-right" aria-hidden="true"></i></a></li> : null}
        </ul>
    )
}
