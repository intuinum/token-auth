require('./utils/init.util')();
const server = require('http').createServer(require('./server'));
const logger = require('./utils/logger.util');
const { PORT } = require('./utils/config.util');

server.listen(PORT, () => {
    logger.info(`running on http://localhost:${PORT}`);
});