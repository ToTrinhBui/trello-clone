const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const crypto = require('crypto');

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

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});
