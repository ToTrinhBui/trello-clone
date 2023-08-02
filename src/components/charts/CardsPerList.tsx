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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CardsPerList = () => {
    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [
            {
                // label: "My First dataset",
                backgroundColor: "#1a254a",
                borderColor: "#1a254a",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

    const options = {
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
            <Bar data={data}
                width={"485px"} height={"300px"}
                options={options} />
        </div>
    );
}

export default CardsPerList