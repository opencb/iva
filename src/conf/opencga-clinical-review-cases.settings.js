const OpencgaClinicalReviewCasesSettings = {
    menu: {
        // merge criterium: it uses this `filters` array as filter for internal one. Each object is merged with spread operator
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
        // merge criterium: full outer join like. it adds objects presents in internal array only and in external array only. In case of objects with same id, the external values overwrite the internal.
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
        // merge criterium: spread operator
        toolbar: {
            showColumns: true,
            showCreate: true,
            showExport: false,
            showDownload: true,
            // columns list will be added in grid components based on settings.table.columns
        },
        // merge criterium: uses this array as filter for internal 1D/2D array. It handles row/col span
        columns: ["caseId", "probandId", "familyId", "disorderId", "interpretation", "action"]
    },
    // TODO clinical-analysis-view settings?
};
