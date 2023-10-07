import type {
  Category as CategoryR,
  Group as GroupR,
  GroupRole as GroupRoleR,
  Post as PostR,
  Profile as ProfileR,
  Role as RoleR,
  User as UserR,
} from './generated/interfaces.js'

export * from './generated/interfaces.js'

export type ModelR =
  | CategoryR
  | PostR
  | ProfileR
  | RoleR
  | UserR
  | GroupRoleR
  | GroupR

export type OmitModelRelations<MR extends ModelR> = ConditionalExcept<
  MR,
  ModelR | ModelR[] | null | undefined
>

export type Category = OmitModelRelations<CategoryR>
export type Post = OmitModelRelations<PostR>
export type Profile = OmitModelRelations<ProfileR>
export type Role = OmitModelRelations<RoleR>
export type User = OmitModelRelations<UserR>
export type Group = OmitModelRelations<GroupR>
export type GroupRole = OmitModelRelations<GroupRoleR>

export type Model = Category | Post | Profile | Role | User | Group | GroupRole

export type ModelMap = {
  Category: Category
  Post: Post
  Profile: Profile
  Role: Role
  User: User
  Group: Group
  GroupRole: GroupRole
}

export type { CategoryR, PostR, ProfileR, RoleR, UserR, GroupR, GroupRoleR }
