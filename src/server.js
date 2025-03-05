import http from 'node:http';

const users = []

const server = http.createServer( async(req, res) => {
    const { url, method } = req;

    const buffer = [];

    //carrega toda a minha stream dentro do array dee buffer
    for await (const chunk of req) {
        buffer.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffer).toString());
        console.log(body);
    } catch (error) {
        req.body = null;
    }

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