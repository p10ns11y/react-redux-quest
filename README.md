# apie

![Node](https://img.shields.io/node/v/apie.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/apie.svg?style=flat-square)](https://www.npmjs.com/package/apie)
[![Travis](https://img.shields.io/travis/p10ns11y/apie/master.svg?style=flat-square)](https://travis-ci.org/p10ns11y/apie)
[![David](https://img.shields.io/david/p10ns11y/apie.svg?style=flat-square)](https://david-dm.org/p10ns11y/apie)
[![Coverage Status](https://img.shields.io/coveralls/p10ns11y/apie.svg?style=flat-square)](https://coveralls.io/github/p10ns11y/apie)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

> API and generic utilities for react and redux eco-system

### Usage

```js
import apie from 'apie';

```

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add apie (--dev)

or npm

	npm install apie (--save-dev)


### configuration

You can pass in extra options as a configuration object (➕ required, ➖ optional, ✏️ default).

```js
import apie from 'apie';

```

➖ **property** ( type ) ` ✏️ default `
<br/> 📝 description
<br/> ❗️ warning
<br/> ℹ️ info
<br/> 💡 example

### methods

#### #name

```js
apie

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/p10ns11y/apie) example.

### Builds

If you don't use a package manager, you can [access `apie` via unpkg (CDN)](https://unpkg.com/apie/), download the source, or point your package manager to the url.

`apie` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `apie` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/apie/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/apie) on your page. The UMD builds make `apie` available as a `window.apie` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
