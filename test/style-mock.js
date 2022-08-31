export default new Proxy(
  {},
  {
    get: function get(target, key) {
      if (key === '__esModule') {
        return false;
      }
      return key;
    },
  }
);
