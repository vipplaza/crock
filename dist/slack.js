'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = send;

var _client = require('@slack/client');

var _nodeYaml = require('node-yaml');

const distanceFromHereToCallee = '../../../';

function send(msg, yaml_path) {
  const yaml = (0, _nodeYaml.readSync)(`${distanceFromHereToCallee}${yaml_path}`);
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