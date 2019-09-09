const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const eureka = require('@zzg/think-eureka');
const websocket = require('think-websocket');

module.exports = [
  view, // make application support view
  model(think.app),
  cache,
  session,
  eureka,
  websocket(think.app)
];
