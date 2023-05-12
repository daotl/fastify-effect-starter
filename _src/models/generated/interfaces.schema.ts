// Generated by ts-to-effect-schema
import * as S from "@effect/schema/Schema";
import type {
  Primitive,
  ReadonlyDeep,
  IsAny,
  IsUnknown,
  IsEqual,
} from "type-fest";
import { pipe } from "@effect/data/Function";
import type { Category, Post, User, Profile } from "./interfaces.js";

// https://github.com/sindresorhus/type-fest/blob/2f64161921fc5e2d8e29d36ddaf2dc082017de35/source/internal.d.ts#L35
export type BuiltIns = Primitive | Date | RegExp;

export type ReplaceType<T, From, To> = IsEqual<T, From> extends true ? To : T;

export type ReplaceTypeDeep<T, From, To> = T extends BuiltIns
  ? ReplaceType<T, From, To>
  : IsAny<T> extends true
  ? ReplaceType<T, From, To>
  : IsUnknown<T> extends true
  ? ReplaceType<T, From, To>
  : T extends Function
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
        posts: S.array(postSchema),
        name: S.optional(S.nullable(S.string)),
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
        author: userSchema,
        title: S.string,
        content: S.string,
        published: S.boolean,
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
        posts: S.array(postSchema),
        email: S.string,
        name: S.string,
        role: roleSchema,
      })
    )
  )
);

export const profileSchema: ObjectSchema<Profile> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      S.struct({
        user: S.array(userSchema),
        bio: S.optional(S.nullable(S.string)),
      })
    )
  )
);
