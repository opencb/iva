/*
 * Copyright 2015-2016 OpenCB
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

const cellbase = {
    hosts: ["https://bioinfo.hpc.cam.ac.uk/cellbase"],
    version: "v4"
};

const opencga = {
    // host: "http://localhost:8080/opencga-test",
    //host: "http://re-prod-opencgahadoop-tomcat-01.gel.zone:8080/opencga-test-1.4.2",
    //host: "https://bio-uat-opencgainternal.gel.zone/opencga/webservices/",
    //host: "http://bioinfo.hpc.cam.ac.uk/hgva", // public instance
    // host: "http://bioinfo.hpc.cam.ac.uk/opencga-demo", //small demo instance

    //host: "http://51.104.252.173:8080/opencga", //opencga 2 demo:demo
    //host: "https://re-preprod-opencgahadoop.gel.zone/opencga", //opencga 1.4
    // host: "http://bioinfo.hpc.cam.ac.uk/hgva", public instance
    host: "http://bioinfo.hpc.cam.ac.uk/opencga-demo", //small demo instance
    // host: "https://re-preprod-opencgahadoop.gel.zone/opencga", //opencga 1.4
    //host: "https://re-test-opencgahadoop.gel.zone/opencga", //opencga 1.3
    // host: "http://bioinfodev.hpc.cam.ac.uk/web-apps/opencga-test", //TODO test for varianti interpretation "disorder" field missing

    version: "v1",
    serverVersion: "1.4",

    // This forces the following projects to be used instead of the user's project
    // projects: [
    //     {
    //         id: "platinum",
    //         name: "Platinum",
    //         alias: "platinum",
    //         organism: {
    //             scientificName: "Homo sapiens",
    //             assembly: "GRCh37"
    //         },
    //         studies : [
    //             {
    //                 id: "illumina_platinum",
    //                 name: "Illumina Platinum",
    //                 alias: "illumina_platinum"
    //             }
    //         ]
    //     }
    // ],

    // This allows IVA to query a OpenCGA instance being an 'anonymous' user, this means that no login is required.
    // If 'projects' is empty then all public projects and studies of 'user' will be used.
    // anonymous: {
    //     // user: "hgvauser",
    //     projects: [
    //         {
    //             id: "platinum",
    //             name: "Platinum",
    //             alias: "platinum",
    //             organism: {
    //                 scientificName: "Homo sapiens",
    //                 assembly: "GRCh37"
    //             },
    //             studies : [
    //                 {
    //                     id: "illumina_platinum",
    //                     name: "Illumina Platinum",
    //                     alias: "illumina_platinum"
    //                 }
    //             ]
    //         }
    //     ]
    // },
    summary: true,
    cookie: {
        prefix: "iva"
    }
};

const application = {
    title: "IVA",
    version: "v2.0.0-dev",
    logo: "img/opencb-logo.png",
    // The order, title and nested submenus are respected
    menu: [
        {
            id: "browser",
            title: "Variant Browser",
            visibility: "public"
        },
        {
            id: "facet",
            title: "Aggregation Stats",
            visibility: "public"
        },
        {
            id: "clinicalAnalysisPortal",
            title: "Interpretation Portal",
            visibility: "public"
        },
        {
            id: "beacon",
            title: "Beacon",
            visibility: "public"
        },
        {
            id: "case",
            title: "Clinical",
            visibility: "none",
            submenu: [
                {
                    id: "clinical",
                    title: "Clinical (Old)",
                    visibility: "public"
                }
            ]
        },
        {
            id: "genomeBrowser",
            title: "Genome Browser",
            visibility: "private"
        },
        {
            id: "analysis",
            title: "Analysis (Pending)",
            visibility: "private",
            submenu: [
                {
                    title: "Summary Stats",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "stats",
                    title: "Cohort Variant Stats",
                    visibility: "public"
                },
                {
                    id: "ibs",
                    title: "IBS/IBD",
                    visibility: "public"
                },
                {
                    id: "h-w",
                    title: "Hardy-Weinberg",
                    visibility: "public"
                },
                {
                    id: "mendel",
                    title: "Mendel Errors",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "GWAS",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "assoc",
                    title: "Association",
                    visibility: "public"
                },
                {
                    id: "tdt",
                    title: "Family-based Association (TDT)",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Clinical Interpretation Analysis",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "interpretation",
                    title: "Variant Interpreter",
                    visibility: "public"
                },
                {
                    id: "tiering",
                    title: "OpenCGA Tiering (Based on GEL Tiering)",
                    visibility: "public"
                },
                {
                    id: "team",
                    title: "TEAM",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Other",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "compound",
                    title: "Compound Heterozygous",
                    visibility: "public"
                },
                {
                    id: "sampleFacet",
                    title: "Aggregation Stats",
                    visibility: "public"
                },
                {
                    id: "exporter",
                    title: "Exporter",
                    visibility: "public"
                }
            ]
        },
        {
            id: "catalog",
            title: "Catalog Metadata",
            visibility: "public",
            submenu: [
                {
                    id: "projects",
                    title: "Projects",
                    visibility: "public"
                },
                {
                    id: "sample",
                    title: "Sample View",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Browsers",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "files",
                    title: "File Browser",
                    visibility: "public"
                },
                {
                    id: "files-facet",
                    title: "File Facet",
                    visibility: "public"
                },
                {
                    id: "samples",
                    title: "Sample Browser",
                    visibility: "public"
                },
                {
                    id: "samples-facet",
                    title: "Sample Facet",
                    visibility: "public"
                },
                {
                    id: "individuals",
                    title: "Individual Browser",
                    visibility: "public"
                },
                {
                    id: "individual-facet",
                    title: "Individual Facet",
                    visibility: "public"
                },
                {
                    id: "families",
                    title: "Family Browser",
                    visibility: "public"
                },
                {
                    id: "family-facet",
                    title: "Family Facet",
                    visibility: "public"
                },
                {
                    id: "cohorts",
                    title: "Cohort Browser",
                    visibility: "public"
                },
                {
                    id: "cohort-facet",
                    title: "Cohort Facet",
                    visibility: "public"
                },
                {
                    id: "clinicalAnalysis",
                    title: "Clinical Analysis Browser",
                    visibility: "public"
                }
            ]
        }
    ],
    search: {
        placeholder: "Search",
        visible: true
    },
    settings: {
        visible: false
    },
    about: {
        dropdown: true,
        links: [
            {id: "code", name: "Source code", url: "https://github.com/opencb/iva", icon: "fa fa-code"},
            {id: "documentation", name: "Documentation", url: "http://docs.opencb.org/display/iva", icon: "fa fa-book"},
            {id: "tutorial", name: "Tutorial", url: "http://docs.opencb.org/display/iva/Tutorials", icon: "fa fa-question-circle"},
            {id: "releases", name: "Releases", url: "https://github.com/opencb/iva/releases", icon: "fa fa-archive"},
            {id: "about", name: "About", url: "#about", icon: "fa fa-info-circle"},
            {id: "terms", name: "Terms", url: "#terms", icon: "fa fa-file-alt"},
            {id: "contact", name: "Contact", url: "#contact", icon: "fa fa-envelope"},
            {id: "faq", name: "FAQ", url: "#faq", icon: "fa fa-question"}
        ]
    },
    login: {
        visible: true
    },
    breadcrumb: {
        title: "Projects",
        visible: true
    },
    notifyEventMessage: "notifymessage",
    session: {
        // 60000 ms = 1 min
        checkTime: 60000,
        // 60000 ms = 1 min
        minRemainingTime: 60000,
        // 600000 ms = 10 min = 1000(1sec) * 60(60 sec = 1min) * 10(10 min)
        maxRemainingTime: 600000
    },
    // Components in the getting_started page
    // NOTE the first 4 tools are going to be shown in the landing page as well
    components: [
        {
            id: "browser",
            title: "Variant Browser",
            visibility: "public",
            thumbnail: "screenshot1.png",
            fa_icon: "fa fa-list",
            icon: "variant_browser.svg",
            description: `
                <p>Explore all variants identified by the 100,000 Genomes Project</p>
                <ul>
                    <li>Rich annotation and links to leading reference databases</li>
                    <li>Filter by gene, consequence, frequency and much more</li>
                </ul>`
        },
        {
            id: "facet",
            title: "Aggregation Stats",
            visibility: "public",
            thumbnail: "screenshot2.png",
            fa_icon: "fa fa-chart-bar",
            icon: "aggregation2.svg",
            description: `
                    <ul>
                        <li>Filter by gene, consequence, frequency and much more</li>
                        <li>Add nested facets to generate aggregate statistics</li>
                    </ul>
                </p>`
        },
        {
            id: "clinicalAnalysisPortal",
            title: "Interpretation portal",
            visibility: "public",
            thumbnail: "screenshot3.png",
            fa_icon: "fa fa-user-md",
            icon: "interpretation_portal.svg",
            description: `
                <ul>
                    <li>Analyse the genomes of participants in the 100,000 Genomes Project</li>
                    <li>Filter by gene, consequence, frequency and much more</li>
                </ul>                
            `
        },
        {
            id: "beacon",
            title: "GA4GH Beacon",
            visibility: "public",
            thumbnail: "screenshot3.png",
            fa_icon: "fa fa-globe-europe",
            icon: "beacon.svg",
            description: `
                <ul>
                    <li>Federated search from the Global Alliance for Genomics and Health</li>
                    <li>Find databases that have information about specific variants</li>
                </ul>`
        }
        /* {
             id:"genomeBrowser",
             title:"Genome Browser",
             visibility: "none",
             thumbnail:"screenshot3.png",
             fa_icon:"fa fa-globe-europe",
             icon:"genome_browser.svg",
             description:`
                 <ul>
                     <li>Based on Genome Maps (http://genomemaps.org)</li>
                     <li>Smooth, interactive variant visualisation</li>
                 </ul>`,
         },*/
        /* {
            id:"###",
            title:"Catalog Metadata",
            visibility: "none",
            thumbnail:"screenshot3.png",
            fa_icon:"fa fa-globe-europe",
            icon:"genome_browser.svg",
            description:`
                <ul>
                    <li>Browse, aggregate and compare clinical metadata</li>
                    <li>Browse by sample, individual, family or cohort</li>
                </ul>`,
        }*/

    ]
};

