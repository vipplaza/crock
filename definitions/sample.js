module.exports = {
  filename: __filename.split("/").pop(),
  description: "This text will be reflected to /documentation",
  expr: "0 0 0 * * *", // Everyday 0:00'00
  task: async function () {
  },
}