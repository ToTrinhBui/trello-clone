import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Member, Task } from '../../interface';

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
    members: Member[];
}
const CardsPerMemberPie: React.FC<ChartProps> = ({ data, members }) => {
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

    function getListColor(): string[] {
        const listColor: string[] = [];
        let temp = userIdList.length;
        while (temp > 0) {
            const color: string = "#" + Math.floor(Math.random() * 16777215).toString(16);
            listColor.push(color);
            temp--;
        }

        return listColor;
    }

    const listColor: string[] = getListColor();

    const dataFilter = {
        labels: Object.keys(emailCountMap),
        datasets: [
            {
                label: "Số lượng thẻ",
                data: Object.values(emailCountMap),
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
                text: 'Cards per Member',
            },
        }
    }
    return (
        <div className='chart-outer'>
            <Pie data={dataFilter}
                width={"485px"} height={"300px"}
                options={options} />
        </div>
    );
}

export default CardsPerMemberPie