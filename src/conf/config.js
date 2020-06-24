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
    // host: "http://51.104.239.205/opencga", // public instance
    host: "http://bioinfo.hpc.cam.ac.uk/opencga-prod",
    version: "v2",
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
    // summary: true,
    cookie: {
        prefix: "iva"
    }
};

const application = {
    title: "IVA",
    version: "v2.0.0-beta",
    logo: "img/iva.svg",
    defaultStudy: "family:corpasome",
    // defaultStudy: "reference_grch37_test:test",
    // The order, title and nested submenus are respected
    menu: [
        {
            id: "browser",
            title: "Variant Browser",
            description: "",
            icon: "variant_browser.svg",
            visibility: "public",
            submenu: [
                {
                    id: "browser",
                    title: "Variant Browser",
                    acronym: "VB",
                    description: `
                            <p>Explore all variants identified by the 100,000 Genomes Project</p>
                            <ul>
                                <li>Rich annotation and links to leading reference databases</li>
                                <li>Filter by gene, consequence, frequency and much more</li>
                            </ul>`,
                    visibility: "public",
                    thumbnail: "screenshot1.png",
                    fa_icon: "fa fa-list",
                    icon: "variant_browser.svg"
                },
                // {
                //     id: "genomeBrowser",
                //     title: "Genome Browser",
                //     acronym: "GB",
                //     description: `<ul>
                //                     <li>Based on Genome Maps (http://genomemaps.org)</li>
                //                     <li>Smooth, interactive variant visualisation</li>
                //                     </ul>`,
                //     visibility: "private",
                //     thumbnail: "screenshot3.png",
                //     fa_icon: "fa fa-globe-europe",
                //     icon: "genome_browser.svg"
                //
                // },
            ]
        },
        {
            id: "analysis",
            title: "Variant Analysis",
            description: "",
            icon: "aggregation.svg",
            visibility: "public",
            submenu: [
                {
                    title: "Summary Stats",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "cohort-variant-stats",
                    title: "Cohort Variant Stats",
                    acronym: "CS",
                    description: "",
                    icon: "",
                    visibility: "public",
                    // disabled: true
                },
                // {
                //     id: "ibs",
                //     title: "IBS/IBD",
                //     acronym: "IBS",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                {
                    id: "sample-variant-stats",
                    title: "Sample Variant Stats",
                    acronym: "SVS",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "hw", title: "Hardy-Weinberg", acronym: "HW",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Association Analysis",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "gwas",
                    title: "Genome-Wide Association Study (GWAS)",
                    acronym: "GWAS",
                    description: "Study of a genome-wide set of genetic variants in different individuals to see if any variant is associated with a trait",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "tdt",
                    title: "Family-Based Association (TDT)",
                    acronym: "TDT",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Sample Analysis",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "knockout",
                    title: "Knockout Analysis",
                    acronym: "KO",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "sample-eligibility",
                    title: "Eligibility Analysis",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "sampleFacet",
                    title: "Phenotype-Genotype Sample Analysis",
                    acronym: "PhG",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "compound",
                    title: "Compound Heterozygous",
                    acronym: "CH",
                    description: "",
                    icon: "aggregation.svg",
                    visibility: "public"
                },
                {
                    id: "mendel",
                    title: "Mendelian Errors",
                    acronym: "ME",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "inferred-sex",
                    title: "Inferred Sex",
                    acronym: "IS",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Cancer Analysis",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "mutational-signature",
                    title: "Mutational Signature",
                    acronym: "SG",
                    description: "",
                    icon: "aggregation.svg",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Clinical Interpretation",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "rd-tiering",
                    title: "RD Tiering",
                    acronym: "RDT",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                // {
                //     id: "team",
                //     title: "TEAM",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "zetta",
                //     title: "Zetta",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "cancer-tiering",
                //     title: "OpenCGA Cancer Tiering (Based on GEL algorithm)",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
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
                    id: "exporter",
                    title: "Exporter",
                    acronym: "EX",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "beacon",
                    title: "GA4GH Beacon",
                    description: "",
                    icon: "beacon.svg",
                    visibility: "public"
                }
            ]
        },
        {
            id: "clinical",
            title: "Clinical Analysis",
            description: "",
            icon: "interpretation_portal.svg",
            visibility: "public",
            submenu: [
                {
                    title: "Clinical Management",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "clinicalAnalysisPortal",
                    title: "Interpretation Portal",
                    acronym: "",
                    icon: "",
                    description: "",
                    visibility: "public"
                },
                {
                    id: "clinical-analysis-writer",
                    title: "Create Case",
                    acronym: "",
                    icon: "",
                    description: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Interpretation",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "interpreter",
                    title: "Variant Interpreter",
                    acronym: "",
                    icon: "",
                    description: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Reported Variants",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "cva",
                    title: "Clinical Variant Browser",
                    acronym: "CVB",
                    description: "",
                    icon: "",
                    visibility: "public"
                }
            ]
        },
        {
            id: "alignment",
            title: "Alignment",
            description: "",
            icon: "alignment.svg",
            visibility: "public",
            submenu: [
                {
                    title: "Data Management",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "alignment-index",
                    title: "Alignment Index",
                    description: "Create a .bai index file.",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "coverage-index",
                    title: "Coverage Index",
                    description: "Precompute coverage in a BigWig file",
                    icon: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Summary Stats",
                    category: true,
                    visibility: "public"
                },
                {
                    id: "alignment-stats",
                    title: "Alignment Stats",
                    description: "Compute BAM stats using samtools",
                    icon: "",
                    visibility: "public"
                },
            ]
        },
        {
            id: "catalog",
            title: "Catalog",
            visibility: "public",
            icon: "aggregation2.svg",
            submenu: [
                {
                    id: "projects",
                    title: "Projects",
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
                    id: "samples",
                    title: "Sample Browser",
                    visibility: "public"
                },
                {
                    id: "individuals",
                    title: "Individual Browser",
                    visibility: "public"
                },
                {
                    id: "families",
                    title: "Family Browser",
                    visibility: "public"
                },
                {
                    id: "cohorts",
                    title: "Cohort Browser",
                    visibility: "public"
                },
                {
                    id: "clinicalAnalysis",
                    title: "Clinical Analysis Browser",
                    visibility: "public"
                },
                {
                    id: "jobs",
                    title: "Job Browser",
                    visibility: "public"
                }
            ]
        },
    ],
    search: {
        placeholder: "Search",
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
    // Components in the welcome page
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
    ]
};

//export {application, beacon, cellbase, consequenceTypes, opencga, populationFrequencies, proteinSubstitutionScores}
