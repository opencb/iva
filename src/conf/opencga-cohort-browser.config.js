const OpencgaCohortBrowserConfig = {
    /*title: "Cohort Browser",
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
        },
        {
            id: "comparator-tab",
            name: "Comparator"
        }
    ],
    filter: {
        sections: [
            {
                title: "Section title",
                collapsed: false,
                fields: [
                    {
                        id: "id",
                        name: "ID",
                        type: "string",
                        placeholder: "LP-1234,LP-2345...",
                        description: ""
                    },
                    {
                        id: "samples",
                        name: "Samples",
                        type: "string",
                        placeholder: "HG01879, HG01880, HG01881...",
                        description: ""
                    },
                    {
                        id: "annotations",
                        name: "Cohort annotations",
                        placeholder: "Full-text search, e.g. *melanoma*",
                        description: ""
                    },
                    {
                        id: "type",
                        name: "Type",
                        multiple: true,
                        allowedValues: ["All", "CASE_CONTROL", "CASE_SET", "CONTROL_SET", "PAIRED", "PAIRED_TUMOR", "AGGREGATE", "TIME_SERIES", "FAMILY", "TRIO"],
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
                    annotation: "Pedigree:versionControl.GitVersionControl=git",
                    type: "TIME_SERIES,FAMILY",
                    id: "lp",
                    samples: "hg"
                }
            }
        ],
        grid: {},
        detail: [
            {
                id: "cohort-view",
                title: "Details",
                active: true
            },
            {
                id: "sample-view",
                title: "Samples"
            }
        ]
    },
    aggregation: {
        default: ["name"],
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
                        id: "type",
                        name: "type",
                        type: "string",
                        description: "type"
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
                        id: "numSamples",
                        name: "numSamples",
                        type: "string",
                        description: "Number of samples"
                    },
                    {
                        id: "status",
                        name: "status",
                        type: "string",
                        description: "Status"
                    },
                    {
                        id: "release",
                        name: "release",
                        type: "string",
                        description: "Release"
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
    }*/
};
