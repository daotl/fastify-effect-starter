module default {
  type Category extending Base {
	  name: str;
	  link posts := .<categories[is Post];
  }
}
