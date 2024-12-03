// use will match all https method API calls
/*
app.use("/test", (req, res) => {
  res.send("Test Page");
});

app.use("/about", (req, res) => {
  res.send("About Page");
});

app.use("/", (req, res) => {
  res.send("Home Page");
});
*/

// get function only response to get call
// route -> /user?101&test
app.get(
  "/user/",
  (req, res, next) => {
    // console.log(req.query);
    try {
      throw new Error("err");
      console.log("Route 1");
    } catch (err) {
      console.log("Error occured");
      res.status(500).send("Error occured");
    }
    // res.send("Repsonse 1");
    next();
    // there should be only 1 response to send
  },
  // middlewares these are in middle of the routing
  (req, res, next) => {
    console.log("Route 2");
    // res.send("Response 1");
    next();
  },
  (req, res) => {
    console.log("Route 3");
    // this error is thrown to the function below to handle
    throw new Error("ok");
    res.send("Response 3");
  }
);

// // Dynamic Routing
// // route -> /user/101/bottle
// app.get("/item/:itemId/:itemName", (req, res) => {
//   console.log(req.params);
//   res.send("Works Fine");
// });

// this will handle the error that was send to it
app.use("/", (err, req, res, next) => {
  if (err) {
    console.log("error occured");
    res.status(500).send("Something unexpected occur");
  }
});

// app.post("/user", (req, res) => {
//   res.send("POST req");
// });

// app.delete("/user", (req, res) => {
//   res.send("DELETE req");
// });

// app.patch("/user", (req, res) => {
//   res.send("PATCH req");
// });

// OPTIONAL ROUTES
// 1. Description:- character before '?' is optional
// app.get("/ab?c", (req, res) => {
//   res.send("Works Fine");
// });
// 2. Description:- combined characters before '?' are optional
// app.get("/a(bc)?d", (req, res) => {
//   res.send("Works Fine");
// });
// 3. Description:- a character before '+' can be repeated
// app.get("/ab+c", (req, res) => {
//   res.send("Works Fine");
// });
// 4. Description:- combined characters before '+' can be repeated in sequence only
// app.get("/a(bc)+d", (req, res) => {
//   res.send("Works Fine");
// });
// 5. Description:- anything can be added in place of '*'
// app.get("/ab*c", (req, res) => {
//   res.send("Works Fine");
// });
