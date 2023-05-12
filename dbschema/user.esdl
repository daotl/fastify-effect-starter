module default {
  type User extending Base {
	  required email: str {
      constraint exclusive;
    }
    required name: str;
	  required role: Role {
      default := Role.user;
    }
    link groups := .<members[is `Group`];
    link groupRoles := .<users[is GroupRole];
    link authoredPosts := .<author[is Post];
    link editablePosts := .<editors[is Post];
    link viewablePosts := .<viewers[is Post];
	  profile: Profile;
  }
}
