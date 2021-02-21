
// const meaning that after storing the value you cant change the value//
const express = require('express');


const PORT = process.env.PORT || 8000;
// port specifically what we need// 

const dbJson = require('./db/db.json')

// using express//
const app = express();

//uses  public file for  CSS loading//
app.use(express.static(__dirname + '/public'));
app.use(express.static('./'));
// using express.js//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//asks the Routes.js files to communicate how to generate api routes and html files//
require("./apiRoutes")(app);
require("./htmlRoutes")(app);


// asks the server to start listening //
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
// prinitng code//