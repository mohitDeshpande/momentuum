export default {
  api: {
    url: "http://192.168.0.13/MomentuumApi/api/",
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
        caseItem: "caseItems/",
        caseItemsForCase: "caseItems/case/"
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