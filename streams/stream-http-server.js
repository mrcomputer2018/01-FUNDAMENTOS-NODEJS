import http from 'node:http';
import Stream, { Transform } from 'node:stream';
import { buffer } from 'node:stream/consumers';

class MyTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString()) * -1;
        callback(null, number.toString());
    }
}

// req - readable Stream
// res - writable Stream

const server = http.createServer( async(req, res) => {
        const buffer = [];

        //carrega toda a minha stream dentro do array dee buffer
        for await (const chunk of req) {
            buffer.push(chunk);
        }

        const fullStreamContent = Buffer.concat(buffer).toString();
        console.log(fullStreamContent);

        return res.end(fullStreamContent);

       // return req.pipe(new MyTransform()).pipe(res);
    }
);

server.listen(3000, () => {
    console.log('Server listening on port 3000');
})