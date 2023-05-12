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
    multi editors: User;
    multi editorGroups: `Group`;
    multi viewers: User;
    multi viewerGroups: `Group`;
    multi categories: Category;

    index on (.title);
  }
}
