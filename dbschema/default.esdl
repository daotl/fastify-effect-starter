module default {
  scalar type Role extending enum<user, admin>;

  abstract type Base {
    required createdAt: datetime {
      default := datetime_current();
    }
  }
}
