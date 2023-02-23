CREATE MIGRATION m1rt6tln7uk5x5vedl4yeugo2sbv6clu6dc6gcfua24wyzbl6nhhxq
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE ABSTRACT TYPE default::Base {
      CREATE REQUIRED PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::Category EXTENDING default::Base {
      CREATE PROPERTY name -> std::str;
  };
  CREATE TYPE default::Post EXTENDING default::Base {
      CREATE MULTI LINK categories -> default::Category;
      CREATE REQUIRED PROPERTY title -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.title);
      CREATE REQUIRED PROPERTY content -> std::str;
      CREATE REQUIRED PROPERTY published -> std::bool {
          SET default := false;
      };
  };
  CREATE TYPE default::Profile EXTENDING default::Base {
      CREATE PROPERTY bio -> std::str;
  };
  CREATE SCALAR TYPE default::Role EXTENDING enum<user, admin>;
  CREATE TYPE default::User EXTENDING default::Base {
      CREATE LINK profile -> default::Profile;
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY role -> default::Role {
          SET default := (default::Role.user);
      };
  };
  ALTER TYPE default::Category {
      CREATE MULTI LINK posts := (.<categories[IS default::Post]);
  };
  ALTER TYPE default::Post {
      CREATE REQUIRED LINK author -> default::User;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK posts := (.<author[IS default::Post]);
  };
  ALTER TYPE default::Profile {
      CREATE LINK user := (.<profile[IS default::User]);
  };
};
