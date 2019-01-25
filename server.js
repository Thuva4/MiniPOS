let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser");
let MongoStore = require("connect-mongo")(session);
let webpack  =  require("webpack");
let webpackDevMiddleware  = require("webpack-dev-middleware");

let config = require("./webpack.config");

const compiler = webpack(config);
let db = require("./models/db.js");


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

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
    store: new MongoStore({
        mongooseConnection: db
    })
}));


app.use(router);

app.listen("3001", function() {
});
