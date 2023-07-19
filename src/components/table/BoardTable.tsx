import React from 'react';
import AddTaskTable from './AddTaskTable';

interface Task {
    id: string;
    Task: string;
    Due_Date: string;
    status: string;
}

interface Data {
    columns: Columns;
    tasks: Task[];
}

interface Columns {
    [key: string]: {
        title: string;
    };
}

interface BoardTableProps {
    data: Data;
    refresh: Function
}

const BoardTable: React.FC<BoardTableProps> = ({ data, refresh }) => {
    return (
        <div className='board-table'>
            <div className='board-table-inner'>
                <table>
                    <thead>
                        <tr>
                            <th>Thẻ</th>
                            <th>Danh sách</th>
                            <th>Thành viên</th>
                            <th>Đến hạn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.tasks.map((item: Task, index: number) => (
                            <React.Fragment key={item.id}>
                                <tr>
                                    <td>
                                        <AddTaskTable id={item.id} refresh={refresh} columns={data.columns} />
                                        {item.Task}
                                    </td>
                                    <td>{item.status}</td>
                                    <td>Me</td>
                                    <td>
                                        {new Date(item.Due_Date).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BoardTable;
