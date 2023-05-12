module default {
  type `Group` extending Base {
    required name: str;
    required owner: User;

    # many-to-many
    multi members: User;
    link groupRoles := .<`group`[is GroupRole];
    link editablePosts := .<editorGroups[is Post];
    link viewablePosts := .<viewerGroups[is Post];
  }

  type GroupRole extending Base {
    constraint exclusive on((.`group`, .code));
    required `group`: `Group`;
    required code: str;
    # many-to-many
    multi users: User;
  }
}
