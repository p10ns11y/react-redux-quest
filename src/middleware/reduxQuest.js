
import fetch from 'isomorphic-fetch';
import isPlainObject from 'lodash.isplainobject';
import { getTypes } from '../utils';
import { default as validate } from '../validation';

export const API = Symbol('@@API');

const isValidApiAction = action =>
    isPlainObject(action) && action.hasOwnProperty(API);

// const isPromise = p => p && typeof p.then === "function";

function extractIfErrorHasBody (response) {
  const error = new Error(response.statusText);
  error.response = response;

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') === -1) {
    return Promise.reject(error);
  }

  return response.json().then(json => {
    error.responseJSON = json;
    return Promise.reject(error);
  });
}

function processResponse (response) {
  return response.ok
       ? response.json().then(json => Promise.resolve(json))
       : extractIfErrorHasBody(response);
}

export function apiRequest (endpoint, options) {
  return fetch(endpoint, options).then(processResponse);
}

// Options and its default values yet to be decided.
// It will be decided based on usage and need arise
// Currently `urlPrefix or apiRoot` seems to be good
function createQuestMiddleware (options) {
  return function apiMiddleware (store) {
    return next => action => {
      if (!isValidApiAction(action)) {
        return next(action);
      }

      const settings = action[API];
      const { isValidApiSettings } = validate(settings);
      const types = getTypes(settings.types, settings.typePrefix);

      if (!isValidApiSettings) {
        return next(action);
      }

      const {
        url: endpoint,
        meta,
        // promise,
        ...init
      } = settings;

      const [requestType, successType, failureType] = types;

      const requestMeta = {
        ...meta,
        operation: init.method
      };

      const [requestAction, successAction, failureAction] = [
        () => ({ type: requestType, meta: requestMeta, isRequest: true }),

        payload => ({
          type: successType,
          meta: requestMeta,
          isRequest: false,
          payload
        }),

        payload => ({
          type: failureType,
          payload,
          meta: requestMeta,
          isRequest: false,
          error: true
        })
      ];

      next(requestAction());

        // Not yet decideded if it is good to let configure
        // This option enables user to use their choice of request library
        // With `promise` support
        /* if (isPromise(promise)) {
            promise.then(
                res => next(successAction(res)),
                err => next(failureAction(err))
            );
        } */

      fetch(endpoint, init)
        .then(processResponse)
        .then(
            response => next(successAction(response)),
            error => next(failureAction(error))
        );
    };
  };
}

const questMiddleware = createQuestMiddleware();
questMiddleware.withOptions = createQuestMiddleware;

export default questMiddleware;
