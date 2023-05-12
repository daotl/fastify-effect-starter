CREATE MIGRATION m17fgtjgaruh63wl3c66kipwtysra67c4eog6h3uo5h27alybpf5oa
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE ABSTRACT TYPE default::Base {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Category EXTENDING default::Base {
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Post EXTENDING default::Base {
      CREATE MULTI LINK categories: default::Category;
      CREATE REQUIRED PROPERTY title: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.title);
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY published: std::bool {
          SET default := false;
      };
  };
  CREATE TYPE default::Profile EXTENDING default::Base {
      CREATE PROPERTY bio: std::str;
  };
  CREATE SCALAR TYPE default::Role EXTENDING enum<user, admin>;
  CREATE TYPE default::User EXTENDING default::Base {
      CREATE LINK profile: default::Profile;
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY role: default::Role {
          SET default := (default::Role.user);
      };
  };
  ALTER TYPE default::Category {
      CREATE LINK posts := (.<categories[IS default::Post]);
  };
  ALTER TYPE default::Post {
      CREATE REQUIRED LINK author: default::User;
  };
  ALTER TYPE default::User {
      CREATE LINK posts := (.<author[IS default::Post]);
  };
  ALTER TYPE default::Profile {
      CREATE LINK user := (.<profile[IS default::User]);
  };
};
