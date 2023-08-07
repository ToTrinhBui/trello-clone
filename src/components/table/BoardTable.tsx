import React from 'react';
import AddTaskTable from './AddTaskTable';
import EditTask from '../kanban/EditTask';
import { Member, Task } from '../../interface';
import Avatar from 'react-avatar';

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
    refresh: Function,
    members: Member[]
}

const BoardTable: React.FC<BoardTableProps> = ({ data, refresh, members }) => {
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
                            <th></th>
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
                                    <td>{data.columns[item.status]?.title}</td>
                                    <td>
                                        <div className='list-members'>
                                            {members.map((member, index) => (
                                                Array.isArray(item.members_task) && item.members_task.includes(member.user_id) ?
                                                    //     <div className='member-outer' key={index}>
                                                    //         <div className='member-icon' style={{ padding: '0px', height: '20px', width: '20px' }}>
                                                    //             <p>{member.email.charAt(0).toUpperCase()}</p>
                                                    //             <div className='member' style={{ background: member.color, height: '28px', width: '28px' }}></div>
                                                    //         </div>
                                                    //     </div>
                                                    <Avatar key={index} name={member.email} size={'30'} round="20px" />
                                                    : <div key={index}></div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        {new Date(item.Due_Date).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </td>
                                    <td>
                                        <EditTask item={item} members={members} status_title={data.columns[item.status]?.title} refresh={refresh}>
                                            <div className='edit-board-table'>
                                                <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path></svg>
                                            </div>
                                        </EditTask>
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
