const def = [
  "00,15,30,45 * * * * *", // sec+cron_rule
  _=>{
    console.log('15sec triggered')
  },
  __filename.split("/")[__filename.split("/").length - 1] // filename
]

module.exports = def