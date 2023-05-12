module default {
  scalar type Role extending enum<user, admin>;

  abstract type Base {
    required createdAt: datetime {
      default := datetime_current();
    }
  }

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

  type Profile extending Base {
  	bio: str;
  	link user := .<profile[is User];
  }

  type Post extending Base {
    required title: str {
      constraint exclusive;
    }
    required content: str;
    required published: bool {
      default := false;
    }
    required author: User;
    multi categories: Category;

    index on (.title);
  }

  type Category extending Base {
	  name: str;
	  link posts := .<categories[is Post];
  }
}
