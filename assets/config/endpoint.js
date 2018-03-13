export default {
  api: {
    url: "http://192.168.0.14:5000/api/",
    endpoints: {
      login: "auth/login",
      caselist: "case/client/emp",
      caseItems: {
        caseItem: "caseitem/",
        caseItemsForCase: "caseitem/case/"
      },
      test: {
        withAuth: "values/5",
        withoutAuth: "values"
      },
      clientlist: "client/division/",
    }
  }
};
