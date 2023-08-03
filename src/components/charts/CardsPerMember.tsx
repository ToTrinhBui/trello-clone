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
import { Member, Task } from '../../interface';

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
    members: Member[];
}
const CardsPerMember: React.FC<ChartProps> = ({ data, members }) => {
    const userIdList: string[] = members.map(member => member.user_id);
    const userIdCount: { [key: string]: number } = {};

    userIdList.forEach(item => {
        userIdCount[item] = 0;
    })

    data.tasks.forEach(task => {
        task.members_task.forEach(userId => {
            userIdCount[userId]++;
        })
    })

    const emailCountMap: { [email: string]: number } = {};

    members.forEach(member => {
        const emailUser = member.email;
        emailCountMap[emailUser] = userIdCount[member.user_id];
    })

    const dataFilter = {
        labels: Object.keys(emailCountMap),
        datasets: [
            {
                label: "Số lượng thẻ",
                backgroundColor: "#1a254a",
                borderColor: "#1a254a",
                data: Object.values(emailCountMap),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Cards per Member',
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

export default CardsPerMember