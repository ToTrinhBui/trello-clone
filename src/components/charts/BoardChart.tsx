import React from 'react';

import CardsPerList from './CardsPerList'
import { Member, Task } from '../../interface';
import CardsPerMember from './CardsPerMember';
import CardsPerListPie from './CardsPerListPie';
import CardsPerMemberPie from './CardsPerMemberPie';
interface Data {
    columns: Columns;
    tasks: Task[];
}
interface Columns {
    [key: string]: {
        title: string;
    };
}
interface BoardChartProps {
    data: Data;
    members: Member[];
}
const BoardChart: React.FC<BoardChartProps> = ({ data, members }) => {
    return (
        <div className='board-chart'>
            <div className='board-chart-inner'>
                <CardsPerList data={data} />
                <CardsPerListPie data={data} />
                <CardsPerMemberPie data={data} members={members} />
                <CardsPerMember data={data} members={members} />
            </div>
        </div>
    )
}

export default BoardChart