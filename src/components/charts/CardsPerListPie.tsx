import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Task } from '../../interface';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
    columns: Columns;
    tasks: Task[];
}
interface Columns {
    [key: string]: {
        title: string;
    };
}
interface ChartProps {
    data: Data;
}
const CardsPerListPie: React.FC<ChartProps> = ({ data }) => {
    const columnIdList: string[] = Object.keys(data.columns);
    const columnIdCount: { [key: string]: number } = {};

    columnIdList.forEach((element) => {
        columnIdCount[element] = 0;
    })

    data.tasks.forEach((task) => {
        columnIdCount[task.status]++;
    })

    const titleCountMap: { [title: string]: number } = {};

    columnIdList.forEach((columnId) => {
        const title = data.columns[columnId].title;
        titleCountMap[title] = columnIdCount[columnId];
    });

    function getListColor(): string[] {
        const listColor: string[] = [];
        let temp = columnIdList.length;
        while (temp > 0) {
            const color: string = "#" + Math.floor(Math.random() * 16777215).toString(16);
            listColor.push(color);
            temp--;
        }

        return listColor;
    }

    const listColor: string[] = getListColor();

    const dataFilter = {
        labels: Object.keys(titleCountMap),
        datasets: [
            {
                label: 'Số lượng thẻ',
                data: Object.values(titleCountMap),
                backgroundColor: listColor,
                borderColor: "white",
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right" as const,
                display: true
            },
            title: {
                display: true,
                text: 'Cards per List',
            },
        },
    };    

    return (
        <div className='chart-outer'>
            <Pie data={dataFilter}
                width={"485px"} height={"300px"}
                options={options} />
        </div>
    )
}

export default CardsPerListPie