# Basic Node.js Backend (Vanilla HTTP) – Guided Activity

## Objective

Learn how to create a simple Node.js server that can handle requests and send responses.  
Focus on:

- Server creation
- Request–response cycle
- Basic routing
- Code organization using folders

---

## Duration

~35–40 minutes

---

## Requirements

- Node.js installed
- Code editor (VS Code recommended)
- Terminal

---

# Step 0: Activity Introduction

### Instructor Notes

- **Backend** = server-side logic.
- Node.js allows JavaScript to run outside the browser.
- Students will create a simple server that responds to browser requests.

---

# Step 1: Create a Project Folder

```bash
mkdir basic-backend
cd basic-backend

Create a file called server.js:

```bash
touch server.js

#3 Explain this as the entry point of the backend application.

Step 2: Create a Simple HTTP Server

Add the following code inside server.js:

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!');
  } else if (req.url === '/about') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('This is the about page.');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
Teaching Notes

http.createServer() → Creates a server

req → Contains information about the client request

res → Used to send a response back to the client

res.writeHead() → Sets status code and response headers

res.end() → Ends the response and sends it

Step 3: Run the Server
node server.js

Open your browser and test:

http://localhost:3000 → Hello, World!

http://localhost:3000/about → This is the about page

Any other route → Page not found

Instructor Tip

Emphasize the request-response cycle:

Browser → Server → Response → Browser

Step 4: Add a Simple JSON Response

Add a new route inside server.js:

else if (req.url === '/data') {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ name: 'Alice', age: 21 }));
}

Visit:

http://localhost:3000/data

You should see JSON output.

Teaching Point

Servers can send structured data (JSON) to clients.

Step 5: Optional Folder Organization

Even small apps benefit from organization.

Create this structure:

basic-backend/
├─ server.js
├─ routes/
├─ controllers/
└─ data/

Explain that separating responsibilities makes the app easier to maintain as it grows.

Step 5b: Refactoring server.js into Directories
Objective

Learn how to split backend code into multiple files and folders while keeping the server functional.

Step 1: Create Project Folders

Inside basic-backend:

mkdir routes controllers data
Explanation

routes/ → Define URL endpoints

controllers/ → Handle logic for each route

data/ → Store static data or JSON files

Step 2: Move Route Logic to Controllers

Inside controllers/, create:

touch homeController.js aboutController.js dataController.js
homeController.js
const homeController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
};

module.exports = homeController;
aboutController.js
const aboutController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('This is the about page.');
};

module.exports = aboutController;
dataController.js
const dataController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ name: 'Alice', age: 21 }));
};

module.exports = dataController;
Step 3: Create Routes File

Inside routes/, create routes.js:

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const dataController = require('../controllers/dataController');

const routes = (req, res) => {
  if (req.url === '/') homeController(req, res);
  else if (req.url === '/about') aboutController(req, res);
  else if (req.url === '/data') dataController(req, res);
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
};

module.exports = routes;
Step 4: Update server.js

Replace its contents with:

const http = require('http');
const routes = require('./routes/routes');

const server = http.createServer(routes);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
Explanation

server.js now only creates the server and starts listening.

All route mapping is inside routes/.

Controllers handle individual endpoint logic.

Code is now cleaner and more scalable.

Step 5: Test Your Refactored Server

Run:

node server.js

Test in browser:

/ → Hello, World!

/about → This is the about page

/data → JSON response

Wrap-Up Discussion

Ask students:

What is the difference between / and /about?

How does the server know which response to send?

Why do we use status codes like 200 and 404?

Why is this new folder structure better?

Optional Challenge

Add a /greet?name=YourName route.

Parse req.url and respond with:

Hello, YourName!
Final Outcome

Students now:

Have a working vanilla Node.js server

Understand request–response flow

Understand routing

Understand status codes

Understand basic backend folder organization

Are ready to move to Express.js
