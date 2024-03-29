import React from 'react'
import './pagination.css'

const Pagination = () => {
    return (
        <div class="pagination">
            <span class="pagination__number-indicator"></span>
            <button class="pagination__arrow">
                <span class="pagination__arrow-half"></span>
                <span class="pagination__arrow-half"></span>
            </button>
            <button class="pagination__number">1</button>
            <button class="pagination__number">2</button>
            <button class="pagination__number">3</button>
            <button class="pagination__number pagination__number--active">4</button>
            <button class="pagination__number">5</button>
            <button class="pagination__number">6</button>
            <button class="pagination__number">7</button>
            <button class="pagination__arrow pagination__arrow--right">
                <span class="pagination__arrow-half"></span>
                <span class="pagination__arrow-half"></span>
            </button>
        </div>
    )
}

export default Pagination