'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = send;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _client = require('@slack/client');

var _nodeYaml = require('node-yaml');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const distanceFromHereToCallee = process.env.PWD;

function send(msg, yaml_path) {
  const yaml = (0, _nodeYaml.readSync)(_path2.default.join(distanceFromHereToCallee, yaml_path));
  const url = process.env.SLACK_URL || yaml.slackUrl;
  const opts = {
    username: yaml.username || 'crock bot',
    iconEmoji: yaml.iconEmoji || ':mantelpiece_clock:',
    channel: yaml.channel || 'random'
  };
  const webhook = new _client.IncomingWebhook(url, opts);

  webhook.send(msg, function (err, header, statusCode, body) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Received', statusCode, 'from Slack');
    }
  });
}