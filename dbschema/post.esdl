module default {
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
}
