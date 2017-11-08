# crock
High time-resolution cron with Web application framework flavor

## How to use
- `npm i --save crock`
- Write `./definitions/foo.js` with `cron rule` and a `function`
- Just `$(npm bin)/crock`, process will be observed by supervisor(nodemon)
- You can integrate slack. Config is `crock.yaml`
- `DSL` is on `/definitions/sample.js`, check it out

## How it works
- Cron rule is based on [node-schedule](https://github.com/node-schedule/node-schedule) (sec + cron_rule)
- You can write all tasks on `*/definitions/*` folder, and `*/definitions/*` folder will be auto-loaded
- `$(npm bin)/crock` command runs scheduler daemon

## future work
- job stats