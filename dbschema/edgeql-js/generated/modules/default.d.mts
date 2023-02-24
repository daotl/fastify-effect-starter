import * as $ from "../reflection.mjs";
import type * as _std from "./std.mjs";
export type $Role = {
    "user": $.$expr_Literal<$Role>;
    "admin": $.$expr_Literal<$Role>;
} & $.EnumType<"default::Role", ["user", "admin"]>;
declare const Role: $Role;
export type $BaseλShape = $.typeutil.flatten<_std.$Object_a95265547ccd11edaf577b7152587f02λShape & {
    "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, true>;
}>;
type $Base = $.ObjectType<"default::Base", $BaseλShape, null, [
    ..._std.$Object_a95265547ccd11edaf577b7152587f02['__exclusives__']
]>;
declare const $Base: $Base;
declare const Base: $.$expr_PathNode<$.TypeSet<$Base, $.Cardinality.Many>, null>;
export type $CategoryλShape = $.typeutil.flatten<$BaseλShape & {
    "posts": $.LinkDesc<$Post, $.Cardinality.Many, {}, false, true, false, false>;
    "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
    "<categories[is Post]": $.LinkDesc<$Post, $.Cardinality.Many, {}, false, false, false, false>;
    "<categories": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false, false, false>;
}>;
type $Category = $.ObjectType<"default::Category", $CategoryλShape, null, [
    ...$Base['__exclusives__']
]>;
declare const $Category: $Category;
declare const Category: $.$expr_PathNode<$.TypeSet<$Category, $.Cardinality.Many>, null>;
export type $PostλShape = $.typeutil.flatten<$BaseλShape & {
    "categories": $.LinkDesc<$Category, $.Cardinality.Many, {}, false, false, false, false>;
    "author": $.LinkDesc<$User, $.Cardinality.One, {}, false, false, false, false>;
    "title": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
    "content": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
    "published": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, true>;
    "<posts[is Category]": $.LinkDesc<$Category, $.Cardinality.Many, {}, false, false, false, false>;
    "<posts[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false, false, false>;
    "<posts": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false, false, false>;
}>;
type $Post = $.ObjectType<"default::Post", $PostλShape, null, [
    ...$Base['__exclusives__'],
    {
        title: {
            __element__: _std.$str;
            __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne;
        };
    }
]>;
declare const $Post: $Post;
declare const Post: $.$expr_PathNode<$.TypeSet<$Post, $.Cardinality.Many>, null>;
export type $ProfileλShape = $.typeutil.flatten<$BaseλShape & {
    "user": $.LinkDesc<$User, $.Cardinality.Many, {}, false, true, false, false>;
    "bio": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
    "<profile[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false, false, false>;
    "<profile": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false, false, false>;
}>;
type $Profile = $.ObjectType<"default::Profile", $ProfileλShape, null, [
    ...$Base['__exclusives__']
]>;
declare const $Profile: $Profile;
declare const Profile: $.$expr_PathNode<$.TypeSet<$Profile, $.Cardinality.Many>, null>;
export type $UserλShape = $.typeutil.flatten<$BaseλShape & {
    "profile": $.LinkDesc<$Profile, $.Cardinality.AtMostOne, {}, false, false, false, false>;
    "posts": $.LinkDesc<$Post, $.Cardinality.Many, {}, false, true, false, false>;
    "email": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
    "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
    "role": $.PropertyDesc<$Role, $.Cardinality.One, false, false, false, true>;
    "<author[is Post]": $.LinkDesc<$Post, $.Cardinality.Many, {}, false, false, false, false>;
    "<user[is Profile]": $.LinkDesc<$Profile, $.Cardinality.Many, {}, false, false, false, false>;
    "<author": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false, false, false>;
    "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false, false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null, [
    ...$Base['__exclusives__'],
    {
        email: {
            __element__: _std.$str;
            __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne;
        };
    }
]>;
declare const $User: $User;
declare const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null>;
export { Role, $Base, Base, $Category, Category, $Post, Post, $Profile, Profile, $User, User };
type __defaultExports = {
    "Role": typeof Role;
    "Base": typeof Base;
    "Category": typeof Category;
    "Post": typeof Post;
    "Profile": typeof Profile;
    "User": typeof User;
};
declare const __defaultExports: __defaultExports;
export default __defaultExports;
