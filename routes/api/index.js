var path = require('path')
exports.article = require(path.join(__dirname, 'article'));
// exports.front = require(path.join(__dirname, 'front'));

// GET home page.
exports.index = (req, res, next) => {
      res.send('<h1>This is Homepage</h1>');
}