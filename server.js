const app = require("./app");

app.listen(3000, function (err) {
  if (err) console.log(err);
  console.log(`listening to port 3000`);
});
