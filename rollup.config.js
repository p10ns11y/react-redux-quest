import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import { pascalCase } from 'change-case';

const packageName = `react-redux-quest`;

const plugins = [
  babel({
    exclude: '**/node_modules/**'
  }),
  nodeResolve({
    module: true,
    jsnext: true
  }),
  commonjs({
    include: `node_modules/**`
  }),
  bundleSize()
];

const isProd = process.env.NODE_ENV === `production`;
if (isProd) plugins.push(uglify());

export default {
  entry: `src/index.js`,
  plugins,
  dest: `dist/${packageName}${isProd ? `.min` : ``}.js`,
  moduleName: pascalCase(packageName),
  format: `umd`
};
