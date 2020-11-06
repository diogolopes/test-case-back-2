// GET home page.
const indexRouter = require('./catalog');

indexRouter.get('/', function(req, res) {
    res.redirect('/catalog');
  });
module.exports = indexRouter;