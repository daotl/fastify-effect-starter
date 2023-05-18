// Generated by ts-to-effect-schema
import * as S from "@effect/schema/Schema";
import type {
  Primitive,
  ReadonlyDeep,
  IsAny,
  IsUnknown,
  IsEqual,
  IsEmptyObject,
} from "type-fest";
import * as AST from "@effect/schema/AST";
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

export const getPropertySignatures = <I extends { [K in keyof A]: any }, A>(
  schema: S.Schema<I, A>
): { [K in keyof A]: S.Schema<I[K], A[K]> } => {
  const out: Record<PropertyKey, S.Schema<any>> = {};
  const propertySignatures = AST.getPropertySignatures(schema.ast);
  for (let i = 0; i < propertySignatures.length; i++) {
    const propertySignature = propertySignatures[i]!;
    out[propertySignature.name] = S.make(propertySignature.type);
  }
  return out as any;
};

export type CommonKey<T, U, TK = keyof T, UK = keyof U> = {
  // @ts-expect-error
  [P in TK extends UK ? TK : never]: T[P];
};

const omitCommonProperties = <
  I extends { [K in keyof A]: unknown },
  A,
  IB extends { [K in keyof B]: unknown },
  B,
  R = IsEmptyObject<CommonKey<A, B>> extends true
    ? S.Schema<I, A>
    : S.Schema<I, Omit<A, keyof CommonKey<A, B>>>
>(
  self: S.Schema<I, A>,
  that: S.Schema<IB, B>
): R => {
  const selfObj = getPropertySignatures(self);
  const thatObj = getPropertySignatures(that);

  const intersections = Object.keys(selfObj).reduce<(keyof A)[]>(
    (keys, key) => {
      if (Reflect.has(thatObj, key)) {
        keys.push(key as keyof A);
      }

      return keys;
    },
    []
  ) as unknown as (keyof CommonKey<A, B>)[];

  if (intersections.length) {
    return pipe(
      self,
      S.omit<A, (keyof CommonKey<A, B>)[]>(...intersections)
    ) as unknown as R;
  }

  return self as unknown as R;
};

export const stdBaseObjectSchema = S.struct({
  id: S.string,
});

export const stdObjectSchema = stdBaseObjectSchema;

export const baseSchema = pipe(
  stdObjectSchema,
  S.extend(
    omitCommonProperties(
      S.struct({
        createdAt: S.Date,
      }),
      stdObjectSchema
    )
  )
);

export const roleSchema = S.union(S.literal("user"), S.literal("admin"));

export const categorySchema: ObjectSchema<Category> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      omitCommonProperties(
        S.struct({
          name: S.optional(S.nullable(S.string)),
          posts: S.array(postSchema),
        }),
        baseSchema
      )
    )
  )
);

export const groupSchema: ObjectSchema<Group> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      omitCommonProperties(
        S.struct({
          name: S.string,
          editablePosts: S.array(postSchema),
          groupRoles: S.array(groupRoleSchema),
          members: S.array(userSchema),
          owner: userSchema,
          viewablePosts: S.array(postSchema),
        }),
        baseSchema
      )
    )
  )
);

export const userSchema: ObjectSchema<User> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      omitCommonProperties(
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
        }),
        baseSchema
      )
    )
  )
);

export const groupRoleSchema: ObjectSchema<GroupRole> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      omitCommonProperties(
        S.struct({
          group: groupSchema,
          code: S.string,
          users: S.array(userSchema),
        }),
        baseSchema
      )
    )
  )
);

export const postSchema: ObjectSchema<Post> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      omitCommonProperties(
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
        }),
        baseSchema
      )
    )
  )
);

export const profileSchema: ObjectSchema<Profile> = S.lazy(() =>
  pipe(
    baseSchema,
    S.extend(
      omitCommonProperties(
        S.struct({
          bio: S.optional(S.nullable(S.string)),
          user: S.array(userSchema),
        }),
        baseSchema
      )
    )
  )
);
