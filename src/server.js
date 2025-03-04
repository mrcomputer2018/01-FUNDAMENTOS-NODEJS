import http from 'node:http';

const users = []

const server = http.createServer((req, res) => {
    const { url, method } = req;

   
    if (url === '/users' && method === 'GET') {
      return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .end(JSON.stringify(users));
    }

    if (url === '/users' && method === 'POST') {
      users.push(
        { 
          id: 1, name: 'Lucas doe', email: 'lucas@lucass.com'
        }
      );

      return res.writeHead(201).end();
    }

    res.writeHead(404).end('Not Found');
    
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});