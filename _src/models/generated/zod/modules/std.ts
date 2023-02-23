import { z } from "zod";

// #region std::bool
export const boolSchema = z.boolean();
// #endregion

// #region std::datetime
export const datetimeSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?Z?$/);
// #endregion

// #region std::str
export const strSchema = z.string();
// #endregion

// #region std::uuid
export const uuidSchema = z.string().uuid();
// #endregion
