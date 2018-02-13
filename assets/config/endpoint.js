export default {
  api: {
    url: "http://192.168.0.104:5000/api/",
    endpoints: {
      login: "auth/login",
      case: "case/",
      caseItems: {
        caseItem: "caseitem/",
        caseItemsForCase: "caseitem/case/"
      }
    }
  }
};
