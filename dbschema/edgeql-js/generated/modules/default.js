// GENERATED by @edgedb/generate v0.3.3

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
const Role = $.makeType(_.spec, "c943330b-cd64-11ee-98e5-111b43a9ea8e", _.syntax.literal);

const $Base = $.makeType(_.spec, "c939edee-cd64-11ee-9013-efb776244457", _.syntax.literal);

const Base= _.syntax.$PathNode($.$toSet($Base, $.Cardinality.Many), null);

const $Category = $.makeType(_.spec, "c93b494a-cd64-11ee-a45c-0bcc510859fc", _.syntax.literal);

const Category= _.syntax.$PathNode($.$toSet($Category, $.Cardinality.Many), null);

const $Group = $.makeType(_.spec, "c93c44ad-cd64-11ee-9e2f-535a1bf12dc9", _.syntax.literal);

const Group= _.syntax.$PathNode($.$toSet($Group, $.Cardinality.Many), null);

const $GroupRole = $.makeType(_.spec, "c93d3a3a-cd64-11ee-ac60-f34c25c4cf7b", _.syntax.literal);

const GroupRole= _.syntax.$PathNode($.$toSet($GroupRole, $.Cardinality.Many), null);

const $Post = $.makeType(_.spec, "c93f8729-cd64-11ee-acd3-595ed146c984", _.syntax.literal);

const Post= _.syntax.$PathNode($.$toSet($Post, $.Cardinality.Many), null);

const $Profile = $.makeType(_.spec, "c9420649-cd64-11ee-af4f-9b1430eebb04", _.syntax.literal);

const Profile= _.syntax.$PathNode($.$toSet($Profile, $.Cardinality.Many), null);

const $User = $.makeType(_.spec, "c94340ad-cd64-11ee-bb4b-a77f76fb6e7f", _.syntax.literal);

const User= _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);



Object.assign(exports, { Role: Role, $Base: $Base, Base: Base, $Category: $Category, Category: Category, $Group: $Group, Group: Group, $GroupRole: $GroupRole, GroupRole: GroupRole, $Post: $Post, Post: Post, $Profile: $Profile, Profile: Profile, $User: $User, User: User });

const __defaultExports = {
  "Role": Role,
  "Base": Base,
  "Category": Category,
  "Group": Group,
  "GroupRole": GroupRole,
  "Post": Post,
  "Profile": Profile,
  "User": User
};
exports.default = __defaultExports;
