require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes');

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
// app.use("/uploads/images", express.static("uploads"));
app.use("/", [
  authRoutes,
  productRoutes,
  cartRoutes
]);


//Swagger Config
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      version: "1.0.0",
      title: "GemStone API",
      description: "API's from GemStone",
      contact: {
        name: "Madan Lal",
      },
      server: ["http://localhost:4000"],
    },
  },
  // ['.routes/*.js']
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Listen to port: Default is 4000
const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("listening to port ", port);
});

module.exports = app;