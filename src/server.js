import http from 'node:http';
import json from './middlewares/json.js';

const users = []

const server = http.createServer( async(req, res) => {
    const { url, method } = req;

    // executando o middleware json
    await json(req, res);

    if (url === '/users' && method === 'GET') {
    return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .end(JSON.stringify(users));
    }

    if (url === '/users' && method === 'POST') {
        const { name, email } = req.body

        let id = 1;

        if(users.length > 0) {
            id = users[users.length - 1].id + 1;
        }

        users.push(
            { 
                id, name, email
            }
        );

        return res.writeHead(201).end();
    }

    res.writeHead(404).end('Not Found');
    
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});