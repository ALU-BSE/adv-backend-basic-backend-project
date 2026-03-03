# Lab: Building a Vanilla Node.js Backend

Welcome to your first backend development activity. In this lab, you will build a functional web server from scratch using Node.js—without external frameworks like Express.

## Learning Objectives
By the end of this activity, you will be able to:
- Initialize a Node.js project.
- Create an HTTP server and manage the request-response cycle.
- Implement routing for different URLs.
- Serve both plain text and JSON data.
- Refactor code into a modular folder structure.

---

## Prerequisites
- Node.js installed on your machine.
- A terminal (VS Code Terminal, Bash, or Zsh).
- Basic understanding of JavaScript functions and objects.

---

## Phase 1: The Monolith Server
**Goal:** Get a single file running that responds to browser requests.

### Step 0: Activity Introduction
- **Backend** means server-side logic.
- Node.js allows JavaScript to run outside the browser.
- You will create a simple server that responds to browser requests.

### Step 1: Project Setup
Open your terminal and run:

```bash
mkdir basic-backend
cd basic-backend
touch server.js
```

Note that `server.js` is the entry point of the backend application.

### Step 2: Create a Simple HTTP Server
Add the following code inside `server.js`:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the about page.');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

#### Teaching Notes
- `http.createServer()` creates a server.
- `req` contains information about the client request.
- `res` is used to send a response back to the client.
- `res.writeHead()` sets status code and response headers.
- `res.end()` ends the response and sends it.

### Step 3: Run the Server
Run:

```bash
node server.js
```

Open your browser and test:
- `http://localhost:3000` → `Hello, World!`
- `http://localhost:3000/about` → `This is the about page.`
- Any other route → `Page not found`

### Step 4: Add a Simple JSON Response
Add this route inside `server.js`:

```js
else if (req.url === '/data') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ name: 'Alice', age: 21 }));
}
```

Visit:
- `http://localhost:3000/data`

You should see JSON output.

#### Teaching Point
Servers can send structured data (JSON) to clients.

### Step 5: Folder Organization
Even small apps benefit from organization.

Create this structure:

```text
basic-backend/
├─ server.js
├─ routes/
├─ controllers/
└─ data/
```

Separating responsibilities makes the app easier to maintain as it grows.

---

## Phase 2: Refactor into Directories
**Objective:** Split backend code into multiple files and folders while keeping the server functional.

### Step 1: Create Project Folders
Inside `basic-backend`, run:

```bash
mkdir routes controllers data
```

- `routes/` defines URL endpoints.
- `controllers/` handles logic for each route.
- `data/` stores static data or JSON files.

### Step 2: Move Route Logic to Controllers
Inside `controllers/`, create files:

```bash
touch homeController.js aboutController.js dataController.js
```

`homeController.js`:

```js
const homeController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
};

module.exports = homeController;
```

`aboutController.js`:

```js
const aboutController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('This is the about page.');
};

module.exports = aboutController;
```

`dataController.js`:

```js
const dataController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ name: 'Alice', age: 21 }));
};

module.exports = dataController;
```

### Step 3: Create Routes File
Inside `routes/`, create `routes.js`:

```js
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
```

### Step 4: Update `server.js`
Replace its contents with:

```js
const http = require('http');
const routes = require('./routes/routes');

const server = http.createServer(routes);

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

#### Explanation
- `server.js` now only creates the server and starts listening.
- Route mapping is inside `routes/`.
- Controllers handle individual endpoint logic.
- The code is cleaner and more scalable.

### Step 5: Test Your Refactored Server
Run:

```bash
node server.js
```

Test in browser:
- `/` → `Hello, World!`
- `/about` → `This is the about page.`
- `/data` → JSON response

---

## Optional Challenge
Add a `/greet?name=YourName` route.

Parse `req.url` and respond with:

```text
Hello, YourName!
```

## Final Outcome
Students now:
- Have a working vanilla Node.js server.
- Understand request-response flow.
- Understand routing.
- Understand status codes.
- Understand basic backend folder organization.
- Are ready to move to Express.js.
