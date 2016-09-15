/*
 * Copyright 2015 OpenCB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cellbase = {
    hosts: ["bioinfodev.hpc.cam.ac.uk/cellbase-4.5.0-beta"],
    version: "v4"
};

var opencga = {
    host: "bioinfodev.hpc.cam.ac.uk/hgva",
    version: "v1",
    // user:  Useful scenario is user@project:study
    projects: [
        {
            name: "ProjectA",
            alias: "proj_a",
            studies : [
                {
                    name: "Study1",
                    alias: "s_1"
                }
            ]
        }
    ],
    cookies: {
        userName: "opencga_userId",
        sessionId: "opencga_sId"
    }
};


var application = {
    title: "IVA",
    version: "v0.2.0",
    logo: "images/opencb-logo.png",
    menu: [
        {
            id: "browser",
            title: "Variant Browser",
            visibility: "private"
        },
        {
            id: "prioritization",
            title: "Prioritization",
            visibility: "private",
            submenu: [
                {
                    id: "family-prioritization",
                    title: "Family",
                    visibility: "private"
                },
                {
                    id: "cancer-prioritization",
                    title: "Cancer",
                    visibility: "private"
                },
                {
                    separator: true,
                    visibility: "private"
                },
                {
                    id: "prioritizationCC",
                    title: "Case-Control",
                    visibility: "private"
                }
            ]
        },
        {
            id: "diagnose",
            title: "Diagnose",
            visibility: "public",
            submenu: [
                {
                    id: "diagnose:sample",
                    title: "Sample",
                    visibility: "public"
                },
                {
                    id: "diagnose:family",
                    title: "Family",
                    visibility: "public"
                }
            ]
        },
        {
            id: "beacon",
            title: "Beacon",
            visibility: "public"
        },
        {
            id: "analysis",
            title: "Analysis",
            visibility: "public",
            submenu: [
                {
                    id: "ibs",
                    title: "IBS",
                    visibility: "public"
                },
                {
                    id: "burden",
                    title: "Burden Test",
                    visibility: "public"
                }]
        },
        {
            id: "tools",
            title: "Tools",
            visibility: "public",
            submenu: [
                {
                    id: "genomeBrowser",
                    title: "Genome Browser",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    id: "exporter",
                    title: "Exporter",
                    visibility: "public"
                },
                {
                    id: "saturation",
                    title: "Saturation",
                    visibility: "public"
                }
            ]
        }
    ],
    search: {
        placeholder: "eg. BRCA2",
        visibility: "public"
    },
    settings: {
        visibility: "public"
    },
    about: [
        {"name": "Documentation",  "url": "https://github.com/babelomics/bierapp/wiki", "icon": "fa fa-book"},
        {"name": "Tutorial", "url": "https://github.com/babelomics/bierapp/wiki/Tutorial", "icon": ""},
        {"name": "Source code", "url": "https://github.com/babelomics/bierapp", "icon": "fa fa-github"},
        {"name": "Contact",  "url": "", "icon": "fa fa-envelope"},
        {"name": "FAQ",  "url": "", "icon": ""}
    ],
    breadcrumb: {
        title: "Projects",
        visibility: "public"
    }
};

var populationFrequencies = [
    {
        id: "1000GENOMES_phase_3",
        title: "1000 Genomes (Phase 3)",
        populations: [
            {
                id: "ALL",
                title: "All populations [ALL]",
                active: true
            },
            {
                id: "EUR",
                title: "European [EUR]",
                active: true
            },
            {
                id: "AMR",
                title: "American [AMR]"
            },
            {
                id: "AFR",
                title: "African [AFR]"
            },
            {
                id: "SAS",
                title: "South Asian [SAS]"
            },
            {
                id: "EAS",
                title: "East Asian [EAS]"
            }
        ]
    },
    {
        id: "EXAC",
        title: "ExAC",
        populations: [
            {
                id: "ALL",
                title: "ExAC",
                active: true
            }
        ]
    },
    {
        id: "ESP_6500",
        title: "ESP 6500",
        populations: [
            {
                id: "EUR",
                title: "European American",
                active: true
            },
            {
                id: "AFR",
                title: "African American",
                active: true
            }
        ]
    }
];


/* 'Title' is optional. if there is no title provided then 'name' is going to be used.
There are two more optional properties - 'checked' and 'color'. They can be set to display them default in web application.
Similarly 'description' is optional as well.
*/
var consequenceTypes = [
    {
        id: "",
        name: "",
        title: "Intergenic",
        description: "",
        // color: "#00FFCC",
        items: [
            {
                id: "SO:0001636",
                name: "2KB_upstream_variant",
                title: "2KB upstream variant",
                description: "A sequence variant located within 2KB 5' of a gene"
                // checked: true
            },
            {
                id: "SO:0001632",
                name: "downstream_gene_variant",
                description: "A sequence variant located 3' of a gene"
            },
            {
                id: "SO:0001628",
                name: "intergenic_variant",
                description: "A sequence variant located in the intergenic region, between genes"
            },
            {
                id: "SO:0001631",
                name: "upstream_gene_variant",
                description: "A sequence variant located 5' of a gene"
            }
        ]
    },
    {
        title: "Regulatory",
        items: [
            {
                id: "SO:0001620",
                name: "mature_miRNA_variant",
                description: "A transcript variant located with the sequence of the mature miRNA"
            },
            {
                id: "SO:0001894",
                name: "regulatory_region_ablation",
                description: "A feature ablation whereby the deleted region includes a regulatory region"
            },
            {
                id: "SO:0001891",
                name: "regulatory_region_amplification",
                description: "A feature amplification of a region containing a regulatory region"
            },
            {
                id: "SO:0001566",
                name: "regulatory_region_variant",
                description: "A sequence variant located within a regulatory region"
            },
            {
                id: "SO:0001782",
                name: "TF_binding_site_variant",
                description: "A sequence variant located within a transcription factor binding site"
            },
            {
                id: "SO:0001895",
                name: "TFBS_ablation",
                description: "A feature ablation whereby the deleted region includes a transcription factor binding site"
            },
            {
                id: "SO:0001892",
                name: "TFBS_amplification",
                description: "A feature amplification of a region containing a transcription factor binding site"
            },
        ]
    },
    {
        title: "Coding",
        items: [
            {
                id: "SO:0001580",
                name: "coding_sequence_variant",
                description: "A sequence variant that changes the coding sequence"
            },
            {
                id: "SO:0001907",
                name: "feature_elongation",
                description: "A sequence variant that causes the extension of a genomic feature, with regard to the reference sequence"
            },
            {
                id: "SO:0001906",
                name: "feature_truncation",
                description: "A sequence variant that causes the reduction of a genomic feature, with regard to the reference sequence"
            },
            {
                id: "SO:0001589",
                name: "frameshift_variant",
                description: "A sequence variant which causes a disruption of the translational reading frame, because the number of nucleotides inserted or deleted is not a multiple of three"
            },
            {
                id: "SO:0001626",
                name: "incomplete_terminal_codon_variant",
                description: "A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed"
            },
            {
                id: "SO:0001822",
                name: "inframe_deletion",
                description: "An inframe non synonymous variant that deletes bases from the coding sequence"
            },
            {
                id: "SO:0001821",
                name: "inframe_insertion",
                description: "An inframe non synonymous variant that inserts bases into in the coding sequence"
            },
            {
                id: "SO:0001583",
                name: "missense_variant",
                description: "A sequence variant, that changes one or more bases, resulting in a different amino acid sequence but where the length is preserved"
            },
            {
                id: "SO:0001621",
                name: "NMD_transcript_variant",
                description: "A variant in a transcript that is the target of NMD"
            },
            {
                id: "SO:0001818",
                name: "protein_altering_variant",
                description: "A sequence_variant which is predicted to change the protein encoded in the coding sequence"
            },
            {
                id: "SO:0001819",
                name: "synonymous_variant",
                description: "A sequence variant where there is no resulting change to the encoded amino acid"
            },
            {
                id: "SO:0002012",
                name: "start_lost",
                description: "A codon variant that changes at least one base of the canonical start codon"
            },
            {
                id: "SO:0001587",
                name: "stop_gained",
                description: "A sequence variant whereby at least one base of a codon is changed, resulting in a premature stop codon, leading to a shortened transcript"
            },
            {
                id: "SO:0001578",
                name: "stop_lost",
                description: "A sequence variant where at least one base of the terminator codon (stop) is changed, resulting in an elongated transcript"
            },
            {
                id: "SO:0001567",
                name: "stop_retained_variant",
                description: "A sequence variant where at least one base in the terminator codon is changed, but the terminator remains"
            },
        ]
    },
    {
        title: "Non-coding",
        items: [
            {
                id: "SO:0001624",
                name: "3_prime_UTR_variant",
                description: "A UTR variant of the 3' UTR"
            },
            {
                id: "SO:0001623",
                name: "5_prime_UTR_variant",
                description: "A UTR variant of the 5' UTR"
            },
            {
                id: "SO:0001627",
                name: "intron_variant",
                description: "A transcript variant occurring within an intron"
            },
            {
                id: "SO:0001792",
                name: "non_coding_transcript_exon_variant",
                description: "A sequence variant that changes non-coding exon sequence in a non-coding transcript"
            }
        ]
    },
    {
        title: "Splice",
        items: [
            {
                id: "SO:0001574",
                name: "splice_acceptor_variant",
                description: "A splice variant that changes the 2 base region at the 3' end of an intron"
            },
            {
                id: "SO:0001575",
                name: "splice_donor_variant",
                description: "A splice variant that changes the 2 base pair region at the 5' end of an intron"
            },
            {
                id: "SO:0001630",
                name: "splice_region_variant",
                description: "A sequence variant in which a change has occurred within the region of the splice site, either within 1-3 bases of the exon or 3-8 bases of the intron"
            }
        ]
    },
    {
        id: "SO:0001893",
        name: "transcript_ablation",
        description: "A feature ablation whereby the deleted region includes a transcript feature"
    },
    {
        id: "SO:0001889",
        name: "transcript_amplification",
        description: "A feature amplification of a region containing a transcript"
    }
];

var DEFAULT_SPECIES = {
    "vertebrates": [
        {

            "id": "hsapiens",
            "scientificName": "Homo sapiens",
            "assembly": {

                "name": "GRCh37",
                "ensemblVersion": "75_37"

            },
            "assemblies": [

                {

                    "name": "GRCh37",
                    "ensemblVersion": "75_37"

                },

                {
                    "name": "GRCh38",
                    "ensemblVersion": "79_38"
                }

            ],
            "data": [
                "genome",
                "gene",
                "variation",
                "regulation",
                "protein",
                "conservation",
                "clinical",
                "gene2disease"
            ]

        }
    ]
};
