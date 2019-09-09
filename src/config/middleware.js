const path = require('path');
const isDev = think.env === 'dev';

module.exports = [{
  handle: 'meta',
  options: {
    logRequest: isDev,
    sendResponseTime: isDev
  }
},
{
  handle: think.gray
},
{
  handle: 'resource',
  //  enable: isDev,
  options: {
    root: path.join(think.ROOT_PATH, 'www'),
    publicPath: /^\/(static|favicon\.ico|index\.html)/
  }
},
{
  handle: 'trace',
  enable: !think.isCli,
  options: {
    debug: isDev
  }
},
{
  handle: 'payload',
  options: {
    keepExtensions: true,
    limit: '5mb'
  }
},
{
  handle: 'router',
  options: {}
},
'logic',
'controller'
];
