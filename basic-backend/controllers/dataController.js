const dataController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ name: 'Alice', age: 21 }));
};

module.exports = dataController;