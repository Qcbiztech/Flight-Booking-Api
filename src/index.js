require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const v1WebRouter = require("./v1/routes/webRoutes");
const adminRouter = require("./v1/routes/adminRoutes");
const jsonwebtoken = require("jsonwebtoken");
// *** ADD ***
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
app.use("/api/v1/auth", v1WebRouter);
app.use("/api/v1/admin", adminRouter);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  /// *** ADD ***
  V1SwaggerDocs(app, PORT);
});