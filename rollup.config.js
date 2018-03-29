import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
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
  json(),
  nodeResolve({
    module: true,
    jsnext: true
  }),
  commonjs({
    include: `node_modules/**`
  }),
  bundleSize()
];

const external = ['react'];
const globals = {
  react: 'React'
};

const isProd = process.env.NODE_ENV === `production`;
if (isProd) {
  plugins.push(uglify({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      warnings: false
    }
  }));
}

export default {
  entry: `src/index.js`,
  external: external,
  globals: globals,
  plugins,
  dest: `dist/${packageName}${isProd ? `.min` : ``}.js`,
  moduleName: pascalCase(packageName),
  format: `umd`
};
