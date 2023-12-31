import React from 'react'; import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Task } from '../../interface';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
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
const CardsPerList: React.FC<ChartProps> = ({ data }) => {
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
    
    const dataFilter = {
        labels: Object.keys(titleCountMap),
        datasets: [
            {
                label: "Số lượng thẻ",
                backgroundColor: "#1a254a",
                borderColor: "#1a254a",
                data: Object.values(titleCountMap),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Cards per List',
            },
        }
    }
    return (
        <div className='chart-outer'>
            <Bar data={dataFilter}
                width={"485px"} height={"300px"}
                options={options} />
        </div>
    );
}

export default CardsPerList