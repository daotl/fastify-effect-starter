module default {
  type User extending Base {
	  required email: str {
      constraint exclusive;
    }
    required name: str;
	  required role: Role {
      default := Role.user;
    }
    link posts := .<author[is Post];
	  profile: Profile;
  }
}
