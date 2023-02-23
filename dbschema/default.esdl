module default {
  scalar type Role extending enum<user, admin>;

  abstract type Base {
    required property createdAt -> datetime {
      default := datetime_current();
    }
  }

  type User extending Base {
	  required property email -> str {
      constraint exclusive;
    }
    required property name -> str;
	  required property role ->Role {
      default := Role.user;;
    }
	  multi link posts := .<author[is Post];
	  link profile -> Profile;
  }

  type Profile extending Base {
  	property bio -> str;
  	link user := .<profile[is User];
  }

  type Post extending Base {
    required property title -> str {
      constraint exclusive;
    }
    required property content -> str;
    required property published -> bool {
      default := false;
    }
    required link author -> User;
    multi link categories -> Category;

    index on (.title);
  }

  type Category extending Base {
	property name -> str;
	multi link posts := .<categories[is Post];
  }
}
