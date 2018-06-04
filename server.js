const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const queryString = require("query-string");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const config = require("./webpack.config.dev");

const app = express();


const isDev = process.env.NODE_ENV !== "production";
let port;
let host;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("superSecret", "dcard");
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan("dev")); 
app.use(cookieParser()); 

// -------------------  Mode Selection  -------------------------//
if (isDev) {
	host = "127.0.0.1";
	port = 3005;
} else {
	host = "127.0.0.1";
	port = 80;
}

// -------------------  DEV vs RELEASE  -------------------------//

if (isDev) {
	const compiler = webpack(config);
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: "src",
		stats: "errors-only",
	});
	app.use(express.static("public"));
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get("*", (req, res) => {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "build/index.html")));
		res.end();
	});
} else {
	app.use(express.static("public"));
	app.use(express.static(`${__dirname}/app/dist`));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "app/dist/index.html"));
	});
}
// -------------------  Error Handler -------------------------//
app.use((req, res) => {
	res.status(404);
	res.render("404.ejs", { title: "404: File Not Found" });
});
app.use((error, req, res) => {
	res.status(400);
	res.render("500.ejs", { title: "500: Internal Server Error", error });
});
// -------------------  Server  -------------------------//

app.listen(port, host, (err) => {
	if (err) {
		throw err;
	}
	console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});