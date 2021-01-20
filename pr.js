const path = require("path");
const a = require("express");
const b = a();
//const db = require("./util/database");
b.set("view engine", "ejs");
b.set("views", "views");
const c = require("./routes/home");
//const d = require("./routes/admin");
const bodyParser = require("body-parser");



//db.execute("SELECT * FROM products")
//.then((result) => {
//console.log(result);
//})
//.catch((err) => {
// console.log(err);
//});


b.use(bodyParser.urlencoded({ extended: false }));
b.use(bodyParser.json())
b.use(c);
//b.use(d);
b.use(a.static(path.join(__dirname, "public")));
b.use((req, res, next) => {
  res.status(404).send("<h1>PAGE NOT FOUND !!</H1>");
});
b.listen(3000);
