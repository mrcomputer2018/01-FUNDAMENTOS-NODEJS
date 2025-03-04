import { Readable } from 'stream';

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

fetch('http://localhost:3000', {
    method: 'POST',
    body: readableStream
}).then(response => response.text())
.then(data => console.log(data));

const readableStream = new MyReadable();