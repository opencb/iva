const OpencgaFamilyBrowserConfig = {
    title: "Family Browser",
    icon: "fas fa-chart-bar",
    searchButtonText: "Run",
    views: [
        {
            id: "table-tab",
            name: "Table result",
            active: true
        },
        {
            id: "facet-tab",
            name: "Aggregation stats"
        },/*
                {
                    id: "comparator-tab",
                    name: "Comparator"
                }*/
    ],
    filter: {
        sections: [
            {
                title: "Section title",
                collapsed: false,
                fields: [
                    {
                        id: "id",
                        name: "Family ID",
                        type: "string",
                        placeholder: "LP-1234,LP-2345...",
                        description: ""
                    },
                    {
                        id: "members",
                        name: "Members",
                        type: "string",
                        placeholder: "HG01879, HG01880, HG01881...",
                        description: ""
                    },
                    {
                        id: "phenotypes",
                        name: "Phenotype",
                        placeholder: "Full-text search, e.g. *melanoma*",
                        description: ""
                    },
                    {
                        id: "disorders",
                        name: "Disorder",
                        placeholder: "Intellectual disability,Arthrogryposis...",
                        description: ""
                    },
                    {
                        id: "annotations",
                        name: "Family Annotations",
                        description: ""
                    },
                    {
                        id: "date",
                        name: "Date",
                        description: ""
                    }
                ]
            }
        ],
        examples: [
            {
                name: "Full",
                query: {
                    id: "lp",
                    members: "hg",
                    phenotypes: "melanoma",
                    creationDate: "2020"
                }
            }
        ],
        activeFilters: {
            complexFields: ["annotation"]
        },
        grid: {
            pageSize: 10,
            pageList: [10, 25, 50],
            detailView: true,
            multiSelection: false
        },
        detail: [
            {
                id: "family-view",
                title: "Details",
                active: true
            }
        ]
    },
    aggregation: {
        default: ["study"],
        result: {
            numColumns: 2
        },
        sections: [
            {
                name: "section title",
                fields: [
                    {
                        id: "study",
                        name: "study",
                        type: "string",
                        description: "Study [[user@]project:]study where study and project can be either the ID or UUID"
                    },
                    {
                        id: "creationYear",
                        name: "creationYear",
                        type: "string",
                        description: "Creation year"
                    },
                    {
                        id: "creationMonth",
                        name: "creationMonth",
                        type: "string",
                        description: "Creation month (JANUARY, FEBRUARY...)"
                    },
                    {
                        id: "creationDay",
                        name: "creationDay",
                        type: "string",
                        description: "Creation day"
                    },
                    {
                        id: "creationDayOfWeek",
                        name: "creationDayOfWeek",
                        type: "string",
                        description: "Creation day of week (MONDAY, TUESDAY...)"
                    },
                    {
                        id: "status",
                        name: "status",
                        type: "string",
                        description: "Status"
                    },
                    {
                        id: "phenotypes",
                        name: "phenotypes",
                        type: "string",
                        description: "Phenotypes"
                    },
                    {
                        id: "release",
                        name: "release",
                        type: "string",
                        description: "Release"
                    },
                    {
                        id: "version",
                        name: "version",
                        type: "string",
                        description: "Version"
                    },
                    {
                        id: "numMembers",
                        name: "numMembers",
                        type: "string",
                        description: "Number of members"
                    },
                    {
                        id: "expectedSize",
                        name: "expectedSize",
                        type: "string",
                        description: "Expected size"
                    },
                    {
                        id: "annotation",
                        name: "annotation",
                        type: "string",
                        description: "Annotation, e.g: key1=value(,key2=value)"
                    },
                    {
                        id: "field",
                        name: "field",
                        type: "string",
                        description: "List of fields separated by semicolons, e.g.: studies;type. For nested fields use >>, e.g.: studies>>biotype;type;numSamples[0..10]:1"
                    }
                ]
            }
        ]
    },
    annotations: {},
};
