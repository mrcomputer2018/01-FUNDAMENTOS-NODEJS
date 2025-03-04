// processss.stdin.pipe(process.stdout);


import { Readable, Writable, Transform } from 'node:stream';

// transform - transforma um dado em outro
// writable - escreve um dado
// readable - le um dado

/* const readableStream = new Readable({
  read(size) {
    this.push('I ');
    this.push('Love ');
    this.push('Node.js\n');
    this.push(null);
  }
}); */

// ler um arquivo do sistema / fazer um upload
class MyReadable extends Readable {
    index = 1

    _read() {
        setTimeout(() => {
            const i = this.index++;
        
            if (i > 100) {
                //nao eenvia mais dados de dentro da stream
                this.push(null);
            } else {
                const str = `${i.toString()}\n`;
                this.push(str);
            }

        }, 1000);
    }
}

class MyTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString()) * -1;
        callback(null, number.toString());
    }
}

class MultiplyStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        console.log(number * 10);
        callback();
    }
}

const readableStream = new MyReadable();
const myTransform = new MyTransform();
const multiplyStream = new MultiplyStream();
// escreve os dados enviadoos pela stream no terminal
// readableStream.pipe(process.stdout);
readableStream.pipe(myTransform).pipe(multiplyStream);
