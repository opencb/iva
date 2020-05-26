const OpencgaIndividualBrowserConfig = {
    /*title: "Individual Browser",
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
        },/!*
                {
                    id: "comparator-tab",
                    name: "Comparator"
                }*!/
    ],
    filter: {
        sections: [
            {
                title: "Section title",
                collapsed: false,
                fields: [
                    {
                        id: "id",
                        name: "Individual ID",
                        type: "string",
                        placeholder: "LP-1234,LP-2345...",
                        description: ""
                    },
                    {
                        id: "samples",
                        name: "Sample ID",
                        type: "string",
                        placeholder: "HG01879, HG01880, HG01881...",
                        description: ""
                    },
                    {
                        id: "father",
                        name: "Father ID",
                        type: "string",
                        placeholder: "LP-1234,LP-2345...",
                        description: ""
                    },
                    {
                        id: "mother",
                        name: "Mother ID",
                        type: "string",
                        placeholder: "LP-1234,LP-2345...",
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
                        id: "sex",
                        name: "Sex",
                        allowedValues: ["MALE", "FEMALE", "UNKNOWN", "UNDETERMINED"],
                        multiple: true,
                        description: ""
                    },
                    {
                        id: "karyotypicSex",
                        name: "Karyotypic Sex",
                        type: "category",
                        allowedValues: ["XX", "XY", "XO", "XXY", "XXX", "XXYY", "XXXY", "XXXX", "XYY", "OTHER", "UNKNOWN"],
                        multiple: true,
                        description: ""
                    },
                    {
                        id: "ethnicity",
                        name: "Ethnicity",
                        type: "string",
                        placeholder: "White caucasian,asiatic...",
                        description: ""
                    },
                    {
                        id: "lifeStatus",
                        name: "Life Status",
                        allowedValues: ["ALIVE", "ABORTED", "DECEASED", "UNBORN", "STILLBORN", "MISCARRIAGE", "UNKNOWN"],
                        multiple: true,
                        description: ""
                    },
                    {
                        id: "annotations",
                        name: "Individual Annotations",
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
                    id: "LP",
                    samples: "HG",
                    sex: "FEMALE",
                    karyotypicSex: "VCF,BCF,PROTOCOL_BUFFER",
                    ethnicity: "asiatic",
                    disorder: "british",
                    affectationStatus: "AFFECTED",
                    lifeStatus: "ALIVE",
                    phenotypes: "melanoma",
                    creationDate: "20201004"
                }
            }
        ],
        grid: {
            pageSize: 10,
            pageList: [10, 25, 50],
            detailView: true,
            multiSelection: false
        },
        gridComparator: {
            pageSize: 5,
            pageList: [5, 10],
            detailView: true,
            multiSelection: true
        },
        detail: [
            {
                id: "individual-view",
                title: "Details",
                active: true
            }
        ]
    },
    aggregation: {
        default: ["type", "format", "bioformat"],
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
                        type: "category",
                        allowedValues: ["true", "false"],
                        multiple: false,
                        defaultValue: "false",
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
    },
    annotations: {},*/
};
