export default {
  api: {
    url: "http://192.168.0.108/MomentuumApi/api/",
    endpoints: {
      login: "auth/login",
      caselist: "case/client/emp",
      casesDetail: {
        caseDetail: "case/",
        caseDetailWithClient: "case/client/emp",
        caseDetailById: "case/client/"
      },
      caseItems: {
        caseItem: "caseitems/",
        caseItemsForCase: "caseitems/case/"
      },
      test: {
        withAuth: "values/5",
        withoutAuth: "values"
      }
    }
  }
};
