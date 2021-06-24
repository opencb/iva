const OpencgaClinicalReviewCasesSettings = {
    grid: {
        toolbar: {
            showCreate: true
        },
        columns: [
            {
                id: "caseId"
                // can overwrite any other prop
            },
            {
                id: "probandId"
            },
            {
                id: "familyId"
            },
            {
                id: "disorderId"
            },
            {
                id: "interpretation"
            },
            {
                id: "action"
            }
        ]
    },
    // NOTE cannot easily customise canned filters here
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
    ]

};
