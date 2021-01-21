module.exports = {
  // Function for getting numbers from query variables
  getNumbersFromQuery: (req) => {
    const params = new URLSearchParams(req.query);
    const obj = {};
    // iterate over all keys
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = parseInt(params.getAll(key));
      } else {
        obj[key] = parseInt(params.get(key));
      }
    }
    return Object.values(obj);
  },

  //Add numbers, action, result to local cache
  addCacheData: (numbers, action, result, cacheData) => {
    newResult = {
      num1: numbers[0],
      num2: numbers[1],
      action: action,
      result: result,
    };
    cacheData.data.push(newResult);
    return newResult;
  },

  //Check if result of calculate action is exists in local cache
  isCacheDataExists: (numbers, action, cacheData) => {
    const findCacheIndex = cacheData.data.findIndex(
      (o) =>
        o.action === action && o.num1 === numbers[0] && o.num2 === numbers[1]
    );
    if (findCacheIndex != null) {
      const result = cacheData.data[findCacheIndex];
      return result;
    } else {
      return false;
    }
  },
};
