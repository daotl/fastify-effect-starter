// GENERATED by @edgedb/generate v0.0.7
// Run 'npx @edgedb/generate edgeql-js' to re-generate

import * as $ from "../reflection.mjs";
import * as _ from "../imports.mjs";
function floor(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::floor', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000110"},
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::floor",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function ln(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::ln', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::ln",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function lg(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::lg', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::lg",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function abs(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::abs', args, _.spec, [
    {args: [{typeId: "38625c31-7ce5-11ed-8de2-f98f6b9b4b9a", optional: false, setoftype: false, variadic: false}], returnTypeId: "38625c31-7ce5-11ed-8de2-f98f6b9b4b9a"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::abs",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function ceil(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::ceil', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000110", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000110"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::ceil",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function log(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::log', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false}], namedArgs: {"base": {typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: false, variadic: false}}, returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::log",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function mean(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::mean', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::mean",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function stddev(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::stddev', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::stddev",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function stddev_pop(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::stddev_pop', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::stddev_pop",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function var_43a5cee47ce511ed8b6c696d3d95a080(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::var', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "OptionalType"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::var",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function var_pop(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('math::var_pop', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-0000000001ff", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-0000000001ff", returnTypemod: "OptionalType"},
    {args: [{typeId: "00000000-0000-0000-0000-000000000108", optional: false, setoftype: true, variadic: false}], returnTypeId: "00000000-0000-0000-0000-000000000108", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "math::var_pop",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};



const __defaultExports = {
  "floor": floor,
  "ln": ln,
  "lg": lg,
  "abs": abs,
  "ceil": ceil,
  "log": log,
  "mean": mean,
  "stddev": stddev,
  "stddev_pop": stddev_pop,
  "var": var_43a5cee47ce511ed8b6c696d3d95a080,
  "var_pop": var_pop
};
export default __defaultExports;
