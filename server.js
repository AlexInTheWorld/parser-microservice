// init project
var express = require('express');
var app = express();
var getdata = require("./getinfo.js").getusersysinfo;
var ip, sys, lang;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
/* var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204 */
//I modified the app afterwards, and therefore did not the testing utility anymore.

// http://expressjs.com/en/starter/static-files.html
app.use("/public", express.static(process.cwd() + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});


// Create a middle route to provide a tailored response to the user 
app.get("/api/whoami", function (req, res) {
  var ipaddress = req.headers['x-forwarded-for'].split(',')[0];
  var sysinfo = req.headers['user-agent'];
  var lang = req.headers['accept-language'];
  res.sendFile(__dirname + '/views/whoami.html');
});

app.get("/api/whoami/table", function(req, res) {
  [ip, sys, lang] = getdata(req);
  res.render("table.ejs", {ip: ip, sys: sys, lang: lang})
})

app.get("/api/whoami/json", function(req, res) {
  [ip, sys, lang] = getdata(req);
  res.json({ipaddress: ip, software: sys, language: lang})
})

app.get("/*", function(req, res) {
  res.send("NOT FOUND");
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
