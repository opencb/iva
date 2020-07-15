const OpencgaClinicalPortalConfig = {
    showCreate: false,
    reviewCases: {
        title: "Review Cases",
        showTitle: true,
        filter: {
            sections: [
                {
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
                        /*{
                            id: "family"
                        },*/
                        {
                            id: "disorder"
                        },
                        /*{
                            id: "type"
                        },
                        {
                            id: "status"
                        },
                        /*{
                            id: "priority"
                        },
                        {
                            id: "assignee"
                        }*/
                    ]
                }
            ],
            examples: [

            ]
        },
        grid: {
            pageSize: 5,
            pageList: [5, 10, 25],
            detailView: false,
            multiSelection: false,
            showDeleteButton: false
        }
    }
};
