import React from 'react'

function Pagination({ totalPosts, postsPerPage, setCurrentPage }) {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map((page, index) => (
                    <button className='bg-red-600 p-3' key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                ))
            }
        </div >
    )
}

export default Pagination