const sampleBrowser = {
    title: "Sample Browser",
    showTitle: true,
    filter: {

    },
    grid: {
        showSelect: true
    }
};

const fileBrowser = {
    title: "File Browser",
    showTitle: true,
    filter: {

    },
    grid: {
        showSelect: true
    }
};


const cohortBrowser = {
    title: "Cohort Browser",
    showTitle: true,
    filter: {

    },
    grid: {
        showSelect: true
    }
};

const beacon = {
    hosts: [
        "brca-exchange", "cell_lines", "cosmic", "wtsi", "wgs", "ncbi", "ebi", "ega", "broad", "gigascience",
        "ucsc", "lovd", "hgmd", "icgc", "sahgp"
    ]
};

const populationFrequencies = {
    // This is based on this figure:
    // http://www.dialogues-cns.com/wp-content/uploads/2015/03/DialoguesClinNeurosci-17-69-g001.jpg
    color: {
        veryRare: "#ff0000",
        rare: "#ff8080",
        average: "#8080ff",
        common: "#0000ff",
        unobserved: "black"
    },
    tooltip: `<strong>1000 Genomes</strong> Only considers variants whose observed allelic frequency in the 1000 genomes phase 3 database 
                is below (or above) the defined value. Genome-wide allelic frequencies were obtained from more than 2.500 genomes.<br><br>
              <strong>gnomAD Genomes</strong> Only considers variants whose observed allelic frequency in the gnomAD Genomes database is 
                below (or above) the defined value. Frequencies were calculated from about 15,000 unrelated individuals`,
    studies: [
        {
            id: "1kG_phase3",
            title: "1000 Genomes",
            // tooltip: "Only considers variants whose observed allelic frequency in the 1000 genomes phase 3 database is below (or above) " +
            //     "the defined value. Genome-wide allelic frequencies were obtained from more than 2.500 genomes.",
            populations: [
                {
                    id: "ALL", title: "All populations [ALL]"
                },
                {
                    id: "AFR", title: "African [AFR]"
                },
                {
                    id: "AMR", title: "American [AMR]"
                },
                {
                    id: "EAS", title: "East Asian [EAS]"
                },
                {
                    id: "EUR", title: "European [EUR]"
                },
                {
                    id: "SAS", title: "South Asian [SAS]"
                }
            ]
        },
        {
            id: "GNOMAD_GENOMES",
            title: "gnomAD Genomes",
            // tooltip: "Only considers variants whose observed allelic frequency in the gnomAD Genomes database is below (or above) the " +
            //     "defined value. Frequencies were calculated from about 15,000 unrelated individuals.",
            populations: [
                {
                    id: "ALL", title: "gnomAD [ALL]"
                },
                {
                    id: "AFR", title: "African/African American [AFR]"
                },
                {
                    id: "AMR", title: "American [AMR]"
                },
                {
                    id: "EAS", title: "East Asian [EAS]"
                },
                {
                    id: "FIN", title: "Finnish[FIN]"
                },
                {
                    id: "NFE", title: "Non-Finnish European [NFE]"
                },
                {
                    id: "SAS", title: "South Asian [SAS]"
                }
            ]
        }
    ]
};

