const app = require("./app");
app.listen(process.env.PORT || 3000, () => {
  document.write("✔ - Backend Started!");
});
