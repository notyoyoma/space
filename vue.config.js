const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");

const isDevEnv = process.env.NODE_ENV === "development";

module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/prepend.scss";`,
      },
    },
  },
  configureWebpack: (config) => {
    const terserOptions =
      config.optimization.minimizer[0].options.terserOptions;
    terserOptions.mangle.keep_classnames = true;
    terserOptions.mangle.keep_fnames = true;
    return {
      entry: "./src/main.js",
      devServer: {
        port: 8000,
        before: (app) => {
          app.use(bodyParser.json());

          // handle read from assets
          app.use("/assets", express.static(path.join(__dirname, "assets")));

          // handle READ from data
          app.use("/data", express.static(path.join(__dirname, "data")));

          // handle WRITE to data
          app.post("/data/*", (req, res, next) => {
            const filename = path.basename(req.url);
            fs.writeFile(
              `./data/${filename}`,
              JSON.stringify(req.body, null, 2),
              "utf8",
              (err) => {
                if (err) throw err;
                console.log(`${filename} has been saved!`);
                res.json({ success: true });
                next();
              }
            );
          });
        },
      },
    };
  },
};