const proteinSubstitutionScores = {
    // This is to show the predictions in respective colors
    sift: {
        deleterious: "red",
        tolerated: "green"
    },
    polyphen: {
        probablyDamaging: "red",
        possiblyDamaging: "darkorange",
        benign: "green",
        unknown: "black"
    }
};

const consequenceTypes = {
    // This is the impact color. It allows to customise both the impact categories and desired colors
    color: {
        high: "red",
        moderate: "darkorange",
        low: "blue",
        modifier: "green"
    },

    // Loss-of-function SO terms
    lof: ["transcript_ablation", "splice_acceptor_variant", "splice_donor_variant", "stop_gained", "frameshift_variant",
        "stop_lost", "start_lost", "transcript_amplification", "inframe_insertion", "inframe_deletion"],

    // 'Title' is optional. if there is not title provided then 'name' will be used.
    //  There are two more optional properties - 'checked' and 'impact'. They can be set to display them default in web application.
    //  Similarly 'description' is optional as well.
    categories: [
        {
            title: "Intergenic",
            terms: [
                {
                    id: "SO:0001631",
                    name: "upstream_gene_variant",
                    description: "A sequence variant located 5' of a gene",
                    impact: "modifier"
                },
                {
                    id: "SO:0001636",
                    name: "2KB_upstream_variant",
                    description: "A sequence variant located within 2KB 5' of a gene",
                    impact: "modifier"
                },
                {
                    id: "SO:0001632",
                    name: "downstream_gene_variant",
                    description: "A sequence variant located 3' of a gene",
                    impact: "modifier"
                },
                {
                    id: "SO:0002083",
                    name: "2KB_downstream_variant",
                    description: "A sequence variant located within 2KB 3' of a gene",
                    impact: "modifier"
                },
                {
                    id: "SO:0001628",
                    name: "intergenic_variant",
                    description: "A sequence variant located in the intergenic region, between genes",
                    impact: "modifier"
                }
            ]
        },
        {
            title: "Regulatory",
            terms: [
                {
                    id: "SO:0001620",
                    name: "mature_miRNA_variant",
                    description: "A transcript variant located with the sequence of the mature miRNA",
                    impact: "modifier"
                },
                // {
                //     id: "SO:0001894",
                //     name: "regulatory_region_ablation",
                //     description: "A feature ablation whereby the deleted region includes a regulatory region",
                //     impact: "moderate",
                // },
                // {
                //     id: "SO:0001891",
                //     name: "regulatory_region_amplification",
                //     description: "A feature amplification of a region containing a regulatory region",
                //     impact: "modifier",
                // },
                {
                    id: "SO:0001566",
                    name: "regulatory_region_variant",
                    description: "A sequence variant located within a regulatory region",
                    impact: "modifier"
                },
                {
                    id: "SO:0001782",
                    name: "TF_binding_site_variant",
                    description: "A sequence variant located within a transcription factor binding site",
                    impact: "modifier"
                }
                // {
                //     id: "SO:0001895",
                //     name: "TFBS_ablation",
                //     description: "A feature ablation whereby the deleted region includes a transcription factor binding site",
                //     impact: "modifier",
                // },
                // {
                //     id: "SO:0001892",
                //     name: "TFBS_amplification",
                //     description: "A feature amplification of a region containing a transcription factor binding site",
                //     impact: "modifier",
                // },
            ]
        },
        {
            title: "Coding",
            terms: [
                {
                    id: "SO:0001580",
                    name: "coding_sequence_variant",
                    description: "A sequence variant that changes the coding sequence",
                    impact: "modifier"
                },
                // {
                //     id: "SO:0001907",
                //     name: "feature_elongation",
                //     description: "A sequence variant that causes the extension of a genomic feature, with regard to the reference sequence",
                //     impact: "modifier",
                // },
                {
                    id: "SO:0001906",
                    name: "feature_truncation",
                    description: "A sequence variant that causes the reduction of a genomic feature, with regard to the reference sequence",
                    impact: "modifier"
                },
                {
                    id: "SO:0001589",
                    name: "frameshift_variant",
                    description: "A sequence variant which causes a disruption of the translational reading frame, because the number of nucleotides inserted or deleted is not a multiple of three",
                    impact: "high"
                },
                {
                    id: "SO:0001626",
                    name: "incomplete_terminal_codon_variant",
                    description: "A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed",
                    impact: "low"
                },
                {
                    id: "SO:0001822",
                    name: "inframe_deletion",
                    description: "An inframe non synonymous variant that deletes bases from the coding sequence",
                    impact: "high"
                },
                {
                    id: "SO:0001821",
                    name: "inframe_insertion",
                    description: "An inframe non synonymous variant that inserts bases into in the coding sequence",
                    impact: "high"
                },
                {
                    id: "SO:0001650",
                    name: "inframe_variant",
                    description: "A sequence variant which does not cause a disruption of the translational reading frame",
                    impact: "low"
                },
                {
                    id: "SO:0001582",
                    name: "initiator_codon_variant",
                    description: "A codon variant that changes at least one base of the first codon of a transcript",
                    impact: "moderate"
                },
                {
                    id: "SO:0001583",
                    name: "missense_variant",
                    description: "A sequence variant, that changes one or more bases, resulting in a different amino acid sequence but where the length is preserved",
                    impact: "moderate"
                },
                {
                    id: "SO:0001621",
                    name: "NMD_transcript_variant",
                    description: "A variant in a transcript that is the target of NMD",
                    impact: "modifier"
                },
                // {
                //     id: "SO:0001818",
                //     name: "protein_altering_variant",
                //     description: "A sequence_variant which is predicted to change the protein encoded in the coding sequence",
                //     impact: "moderate",
                // },
                {
                    id: "SO:0001819",
                    name: "synonymous_variant",
                    description: "A sequence variant where there is no resulting change to the encoded amino acid",
                    impact: "low"
                },
                {
                    id: "SO:0002012",
                    name: "start_lost",
                    description: "A codon variant that changes at least one base of the canonical start codon",
                    impact: "high"
                },
                {
                    id: "SO:0001587",
                    name: "stop_gained",
                    description: "A sequence variant whereby at least one base of a codon is changed, resulting in a premature stop codon, leading to a shortened transcript",
                    impact: "high"
                },
                {
                    id: "SO:0001578",
                    name: "stop_lost",
                    description: "A sequence variant where at least one base of the terminator codon (stop) is changed, resulting in an elongated transcript",
                    impact: "high"
                },
                {
                    id: "SO:0001567",
                    name: "stop_retained_variant",
                    description: "A sequence variant where at least one base in the terminator codon is changed, but the terminator remains",
                    impact: "low"
                },
                {
                    id: "SO:0001590",
                    name: "terminator_codon_variant",
                    description: "A sequence variant whereby at least one of the bases in the terminator codon is changed",
                    impact: "low"
                }
            ]
        },
        {
            title: "Non-coding",
            terms: [
                {
                    id: "SO:0001624",
                    name: "3_prime_UTR_variant",
                    description: "A UTR variant of the 3' UTR",
                    impact: "modifier"
                },
                {
                    id: "SO:0001623",
                    name: "5_prime_UTR_variant",
                    description: "A UTR variant of the 5' UTR",
                    impact: "modifier"
                },
                {
                    id: "SO:0001627",
                    name: "intron_variant",
                    description: "A transcript variant occurring within an intron",
                    impact: "modifier"
                },
                {
                    id: "SO:0001792",
                    name: "non_coding_transcript_exon_variant",
                    description: "A sequence variant that changes non-coding exon sequence in a non-coding transcript",
                    impact: "modifier"
                },
                {
                    id: "SO:0001619",
                    name: "non_coding_transcript_variant",
                    description: "A transcript variant of a non coding RNA gene",
                    impact: "modifier"
                }
            ]
        },
        {
            title: "Splice",
            terms: [
                {
                    id: "SO:0001574",
                    name: "splice_acceptor_variant",
                    description: "A splice variant that changes the 2 base region at the 3' end of an intron",
                    impact: "high"
                },
                {
                    id: "SO:0001575",
                    name: "splice_donor_variant",
                    description: "A splice variant that changes the 2 base pair region at the 5' end of an intron",
                    impact: "high"
                },
                {
                    id: "SO:0001630",
                    name: "splice_region_variant",
                    description: "A sequence variant in which a change has occurred within the region of the splice site, either " +
                        "within 1-3 bases of the exon or 3-8 bases of the intron",
                    impact: "low"
                }
            ]
        },
        {
            id: "SO:0001893",
            name: "transcript_ablation",
            description: "A feature ablation whereby the deleted region includes a transcript feature",
            impact: "high"
        },
        {
            id: "SO:0001889",
            name: "transcript_amplification",
            description: "A feature amplification of a region containing a transcript",
            impact: "high"
        }
    ]
};

// const DEFAULT_SPECIES = {
//     vertebrates: [
//         {
//
//             id: "hsapiens",
//             scientificName: "Homo sapiens",
//             assembly: {
//
//                 name: "GRCh37",
//                 ensemblVersion: "75_37",
//
//             },
//             assemblies: [
//                 {
//
//                     name: "GRCh37",
//                     ensemblVersion: "75_37",
//
//                 },
//                 {
//                     name: "GRCh38",
//                     ensemblVersion: "79_38",
//                 },
//             ],
//             data: [
//                 "genome",
//                 "gene",
//                 "variation",
//                 "regulation",
//                 "protein",
//                 "conservation",
//                 "clinical",
//                 "gene2disease",
//             ],
//         },
//     ],
// };
