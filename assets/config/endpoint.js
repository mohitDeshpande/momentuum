export default {
  api: {
    url: "http://127.0.0.1:5000/api/",
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
