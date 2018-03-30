# react-redux-quest

![Node](https://img.shields.io/node/v/react-redux-quest.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/react-redux-quest.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-quest)
[![Travis](https://img.shields.io/travis/p10ns11y/react-redux-quest/master.svg?style=flat-square)](https://travis-ci.org/p10ns11y/react-redux-quest)
[![David](https://img.shields.io/david/p10ns11y/react-redux-quest.svg?style=flat-square)](https://david-dm.org/p10ns11y/react-redux-quest)
[![Coverage Status](https://img.shields.io/coveralls/p10ns11y/react-redux-quest.svg?style=flat-square)](https://coveralls.io/github/p10ns11y/react-redux-quest)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

> API and generic utilities for react and redux eco-system

### Demo

Open in [Codesandbox](https://codesandbox.io/s/1qqo3kn99l)

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add react-redux-quest

or npm

	npm install react-redux-quest



### methods

#### Components

```js
import { Read } from 'react-redux-quest'
...
<Read
  url="https://api.github.com/search/users?q=p10ns11y"
  render={(response, error) => <div>{response}</div>}
/>

```

TODOs:
- [ ] Create
- [x] Read
- [ ] Update
- [ ] Delete

#### Middleware

Just add to your middleware list

```js
import { createStore, applyMiddleware } from "redux";

import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import { questMiddleware } from "react-redux-quest";

import rootReducer from "./rootReducer";

const middlewares = [
  thunkMiddleware,
  questMiddleware,
  loggerMiddleware
];

export default preloadedState =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

```

The **action descriptor** as dispatchable action. Internally it will be transferred as `fetch` call and the actions specified in `types` or in `typePrefix` are
dispatched.

```js
import { API } from 'react-redux-quest'
...
const request = username => ({
  [API]: {
    url: `https://api.github.com/search/users?q=${username}`,
    method: "GET",
    meta: { slicedStateKey: "greet" },
    types: ["GREET_REQUEST", "GREET_SUCCESS", "GREET_FAIL"]
  }
});
```
or

```js
const request2 = username => ({
  [API]: {
    url: `https://api.github.com/search/users?q=${username}`,
    method: "GET",
    meta: { slicedStateKey: "greet2" },
    typePrefix: "GREET" // => 'GREET_REQUEST', 'GREET_SUCCESS', 'GREET_FAIL'
  }
});
```

Then calls like this
`this.props.dispatch(request(this.state.username))`
Will taken care by the middleware.

#### Reducers
**questReducer**

The reducer suitable for network status (`isFetching`)

```js
import { combineReducers } from "redux";
import { questReducer } from "react-redux-quest";

export default combineReducers({
  ...otherReducers,
  // {http-verb.slicedStateKey: true|false}
  // eg., {get.greet: true } => API request is fired (GREET_REQUEST)🔥
  // via middleware and and the response is targeted to the stateSlice `greet`
  isFetching: questReducer
});

```

**createRegExReducer**

```js
import { createRegExReducer } from "react-redux-quest";
...
const initialState = {}
function handlerFn() {...}
// Any action that ends with REQUEST/SUCCESS/FAIL go throw `handlerFn` reducer. You can also have different
// handlerFns
const regexReducer = createRegExReducer(initialState)({
    REQUEST: (state, action) => handlerFn(state, action),
    SUCCESS: (state, action) => handlerFn(state, action),
    FAIL: (state, action) => handlerFn(state, action)
  });
```

#### Other utilities

**apiRequest** is optimized `fetch` where `error` has `responseJSON` which is sent via body

```js
import { apiRequest } from "react-redux-quest";
...
apiRequest(url, { method: 'GET'})
  .then(
      response => this.updateSuccess(response),
      error => this.updateError(error.responseJSON)
  );
```
### Builds

If you don't use a package manager, you can [access `react-redux-quest` via unpkg (CDN)](https://unpkg.com/react-redux-quest/), download the source, or point your package manager to the url.

`react-redux-quest` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 4)

The `react-redux-quest` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/react-redux-quest/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/react-redux-quest) on your page. The UMD builds make `react-redux-quest` available as a `window.ReactReduxQuest` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.
