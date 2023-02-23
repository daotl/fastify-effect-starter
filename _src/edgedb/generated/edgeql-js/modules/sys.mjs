// GENERATED by @edgedb/generate v0.0.7
// Run 'npx @edgedb/generate edgeql-js' to re-generate

import * as $ from "../reflection.mjs";
import * as _ from "../imports.mjs";
const TransactionIsolation = $.makeType(_.spec, "43b27a5d-7ce5-11ed-a283-f3e2eed9cad3", _.syntax.literal);

const VersionStage = $.makeType(_.spec, "43b30e35-7ce5-11ed-b1b6-b7ab15e95bb8", _.syntax.literal);

const $SystemObject = $.makeType(_.spec, "43b3a0eb-7ce5-11ed-bd12-49572d7e3832", _.syntax.literal);

const SystemObject= _.syntax.$PathNode($.$toSet($SystemObject, $.Cardinality.Many), null);

const $Database = $.makeType(_.spec, "43ce7d0f-7ce5-11ed-b7cf-fd857b5f5824", _.syntax.literal);

const Database= _.syntax.$PathNode($.$toSet($Database, $.Cardinality.Many), null);

const $ExtensionPackage = $.makeType(_.spec, "43ed0b98-7ce5-11ed-9ffe-37160ad6cf01", _.syntax.literal);

const ExtensionPackage= _.syntax.$PathNode($.$toSet($ExtensionPackage, $.Cardinality.Many), null);

const $Role = $.makeType(_.spec, "440fd704-7ce5-11ed-8192-8da939465545", _.syntax.literal);

const Role= _.syntax.$PathNode($.$toSet($Role, $.Cardinality.Many), null);

function get_version(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_version', args, _.spec, [
    {args: [], returnTypeId: "a0efd222-8d97-429f-32f7-4264a34815ff"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_version",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_version_as_str(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_version_as_str', args, _.spec, [
    {args: [], returnTypeId: "00000000-0000-0000-0000-000000000101"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_version_as_str",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_instance_name(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_instance_name', args, _.spec, [
    {args: [], returnTypeId: "00000000-0000-0000-0000-000000000101"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_instance_name",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_transaction_isolation(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_transaction_isolation', args, _.spec, [
    {args: [], returnTypeId: "43b27a5d-7ce5-11ed-a283-f3e2eed9cad3"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_transaction_isolation",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};

function get_current_database(...args) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys::get_current_database', args, _.spec, [
    {args: [], returnTypeId: "00000000-0000-0000-0000-000000000101"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys::get_current_database",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  });
};



export { TransactionIsolation, VersionStage, $SystemObject, SystemObject, $Database, Database, $ExtensionPackage, ExtensionPackage, $Role, Role };

const __defaultExports = {
  "TransactionIsolation": TransactionIsolation,
  "VersionStage": VersionStage,
  "SystemObject": SystemObject,
  "Database": Database,
  "ExtensionPackage": ExtensionPackage,
  "Role": Role,
  "get_version": get_version,
  "get_version_as_str": get_version_as_str,
  "get_instance_name": get_instance_name,
  "get_transaction_isolation": get_transaction_isolation,
  "get_current_database": get_current_database
};
export default __defaultExports;
