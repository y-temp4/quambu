const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  stats: { colors: true },
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(3333, 'localhost', (err, result) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3333/');
});
