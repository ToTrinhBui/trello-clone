import { v4 as uuidv4 } from 'uuid';
export const data = [
    {
        id: '1',
        Task: 'Kanban',
        Due_Date: '25-May-2020',
    },
    {
        id: '2',
        Task: 'Table',
        Due_Date: '26-May-2020',
    },
    {
        id: '3',
        Task: 'Login/Logout',
        Due_Date: '27-May-2020',
    },
    {
        id: '4',
        Task: 'Light/Dark mode',
        Due_Date: '23-Aug-2020',
    },
];

export const columnsFromBackend = {
    [uuidv4()]: {
        title: 'To-do',
        items: data,
    },
    [uuidv4()]: {
        title: 'In Progress',
        items: [],
    },
    [uuidv4()]: {
        title: 'Done',
        items: [],
    },
};
