export async function json(req, res, next) {
    const buffer = [];

    //carrega toda a minha stream dentro do array dee buffer
    for await (const chunk of req) {
        buffer.push(chunk);
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffer).toString());
    } catch (error) {
        req.body = null;
    }

    // devolvendo os dados em json
    res.setHeader('Content-Type', 'application/json');
    next();
}