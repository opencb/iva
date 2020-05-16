const OpencgaVariantBrowserConfig = {
    /*
    title: "Variant Browser",
    icon: "fas fa-search",
    active: false,
    filter: {
        title: "Filter",
        button: "Run",
        activeFilters: {
            alias: {
            // Example:
            // "region": "Region",
            // "gene": "Gene",
                "ct": "Consequence Types"
            },
            complexFields: ["genotype"],
            hiddenFields: []
        },
        sections: [     // sections and subsections, structure and order is respected
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
                        //cohorts: this.cohorts
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
                        id: "diseasePanels",
                        title: "Disease Panels",
                        tooltip: tooltips.diseasePanels
                    },
                    {
                        id: "biotype",
                        title: "Gene Biotype",
                        biotypes: biotypes,
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
                // {
                //     id: "consequenceType",
                //     title: "Select SO terms",
                //     tooltip: "Filter out variants falling outside the genomic features (gene, transcript, SNP, etc.) defined"
                // },
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
                        tooltip: tooltips.populationFrequencies,
                        showSetAll: true
                    }
                ]
            },
            {
                title: "Phenotype-Disease",
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
                name: "Example BRCA2",
                active: false,
                query: {
                    gene: "BRCA2",
                    ct: "missense_variant"
                }
            },
            {
                name: "Full Example",
                query: {
                    "region": "1,2,3,4,5",
                    "xref": "BRCA1,TP53",
                    "biotype": "protein_coding",
                    "type": "SNV,INDEL",
                    "ct": "lof",
                    "populationFrequencyAlt": "1kG_phase3:ALL<0.1,GNOMAD_GENOMES:ALL<0.1",
                    "protein_substitution": "sift>5,polyphen>4",
                    "conservation": "phylop>1;phastCons>2;gerp<=3"
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
                    title: "Cohort Stats",
                    //cohorts: this.cohorts
                },
                {
                    id: "samples",
                    title: "Samples"
                },
                {
                    id: "beacon",
                    // component: "variant-beacon-network",
                    title: "Beacon"
                    /!* Uncomment and edit Beacon hosts to change default hosts
                    hosts: [
                        "brca-exchange", "cell_lines", "cosmic", "wtsi", "wgs", "ncbi", "ebi", "ega", "broad", "gigascience", "ucsc",
                        "lovd", "hgmd", "icgc", "sahgp"
                    ]*!/
                },
                {
                    id: "network",
                    // component: "reactome-variant-network",
                    title: "Reactome Pathways"
                }
                /!*{
                    id: "template",
                    component: "opencga-variant-detail-template",
                    title: "Template"
                }*!/
            ]
        }
    },
    aggregation: {
        title: "Aggregation",
        default: ["chromosome", "type"],
        sections: [
            {
                name: "General",
                fields: [
                    {
                        id: "chromosome", name: "Chromosome", type: "string"
                    },
                    {
                        id: "studies", name: "Study", type: "string"
                    },
                    {
                        id: "type", name: "Variant Type", type: "category", allowedValues: ["SNV", "INDEL", "CNV"]
                    },
                    {
                        id: "genes", name: "Gene", type: "string"
                    },
                    {
                        id: "biotypes", name: "Biotype", type: "string"
                    },
                    {
                        id: "soAcc", name: "Consequence Type", type: "string"
                    }
                ]
            },
            {
                name: "Conservation & Deleteriousness",
                fields: [
                    {
                        id: "phastCons", name: "PhastCons", defaultValue: "[0..1]:0.1", type: "number"
                    },
                    {
                        id: "phylop", name: "PhyloP", defaultValue: "", type: "number"
                    },
                    {
                        id: "gerp", name: "Gerp", defaultValue: "[-12.3..6.17]:2", type: "number"
                    },
                    {
                        id: "sift", name: "Sift", defaultValue: "[0..1]:0.1", type: "number"
                    },
                    {
                        id: "polyphen", name: "Polyphen", defaultValue: "[0..1]:0.1", type: "number"
                    }
                ]
            },
            {
                name: "Population Frequency",
                fields: [
                    ...populationFrequencies.studies.map(study =>
                        study.populations.map(population => (
                            {
                                id: `popFreq__${study.id}__${population.id}`,
                                // value: `popFreq__${study.id}__${population.id}`,
                                name: `${study.id} - ${population.id}`,
                                defaultValue: "[0..1]:0.1",
                                type: "number"
                            }
                        )
                        )
                    ).flat()
                ]
            }
        ]
    }*/
};
