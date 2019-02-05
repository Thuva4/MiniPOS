let express = require("express");
let app = express();
const config = require("./config/index");
let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser");
let MongoStore = require("connect-mongo")(session);
// let webpack  =  require("webpack");
// let webpackDevMiddleware  = require("webpack-dev-middleware");
let cors = require("cors");
// let WebPackconfig = require("./webpack.config");
let helmet = require("helmet");
// const compiler = webpack(WebPackconfig);
let db = require("./models/db.js");


// app.use(webpackDevMiddleware(compiler, {
//     publicPath: WebPackconfig.output.publicPath
// }));

let router = require("./controllers");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded(
    {extended: true}
));

app.use(cookieParser());
app.use(session({
    secret: "qwertyuiop",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000,httpOnly: true},
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use(helmet());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(router);


app.listen(config.port, function() {
});

module.exports = app;