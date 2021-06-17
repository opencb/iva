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
    filter: {
        sections: [
            {
                id: "main",
                title: "",
                fields: [
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
            }
        ]
    }
};
