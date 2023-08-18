// const jsonServer = require('json-server');
// const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid');
// const { wss, handleDataUpdate } = require('./websocket'); // Adjust the path as needed
import jsonServer from 'json-server';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { wss, handleDataUpdate } from './websocket.js';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Helper function to find a user by email
const findUser = (user) => {
    return router.db.get('users').find({ user }).value();
}

// Update user's access token
const updateUserAccessToken = (userId, accessToken) => {
    router.db.get('users')
        .find({ id: userId })
        .assign({ accessToken })
        .write();
};

// Generate random access token
const generateAccessToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

server.post('/users/login', (req, res) => {
    const { user } = req.body;
    const user_db = findUser(user);
    console.log('Received request:', req.body); // Log the request body
    if (user_db) {
        const accessToken = generateAccessToken();

        updateUserAccessToken(user.id, accessToken);

        res.status(200).json({ 'accessToken': accessToken, 'id': user_db.id, 'email': user_db.user.email });
    } else {
        res.status(401).json({ error: 'Invalid credentials', requestPayload: req.body });
    }
});

server.post('/users/login-via', (req, res) => {
    const { user } = req.body;
    console.log('Received request:', req.body);

    const user_db = findUser(user);

    if (user_db) {
        updateUserAccessToken(user_db.id, generateAccessToken());
    } else {
        const newUser = {
            user,
            accessToken: generateAccessToken(),
            id: uuidv4(),
        };
        router.db.get('users').push(newUser).write();
    }

    const updatedUser = findUser(user);
    res.status(200).json({ 'accessToken': updatedUser.accessToken, 'id': updatedUser.id, 'email': updatedUser.user.email });
});

server.put('/board/member/update', (req, res) => {
    const { board_id, members } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body
    if (board_db) {
        board_db.members = members;
        router.db.write(); // Persist the changes to the database
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull add new member in board', 'members': board_db.members });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

server.put('/board/rename', (req, res) => {
    const { board_id, name } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body
    if (board_db) {
        board_db.name = name;
        router.db.write(); // Persist the changes to the database
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull rename board', 'members': board_db.name });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

server.post('/status/add', (req, res) => {
    const { board_id } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body
    if (board_db) {
        const columns = board_db.columns;
        const column = {
            [uuidv4()]: {
                title: 'New column'
            }
        };
        Object.assign(columns, column);
        router.db.write();
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ 'new column': column });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.put('/status/rename', (req, res) => {
    const { board_id, columnId, name } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body
    if (board_db) {
        const columns = board_db.columns;
        columns[columnId].title = name;
        router.db.write();
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ 'rename column': columns[columnId] });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.delete('/status/delete', (req, res) => {
    const { board_id, columnId } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body
    if (board_db) {
        const columns = board_db.columns;
        delete columns[columnId];
        router.db.write();
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ 'new list columns': columns });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.put('/task/update', (req, res) => {
    // update status
    const { board_id, task_id, status } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body

    if (board_db) {
        const task = board_db.tasks.find(item => item.id === task_id);
        if (task) {
            task.status = status;
            router.db.write();
            (async () => {
                await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
            })();
            res.status(200).json({ 'task': task });
        } else {
            res.status(401).json({ error: 'Invalid credentials. Cant find task', requestPayload: req.body });
        }
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.post('/task/add', (req, res) => {
    const { board_id, Task, Due_Date, status } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body);
    if (board_db) {
        const tasks = board_db.tasks;
        const task = {
            id: uuidv4(),
            Task: Task,
            Due_Date: Due_Date,
            status: status,
            members_task: [],
            jobs: {},
            description: "",
            labels: {
                "1": {
                    "color": "#4bce97",
                    "title": "",
                    "check": 0
                },
                "2": {
                    "color": "#e2b203",
                    "title": "",
                    "check": 0
                },
                "3": {
                    "color": "#FAA53D",
                    "title": "",
                    "check": 0
                },
                "4": {
                    "color": "#f87462",
                    "title": "",
                    "check": 0
                },
                "5": {
                    "color": "#9F8FEF",
                    "title": "",
                    "check": 0
                },
                "6": {
                    "color": "#579dff",
                    "title": "",
                    "check": 0
                }
            }
        };
        tasks.push(task); // Add the task to the tasks array
        router.db.write(); // Persist the changes to the database
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json({ notice: 'Successfull add new task' });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

server.put('/task/edit', (req, res) => {
    const { board_id, task } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body

    if (board_db) {
        const task_db = board_db.tasks.find(item => item.id === task.id);
        if (task_db) {
            task_db.Task = task.Task;
            task_db.Due_Date = task.Due_Date;
            task_db.status = task.status;
            task_db.members_task = task.members_task;
            task_db.jobs = task.jobs;
            task_db.description = task.description;
            task_db.labels = task.labels;

            router.db.write();
            (async () => {
                await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
            })();
            res.status(200).json({ 'new task': task_db });
        } else {
            res.status(401).json({ error: 'Invalid credentials. Cant find task', requestPayload: req.body });
        }
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.delete('/task/delete', (req, res) => {
    const { board_id, taskId } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body

    if (board_db) {
        const newListTasks = board_db.tasks.filter(item => item.id !== taskId);
        board_db.tasks = newListTasks;
        (async () => {
            await handleDataUpdate(wss, board_id); // Pass 'wss' and the updated data here
        })();
        res.status(200).json('Successfully deleted');
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});
