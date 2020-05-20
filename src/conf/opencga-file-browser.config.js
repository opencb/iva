const OpencgaFileBrowserConfig = {
    title: "File Browser",
    //active: false,
    icon: "fas fa-chart-bar",
    description: "",
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
                        id: "annotations",
                        name: "File annotations",
                        description: ""
                    },
                    {
                        id: "name",
                        name: "Name",
                        type: "string",
                        placeholder: "accepted_hits.bam, phenotypes.vcf...",
                        description: ""
                    },
                    {
                        id: "path",
                        name: "Path",
                        type: "string",
                        placeholder: "genomes/resources/files/...",
                        description: ""
                    },
                    {
                        id: "samples",
                        name: "Sample",
                        type: "string",
                        placeholder: "HG01879, HG01880, HG01881...",
                        description: ""
                    },
                    {
                        id: "format",
                        name: "Format",
                        type: "category",
                        allowedValues: ["VCF", "BCF", "GVCF", "TBI", "BIGWIG", "SAM", "BAM", "BAI", "CRAM", "CRAI", "FASTQ", "FASTA", "PED", "TAB_SEPARATED_VALUES", "COMMA_SEPARATED_VALUES", "XML", "PROTOCOL_BUFFER", "JSON", "AVRO", "PARQUET", "IMAGE", "PLAIN", "BINARY", "EXECUTABLE", "GZIP", "NONE", "UNKNOWN"],
                        placeholder: "genomes/resources/files/...",
                        description: ""
                    },
                    {
                        id: "bioformat",
                        name: "Bioformat",
                        type: "string",
                        placeholder: "ALIGNMENT,VARIANT...",
                        description: ""
                    },
                    {
                        id: "internal.index.status.name",
                        name: "Index Status",
                        allowedValues: ["READY", "DELETED", "TRASHED", "STAGE", "MISSING", "PENDING_DELETE", "DELETING", "REMOVED", "NONE"],
                        type: "category"
                    },
                    {
                        id: "date",
                        name: "Date",
                        type: "date",
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
                    name: "bam",
                    path: "genomes",
                    sample: "hg3333",
                    format: "VCF,BCF,GVCF,BIGWIG",
                    bioformat: "ALIGNMENT",
                    creationDate: ">=20200216"
                }
            }
        ],
        result: {
            grid: {}
        },
        detail: [
            {
                id: "file-view",
                title: "Details",
                active: true
            },
            {
                id: "file-preview",
                title: "Preview"
            }
        ]
    },
    aggregation: {
        default: ["type", "format"],
        result: {
            numColumns: 2
        },
        sections: [
            {
                name: "File attributes",
                // collapsed: false,
                fields: [
                    {
                        id: "study",
                        name: "study",
                        type: "string",
                        description: "Study [[user@]project:]study where study and project can be either the ID or UUID"
                    },
                    {
                        id: "name",
                        name: "name",
                        type: "string",
                        description: "Name"
                    },
                    {
                        id: "type",
                        name: "type",
                        type: "string",
                        description: "Type"
                    },
                    {
                        id: "format",
                        name: "Format",
                        type: "category",
                        allowedValues: ["VCF", "BCF", "GVCF", "TBI", "BIGWIG", "SAM", "BAM", "BAI", "CRAM", "CRAI", "FASTQ", "FASTA", "PED", "TAB_SEPARATED_VALUES", "COMMA_SEPARATED_VALUES", "XML", "PROTOCOL_BUFFER", "JSON", "AVRO", "PARQUET", "IMAGE", "PLAIN", "BINARY", "EXECUTABLE", "GZIP", "NONE", "UNKNOWN"],
                        placeholder: "genomes/resources/files/...",
                        description: ""
                    },
                    {
                        id: "bioformat",
                        name: "bioformat",
                        type: "string",
                        description: "Bioformat"
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
                        id: "release",
                        name: "release",
                        type: "string",
                        description: "Release"
                    },
                    {
                        id: "external",
                        name: "external",
                        type: "category",
                        allowedValues: ["true", "false"],
                        defaultValue: "false",
                        description: "External"
                    },
                    {
                        id: "size",
                        name: "size",
                        type: "string",
                        description: "Size"
                    },
                    {
                        id: "software",
                        name: "software",
                        type: "string",
                        description: "Software"
                    },
                    {
                        id: "experiment",
                        name: "experiment",
                        type: "string",
                        description: "Experiment"
                    },
                    {
                        id: "numSamples",
                        name: "numSamples",
                        type: "string",
                        description: "Number of samples"
                    },
                    {
                        id: "numRelatedFiles",
                        name: "numRelatedFiles",
                        type: "string",
                        description: "Number of related files"
                    },
                    {
                        id: "annotation",
                        name: "annotation",
                        type: "string",
                        description: "Annotation, e.g: key1=value(,key2=value)"
                    }
                ]
            },
            {
                name: "Advanced",
                fields: [
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
