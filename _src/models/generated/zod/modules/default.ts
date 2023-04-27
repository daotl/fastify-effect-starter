import { z } from "zod";

// #region default::Role
export const RoleSchema = z.enum(["user", "admin"]);
// #endregion

// #region default::Base
export const CreateBaseSchema = z.
  object({
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  });

export const UpdateBaseSchema = z.
  object({
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  });
// #endregion

// #region default::Category
export const CreateCategorySchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::Category
    name: z.string().optional(), // std::str
  });

export const UpdateCategorySchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::Category
    name: z.string().optional(), // std::str
  });
// #endregion

// #region default::Post
export const CreatePostSchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::Post
    title: z.string(), // std::str
    content: z.string(), // std::str
    published: z.boolean().optional(), // std::bool
  });

export const UpdatePostSchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::Post
    title: z.string(), // std::str
    content: z.string(), // std::str
    published: z.boolean().optional(), // std::bool
  });
// #endregion

// #region default::Profile
export const CreateProfileSchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::Profile
    bio: z.string().optional(), // std::str
  });

export const UpdateProfileSchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::Profile
    bio: z.string().optional(), // std::str
  });
// #endregion

// #region default::User
export const CreateUserSchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::User
    email: z.string(), // std::str
    name: z.string(), // std::str
    role: z.enum(["user", "admin"]).optional(), // default::Role
  });

export const UpdateUserSchema = z.
  object({ // default::Base
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/).optional(), // std::datetime
  })
  .extend({ // default::User
    email: z.string(), // std::str
    name: z.string(), // std::str
    role: z.enum(["user", "admin"]).optional(), // default::Role
  });
// #endregion
