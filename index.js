const {PORT} = require('./utils/config');
const server = require('http').createServer(require('./src/app'));

server.listen(PORT, () => {
    console.log(`on port ${PORT}`);
})