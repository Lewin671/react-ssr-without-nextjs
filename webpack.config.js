import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sharedConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const serverConfig = {
  ...sharedConfig,
  target: 'node',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.cjs', // Use .cjs for Node compatibility with ES modules
    libraryTarget: 'commonjs2', // Ensure compatibility with Node's module system
  },
  externals: [nodeExternals()], // Don't bundle node_modules for the server
  externalsPresets: { node: true }, // Necessary for nodeExternals
};

const clientConfig = {
  ...sharedConfig,
  target: 'web',
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'bundle.js',
  },
};

export default [serverConfig, clientConfig];