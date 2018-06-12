import path from 'path';

import { IncomingWebhook } from '@slack/client'
import { readSync } from 'node-yaml'
const distanceFromHereToCallee = process.env.PWD

export function send(msg, yaml_path){
  const yaml = readSync(path.join(distanceFromHereToCallee, yaml_path))
  const url = process.env.SLACK_URL || yaml.slackUrl
  const opts = {
    username: yaml.username || 'crock bot',
    iconEmoji: yaml.iconEmoji || ':mantelpiece_clock:',
    channel: yaml.channel || 'random'
  }
  const webhook = new IncomingWebhook(url, opts);

  webhook.send(msg, function(err, header, statusCode, body) {
    if (err) {
      console.log('Error:', err)
    } else {
      console.log('Received', statusCode, 'from Slack')
    }
  })  
}

