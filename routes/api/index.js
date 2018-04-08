var path = require('path')
exports.article = require(path.join(__dirname, 'article'));
// exports.uploadjs = require(path.join(__dirname, 'upload'));

// GET home page.
exports.index = (req, res, next) => {
      res.send('<h1>This is Homepage</h1>');
}