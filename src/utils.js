import invariant from 'invariant';

export const getTypes = (types = null, typePrefix = '') => {
  invariant(
    types || typePrefix,
    `Please specify array of 3 action descriptors 'types'
         for request, success and failure in the same order

         Or specify 'typePrefix' to create them`
  );

  const isValidTypes =
    types &&
    Array.isArray(types) &&
    types.length === 3 &&
    types.every(type => typeof type === 'string' || typeof type === 'symbol');

  const isValidTypePrefix = typePrefix && typeof typePrefix === 'string';

  invariant(
    isValidTypes || isValidTypePrefix,
    `Check yor have array of '3' action descriptors specified in 'types'
         and all of them either string or symbol type

         Or you specified 'typePrefix' of 'string' type
        `
  );

  if (isValidTypes) {
    return types;
  } else if (isValidTypePrefix) {
    return [
      `${typePrefix}_REQUEST`,
      `${typePrefix}_SUCCESS`,
      `${typePrefix}_FAIL`
    ];
  }

  return null;
};

export const createRegExReducer = initialState => caseHandlers => {
  return function reducer (state = initialState, action) {
    const partialCaseTypes = Object.keys(caseHandlers);

    const relativCaseType = partialCaseTypes.find(caseType =>
      action.type.includes(caseType)
    );

    return (
      (relativCaseType && caseHandlers[relativCaseType](state, action)) || state
    );
  };
};
