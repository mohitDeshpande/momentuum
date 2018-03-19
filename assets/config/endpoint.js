export default {
  api: {
    url: "http://127.0.0.1:5000/api/",
    endpoints: {
      login: "auth/login",
      caselist: "case/client/emp",
      casesDetail: {
        caseDetail: "case/",
        caseDetailWithClient: "case/client/emp",
        caseDetailById: "case/client/",
        stats: "case/stats"
      },
      caseItems: {
        caseItem: "caseitem/",
        caseItemsForCase: "caseitem/case/"
      },
      test: {
        withAuth: "values/5",
        withoutAuth: "values"
      },
      clientlist: "client/division/",
      employee: "employee/"
    }
  }
};