function createLiker() {
  const store = {
    rating : 0,
    like() {
      this.rating += 1;
      return this;
    },
    dislike() {
      this.rating -= 1;
      return this;
    },
    val() {
      return this.rating;
    },
  };
  return store;
};
