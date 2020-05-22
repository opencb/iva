const OpencgaSampleBrowserConfig = {
    title: "Sample Browser",
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
        }/*
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
                        name: "Sample ID",
                        placeholder: "HG01879, HG01880, HG01881...",
                        description: ""
                    },
                    {
                        id: "individual",
                        name: "Individual ID",
                        placeholder: "LP-1234, LP-4567...",
                        description: "",
                        showList: false
                    },
                    {
                        id: "file",
                        name: "File Name",
                        placeholder: "file.vcf, ...",
                        description: ""
                    },
                    {
                        id: "annotations",
                        name: "Sample annotations",
                        description: ""
                    },
                    {
                        id: "phenotypes",
                        name: "Phenotypes",
                        placeholder: "Full-text search, e.g. melanoma",
                        description: ""
                    },
                    {
                        id: "somatic",
                        name: "Somatic",
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
                active: false,
                query: {
                    id: "HG",
                    individual: "LP",
                    source: "LP",
                    phenotypes: "melanoma",
                    somatic: "True",
                    creationDate: ">=20200216"
                }
            }
        ],
        result: {
            grid: {
                pageSize: 10,
                pageList: [10, 25, 50],
                multiSelection: false
            },
            sampleDetail: {
                showTitle: false
            }
        },
        detail: [
            {
                id: "sample-view",
                title: "Details",
                active: true
            },
            {
                id: "sample-variant-stats-view",
                title: "Variant Stats"
            },
            {
                id: "individual-view",
                title: "Individual"
            },
            {
                id: "file-view",
                title: "Files"
            }
        ]
    },
    aggregation: {
        default: [],
        result: {
            numColumns: 2
        },
        sections: [
            {
                name: "Section Title",
                // collapsed: false,
                fields: [
                    {
                        id: "study",
                        name: "study",
                        type: "string",
                        description: "Study [[user@]project:]study where study and project can be either the ID or UUID"
                    },
                    {
                        id: "source",
                        name: "source",
                        type: "string",
                        description: "Source"
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
                        id: "type",
                        name: "type",
                        type: "string",
                        description: "type"
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
                        id: "somatic",
                        name: "somatic",
                        type: "boolean",
                        description: "Somatic"
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
    }
};
