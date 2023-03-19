// GENERATED by @edgedb/generate v0.0.7
// Run 'npx @edgedb/generate edgeql-js' to re-generate

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
const $ = __importStar(require("../reflection"));
const _ = __importStar(require("../imports"));
const Role = $.makeType(_.spec, "d2d8659d-b3ed-11ed-b928-dfecd379df63", _.syntax.literal);

const $Base = $.makeType(_.spec, "d2c93433-b3ed-11ed-ab06-c54d9aabf311", _.syntax.literal);

const Base= _.syntax.$PathNode($.$toSet($Base, $.Cardinality.Many), null);

const $Category = $.makeType(_.spec, "d2cc7d6a-b3ed-11ed-b4a1-3b498a46fbca", _.syntax.literal);

const Category= _.syntax.$PathNode($.$toSet($Category, $.Cardinality.Many), null);

const $Post = $.makeType(_.spec, "d2d0166f-b3ed-11ed-88a3-4b435259b271", _.syntax.literal);

const Post= _.syntax.$PathNode($.$toSet($Post, $.Cardinality.Many), null);

const $Profile = $.makeType(_.spec, "d2d4ce09-b3ed-11ed-bbc9-dba37395893d", _.syntax.literal);

const Profile= _.syntax.$PathNode($.$toSet($Profile, $.Cardinality.Many), null);

const $User = $.makeType(_.spec, "d2d87e3b-b3ed-11ed-999b-514484be256a", _.syntax.literal);

const User= _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);



Object.assign(exports, { Role: Role, $Base: $Base, Base: Base, $Category: $Category, Category: Category, $Post: $Post, Post: Post, $Profile: $Profile, Profile: Profile, $User: $User, User: User });

const __defaultExports = {
  "Role": Role,
  "Base": Base,
  "Category": Category,
  "Post": Post,
  "Profile": Profile,
  "User": User
};
exports.default = __defaultExports;
