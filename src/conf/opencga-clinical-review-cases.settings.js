const OpencgaClinicalReviewCasesSettings = {
    menu: {
        filters: [
            {
                id: "case"
            },
            {
                id: "sample"
            },
            {
                id: "proband"
            },
            {
                id: "family"
            },
            {
                id: "disorder"
            },
            {
                id: "type"
            },
            {
                id: "assignee"
            }
        ],
        examples: [
            {
                id: "Intellectual disability2",
                active: false,
                query: {
                    disorder: "Intellectual disability"
                }
            }
        ]
    },
    table: {
        /*toolbar: {
            showCreate: true
        },*/
        toolbarButtons: ["columns", "download"],
        columns: ["caseId", "probandId", "familyId", "disorderId", "interpretation", "action"]
    }
};
