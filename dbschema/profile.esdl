module default {
  type Profile extending Base {
  	bio: str;
  	link user := .<profile[is User];
  }
}
