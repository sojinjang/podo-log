import path from "path";

module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /.css?$/,
        exclude: [],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
