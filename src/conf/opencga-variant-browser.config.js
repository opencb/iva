const OpencgaVariantBrowserConfig = {
    filter: {
        title: "Filter",
        activeFilters: {
            alias: {
                // Example:
                // "region": "Region",
                // "gene": "Gene",
                "ct": "Consequence Types",
                "biotype": "Biotype",
                "alternate_frequency": "Population Frequency",
                "protein_substitution": "Protein Substitution"
            },
            complexFields: [],
            hiddenFields: []
        },
        sections: [ // sections and subsections, structure and order is respected
            {
                title: "Study and Cohorts",
                collapsed: false,
                fields: [
                    {
                        id: "study",
                        title: "Study Filter",
                        tooltip: tooltips.study
                    },
                    {
                        id: "cohort",
                        title: "Cohort Alternate Stats",
                        onlyCohortAll: true,
                        tooltip: tooltips.cohort,
                        // cohorts: this.cohorts
                        // cohorts: this.opencgaSession.project.studies
                    }
                ]
            },
            {
                title: "Genomic",
                collapsed: true,
                fields: [
                    {
                        id: "region",
                        title: "Genomic Location",
                        tooltip: tooltips.region
                    },
                    {
                        id: "feature",
                        title: "Feature IDs (gene, SNPs, ...)",
                        tooltip: tooltips.feature
                    },
                    {
                        id: "biotype",
                        title: "Gene Biotype",
                        biotypes: BIOTYPES,
                        tooltip: tooltips.biotype
                    },
                    {
                        id: "type",
                        title: "Variant Type",
                        types: ["SNV", "INDEL", "CNV", "INSERTION", "DELETION"],
                        tooltip: tooltips.type
                    }
                ]
            },
            {
                title: "Consequence Type",
                collapsed: true,
                fields: [
                    {
                        id: "consequenceTypeSelect",
                        title: "Select SO terms",
                        tooltip: tooltips.consequenceTypeSelect
                    }
                ]
            },
            {
                title: "Population Frequency",
                collapsed: true,
                fields: [
                    {
                        id: "populationFrequency",
                        title: "Select Population Frequency",
                        populationFrequencies: populationFrequencies,
                        // allowedFrequencies: "0.0001,0.0005,0.001,0.005,0.01,0.05",
                        tooltip: tooltips.populationFrequencies,
                        showSetAll: true
                    }
                ]
            },
            {
                title: "Clinical",
                collapsed: true,
                fields: [
                    {
                        id: "diseasePanels",
                        title: "Disease Panels",
                        tooltip: tooltips.diseasePanels
                    },
                    {
                        id: "clinvar",
                        title: "ClinVar Accessions",
                        tooltip: tooltips.clinvar
                    },
                    {
                        id: "fullTextSearch",
                        title: "Full-text search on HPO, ClinVar, protein domains or keywords. Some OMIM and Orphanet IDs are also supported",
                        tooltip: tooltips.fullTextSearch
                    }
                ]
            },
            {
                title: "Phenotype",
                collapsed: true,
                fields: [
                    {
                        id: "go",
                        title: "GO Accessions (max. 100 terms)",
                        tooltip: tooltips.go
                    },
                    {
                        id: "hpo",
                        title: "HPO Accessions",
                        tooltip: tooltips.hpo
                    }
                ]
            },
            {
                title: "Deleteriousness",
                collapsed: true,
                fields: [
                    {
                        id: "proteinSubstitutionScore",
                        title: "Protein Substitution Score",
                        tooltip: tooltips.proteinSubstitutionScore
                    },
                    {
                        id: "cadd",
                        title: "CADD",
                        tooltip: tooltips.cadd
                    }
                ]
            },
            {
                title: "Conservation",
                collapsed: true,
                fields: [
                    {
                        id: "conservation",
                        title: "Conservation Score",
                        tooltip: tooltips.conservation
                    }
                ]
            }
        ],
        examples: [
            {
                id: "BRCA2 missense variants",
                active: false,
                query: {
                    gene: "BRCA2",
                    ct: "missense_variant"
                }
            },
            {
                id: "Complex Example",
                query: {
                    "xref": "BRCA1,TP53",
                    "biotype": "protein_coding",
                    "type": "SNV,INDEL",
                    "ct": "lof",
                    "populationFrequencyAlt": "GNOMAD_GENOMES:ALL<0.1",
                    "protein_substitution": "sift>5,polyphen>4"
                }
            }
        ],
        result: {
            grid: {}
        },
        detail: {
            title: "Selected Variant",
            views: [
                {
                    id: "annotationSummary",
                    title: "Summary",
                    active: true
                },
                {
                    id: "annotationConsType",
                    title: "Consequence Type"
                },
                {
                    id: "annotationPropFreq",
                    title: "Population Frequencies"
                },
                {
                    id: "annotationClinical",
                    title: "Clinical"
                },
                {
                    id: "cohortStats",
                    title: "Cohort Variant Stats",
                    tooltip: tooltips.cohort
                },
                {
                    id: "samples",
                    title: "Samples"
                },
                {
                    id: "beacon",
                    title: "Beacon"
                }
            ]
        }
    },

};
