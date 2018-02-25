export default {
    api: {
      url: "http://192.168.2.150/MomentuumApi/api/",
      endpoints: {
        login: "auth/login",
        casesDetail: {
            caseDetail: "case/",
            caseDetailWithClient: "case/client/emp",
            caseDetailById: "case/client/"
        },
        caseItems: {
          caseItem: "caseitem/",
          caseItemsForCase: "caseitem/case/"
        }
      }
    }
  };