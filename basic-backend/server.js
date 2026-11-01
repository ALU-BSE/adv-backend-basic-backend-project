const http = require('http');
const routes = require('./routes/routes');

const server = http.createServer(routes);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});