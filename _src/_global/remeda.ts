import * as r from 'remeda'

export const R = {
  addProp: r.addProp,
  allPass: r.allPass,
  anyPass: r.anyPass,
  chunk: r.chunk,
  clamp: r.clamp,
  clone: r.clone,
  compact: r.compact,
  concat: r.concat,
  countBy: r.countBy,
  createPipe: r.createPipe,
  difference: r.difference,
  differenceWith: r.differenceWith,
  drop: r.drop,
  dropLast: r.dropLast,
  equals: r.equals,
  filter: r.filter,
  find: r.find,
  findIndex: r.findIndex,
  findLast: r.findLast,
  findLastIndex: r.findLastIndex,
  first: r.first,
  flatMap: r.flatMap,
  flatMapToObj: r.flatMapToObj,
  flatten: r.flatten,
  flattenDeep: r.flattenDeep,
  forEach: r.forEach,
  forEachObj: r.forEachObj,
  fromPairs: r.fromPairs,
  groupBy: r.groupBy,
  // guards.ts
  isString: r.isString,
  isNumber: r.isNumber,
  isDefined: r.isDefined,
  isBoolean: r.isBoolean,
  isPromise: r.isPromise,
  isArray: r.isArray,
  isObject: r.isObject,
  isFunction: r.isFunction,
  isNil: r.isNil,
  isError: r.isError,
  isDate: r.isDate,
  isTruthy: r.isTruthy,
  isNot: r.isNot,
  identity: r.identity,
  indexBy: r.indexBy,
  intersection: r.intersection,
  keys: r.keys,
  last: r.last,
  map: r.map,
  mapKeys: r.mapKeys,
  mapToObj: r.mapToObj,
  mapValues: r.mapValues,
  maxBy: r.maxBy,
  meanBy: r.meanBy,
  merge: r.merge,
  mergeAll: r.mergeAll,
  minBy: r.minBy,
  noop: r.noop,
  objOf: r.objOf,
  omit: r.omit,
  omitBy: r.omitBy,
  once: r.once,
  partition: r.partition,
  pathOr: r.pathOr,
  pick: r.pick,
  pickBy: r.pickBy,
  pipe: r.pipe,
  prop: r.prop,
  purry: r.purry,
  randomString: r.randomString,
  range: r.range,
  reduce: r.reduce,
  reject: r.reject,
  reverse: r.reverse,
  set: r.set,
  sort: r.sort,
  sortBy: r.sortBy,
  splitAt: r.splitAt,
  splitWhen: r.splitWhen,
  sumBy: r.sumBy,
  take: r.take,
  takeWhile: r.takeWhile,
  times: r.times,
  toPairs: r.toPairs,
  type: r.type,
  uniq: r.uniq,
  uniqBy: r.uniqBy,
  uniqWith: r.uniqWith,
  values: r.values,
  zip: r.zip,
  zipWith: r.zipWith,
} as const
