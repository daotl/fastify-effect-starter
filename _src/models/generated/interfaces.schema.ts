// Generated by ts-to-effect-schema
import * as S from "@effect/schema/Schema";
import type { Primitive, ReadonlyDeep } from "type-fest";
import { pipe } from "@effect/data/Function";
import type {
  Category,
  Group,
  User,
  GroupRole,
  Post,
  Profile,
} from "./interfaces.js";

// https://github.com/sindresorhus/type-fest/blob/2f64161921fc5e2d8e29d36ddaf2dc082017de35/source/internal.d.ts#L35
export type BuiltIns = Primitive | Date | RegExp;

export type ReplaceType<T, From, To> = T extends From ? To : T;

export type ReplaceTypeDeep<T, From, To> = T extends BuiltIns
  ? ReplaceType<T, From, To>
  : {
      [K in keyof T]: ReplaceTypeDeep<T[K], From, To>;
    };

export type ReplaceDateToStringDeep<T> = ReplaceTypeDeep<T, Date, string>;

export type ObjectSchema<T extends Object> = S.Schema<
  ReplaceDateToStringDeep<ReadonlyDeep<T>>,
  ReadonlyDeep<T>
>;

export const stdBaseObjectSchema = S.struct({
  id: S.string,
});

export const stdObjectSchema = stdBaseObjectSchema;

export const baseSchema = pipe(
  stdObjectSchema,
  S.extend(
    S.struct({
      createdAt: S.Date,
    })
  )
);

export const roleSchema = S.union(S.literal("user"), S.literal("admin"));

export const categorySchema: ObjectSchema<Category> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        name: S.optional(S.nullable(S.string)),
        posts: S.array(postSchema),
      })
    )
  )
);

export const groupSchema: ObjectSchema<Group> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        name: S.string,
        editablePosts: S.array(postSchema),
        groupRoles: S.array(groupRoleSchema),
        members: S.array(userSchema),
        owner: userSchema,
        viewablePosts: S.array(postSchema),
      })
    )
  )
);

export const userSchema: ObjectSchema<User> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        profile: S.optional(S.nullable(profileSchema)),
        email: S.string,
        name: S.string,
        role: roleSchema,
        groups: S.array(groupSchema),
        groupRoles: S.array(groupRoleSchema),
        authoredPosts: S.array(postSchema),
        editablePosts: S.array(postSchema),
        viewablePosts: S.array(postSchema),
      })
    )
  )
);

export const groupRoleSchema: ObjectSchema<GroupRole> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        group: groupSchema,
        code: S.string,
        users: S.array(userSchema),
      })
    )
  )
);

export const postSchema: ObjectSchema<Post> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        categories: S.array(categorySchema),
        editorGroups: S.array(groupSchema),
        viewerGroups: S.array(groupSchema),
        title: S.string,
        content: S.string,
        published: S.boolean,
        author: userSchema,
        editors: S.array(userSchema),
        viewers: S.array(userSchema),
      })
    )
  )
);

export const profileSchema: ObjectSchema<Profile> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        bio: S.optional(S.nullable(S.string)),
        user: S.array(userSchema),
      })
    )
  )
);
