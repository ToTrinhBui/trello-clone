const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users/login', (req, res) => {
    const { user } = req.body;
    const user_db = router.db.get('users').find({ user }).value();
    console.log('Received request:', req.body); // Log the request body
    if (user_db) {
        // Generate an access token
        const accessToken = crypto.randomBytes(64).toString('hex');

        // Update the user's access token in the database
        router.db
            .get('users')
            .find({ id: user_db.id })
            .assign({ accessToken })
            .write();

        res.status(200).json({ 'accessToken': accessToken, 'id': user_db.id });
    } else {
        res.status(401).json({ error: 'Invalid credentials', requestPayload: req.body });
    }
});

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
        res.status(200).json({ 'new column': column });
    } else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
});

server.put('/task/update', (req, res) => {
    const { board_id, task_id, status } = req.body;
    const board_db = router.db.get('boards').find(item => item.id === board_id).value();
    console.log('Received request:', req.body); // Log the request body

    if (board_db) {
        const task = board_db.tasks.find(item => item.id === task_id);
        if (task) {
            task.status = status;
            router.db.write();
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
        };
        tasks.push(task); // Add the task to the tasks array
        router.db.write(); // Persist the changes to the database
        res.status(200).json({ notice: 'Successfull add new task' });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials. Cant find board', requestPayload: req.body });
    }
})

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});
