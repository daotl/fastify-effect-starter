CREATE MIGRATION m1w6r43gw42bu6yb7osbehvtz5ec7zeo4c3a3zkz4dctorq6ljyb6a
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
  CREATE TYPE default::`Group` EXTENDING default::Base {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::GroupRole EXTENDING default::Base {
      CREATE REQUIRED LINK `group`: default::`Group`;
      CREATE REQUIRED PROPERTY code: std::str;
      CREATE CONSTRAINT std::exclusive ON ((.`group`, .code));
  };
  CREATE TYPE default::Post EXTENDING default::Base {
      CREATE MULTI LINK categories: default::Category;
      CREATE MULTI LINK editorGroups: default::`Group`;
      CREATE MULTI LINK viewerGroups: default::`Group`;
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
  ALTER TYPE default::`Group` {
      CREATE LINK editablePosts := (.<editorGroups[IS default::Post]);
      CREATE LINK groupRoles := (.<`group`[IS default::GroupRole]);
      CREATE MULTI LINK members: default::User;
      CREATE REQUIRED LINK owner: default::User;
      CREATE LINK viewablePosts := (.<viewerGroups[IS default::Post]);
  };
  ALTER TYPE default::User {
      CREATE LINK groups := (.<members[IS default::`Group`]);
  };
  ALTER TYPE default::GroupRole {
      CREATE MULTI LINK users: default::User;
  };
  ALTER TYPE default::User {
      CREATE LINK groupRoles := (.<users[IS default::GroupRole]);
  };
  ALTER TYPE default::Post {
      CREATE REQUIRED LINK author: default::User;
      CREATE MULTI LINK editors: default::User;
      CREATE MULTI LINK viewers: default::User;
  };
  ALTER TYPE default::User {
      CREATE LINK authoredPosts := (.<author[IS default::Post]);
      CREATE LINK editablePosts := (.<editors[IS default::Post]);
      CREATE LINK viewablePosts := (.<viewers[IS default::Post]);
  };
  ALTER TYPE default::Profile {
      CREATE LINK user := (.<profile[IS default::User]);
  };
};
