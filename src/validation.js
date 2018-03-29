import invariant from "invariant";
import warning from "warning";

const SUPPORTED_HTTP_METHODS = [
  // safe => idempotent methods
  "GET",
  "HEAD",
  "OPTIONS",
  // Not safe but idempotent methods
  "PUT",
  "DELETE",
  // Not safe and not idempotent methods
  "POST",
  "PATCH"
];

const FORBIDDEN_HTTP_METHODS = ["CONNECT", "TRACE", "TRACK"];

export default function validate(settings) {
  const { url, method, meta } = settings;

  invariant(url, 'Must specify "url"');

  const isValidHttpMethod = SUPPORTED_HTTP_METHODS.includes(
    method.toUpperCase()
  );

  invariant(
    isValidHttpMethod,
    `[MOST LIKELY ITS TYPO]: "method" must be valid http methods.
     Refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods`
  );

  const isForbiddenMethods = FORBIDDEN_HTTP_METHODS.includes(method);

  warning(
    !isForbiddenMethods,
    `"method" must be one of the fetch supported http methods.
     Refer: https://fetch.spec.whatwg.org/#concept-method-normalize`
  );

  !meta &&
    console.info(
      `You might want to specify "meta" object to use "questReducer"
       that updates "isFetching" stateSlice.`
    );

  return {
    isValidApiSettings: url && isValidHttpMethod
  };
}
