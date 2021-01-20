
const a = require("express");
const { render } = require("ejs");
const Content = require("../modals/extraction");
const router = a.Router();
const p ="pk_test_51HzlEUFiZvaN3JvtbOGjEZxEPWgn1mn2tht8IBmoP8nX48IaK6HcwT8n1mqHnKG7i4UoKAev8IjLX3g884meEuvF00yC1WGqmr"
const s="sk_test_51HzlEUFiZvaN3JvtrxPcPBbxefgVQB6pkWMyCfksdvgJ9vAkR4eIbP7Rfny0or7WVTcGa2GweWmwbZ2UIZOEubqk0058mQKJEn"
let z=0;

const stripe=require("stripe")(s)
router.get("/", (req, res, next) => {
   res.render("index");
  
});
router.get("/donate", (req, res, next) => {
  res.render("donate");
 
});


router.post("/donate", (req, res, next) => {
  const amount = req.body.pay;
  const emaill = req.body.title;
  console.log(amount);
  console.log(emaill);

  z=amount*100

  res.redirect("/final");

  
});

router.get("/final", (req, res, next) => {
  res.render("final",{
    key:p,
    am :z
  });
});
 
router.post("/payment", (req, res, next) => {
  stripe.customers.create({ 
    email: req.body.stripeEmail, 
    source: req.body.stripeToken, 
    name: 'Amar', 
    address: { 
        line1: 'TC 9/4 Old MES colony', 
        postal_code: '110092', 
        city: 'New Delhi', 
        state: 'Delhi', 
        country: 'India', 
    } 
}) 
.then((customer) => { 

    return stripe.charges.create({ 
        amount: z,    // Charing Rs 25 
        description: 'TASK', 
        currency: 'INR', 
        customer: customer.id 
    }); 
}) 
.then((charge) => { 
    res.send("Success") // If no error occurs 
}) 
.catch((err) => { 
    res.send(err)    // If some error occurs 
}); 

  
});


//welcome = req.body.welcome;
// about = req.body.about;
// blog = req.body.blog;
//res.render("index", {
// w: welcome,
// a: about,
// b: blog,
//  });
//});



// router.get("/about", (req, res, next) => {
//   // res.send("<h1>amar</h1>");
//   res.render("about");
// });

// router.post("/search", (req, res, next) => {
//   const a = req.body.search;
//   //  console.log(a);
//   Product.fetchAll().then(([rows]) => {
//     res.render("search", {
//       b: rows,
//       blog: a,
//     });
//   });
// });
// router.get("/blog", (req, res, next) => {
//   // res.send("<h1>amar</h1>");
//   Product.fetchAll().then(([rows]) => {
//     res.render("blog", {
//       prods: rows,
//     });
//     console.log(rows);
//   });
// });
// router.get("/contact", (req, res, next) => {
//   // res.send("<h1>amar</h1>");
//   res.render("contact");
// });
module.exports = router;
