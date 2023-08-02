import React from 'react';

import CardsPerList from './CardsPerList'

const BoardChart = () => {
    return (
        <div className='board-chart'>
            <div className='board-chart-inner'>
                <CardsPerList/>
                <CardsPerList/>
                <CardsPerList/>
                <CardsPerList/>
            </div>
        </div>
    )
}

export default BoardChart