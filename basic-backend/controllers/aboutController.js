const aboutController = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('This is the about page.');
};

module.exports = aboutController;