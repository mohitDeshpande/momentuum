export default {
  api: {
    url: "https://momentuumapi.azurewebsites.net/api/",
    endpoints: {
      login: "auth/login",
      caselist: "case/client/emp",
      casesDetail: {
        caseDetail: "case/",
        caseDetailWithClient: "case/client/emp",
        caseDetailById: "case/client/",
        stats: "case/stats",
        addSignature: "case/signature/"
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
      employee: "employee/",
    }
  }
};