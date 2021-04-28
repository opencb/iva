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
    hosts: ["https://cellbase.gel.zone/cellbase"],
    version: "v4"
};

const opencga = {
    //host: "http://bioinfo.hpc.cam.ac.uk/opencga-prod",
    host: "http://re-uat.opencga.gel.zone/opencga",
    //host: "http://localhost:9090/opencga",
    version: "v2",
    serverVersion: "1.4",

    // This forces the following projects to be used instead of the user's project
    // projects: [
    //     {
    //         id: "100k_genomes_grch37_germline",
    //         name: "100k Genomes Project GRCh37 Germline",
    //         alias: "reopencga@100k_genomes_grch37_germline",
    //         organism: {
    //             scientificName: "Homo sapiens",
    //             assembly: "GRCh37"
    //         },
    //         studies : [
    //             {
    //                 id: "RD37",
    //                 name: "RD37",
    //                 alias: "RD37"
    //             }
    //         ]
    //     },
    //     {
    //         id: "100k_genomes_grch38_germline",
    //         name: "100k Genomes Project GRCh38 Germline",
    //         alias: "reopencga@100k_genomes_grch38_germline",
    //         organism: {
    //             scientificName: "Homo sapiens",
    //             assembly: "GRCh38"
    //         },
    //         studies : [
    //             {
    //                 id: "RD38",
    //                 name: "RD38",
    //                 alias: "RD38"
    //             }
    //         ]
    //     },
    //     {
    //         id: "100k_genomes_grch38_somatic",
    //         name: "100k Genomes Project GRCh38 Somatic",
    //         alias: "reopencga@100k_genomes_grch38_somatic",
    //         organism: {
    //             scientificName: "Homo sapiens",
    //             assembly: "GRCh38"
    //         },
    //         studies : [
    //             {
    //                 id: "CS38",
    //                 name: "CS38",
    //                 alias: "CS38"
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
    version: "v2.1.1-alpha3",
    logo: "img/iva.svg",
    companyLogo: "img/Genomics-England-logo-2015-white.png",
    mode: "development",
    appConfig: "gel",
    defaultStudy: "re-opencgahadoop@100k_genomes_grch37_germline:RD37",
    // defaultStudy: "serena@cancer37:test",
    // defaultStudy: "emee-glh@cancer:myeloid",
    // The order, title and nested submenus are respected

    menu: [
        {
            id: "browser",
            title: "Variant Browser",
            fa_icon: "fa fa-list",
            icon: "variant_browser.svg",
            visibility: "private",
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
                    fa_icon: "fa fa-list",
                    icon: "variant_browser.svg",
                    thumbnail: "variant-browser.png"
                },
                /*{
                    id: "rga",
                    title: "Recessive Variant Browser",
                    acronym: "",
                    icon: "",
                    description: "",
                    visibility: "public"
                },*/
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
        /* {
            id: "analysis",
            title: "Variant Analysis",
            description: "",
            icon: "aggregation.svg",
            visibility: "private",
            submenu: [
                {
                    title: "Summary Stats",
                    category: true,
                    id: "cat-analysis",
                    visibility: "public"
                },
                {
                    id: "sample-variant-stats",
                    title: "Sample Variant Stats",
                    acronym: "SVS",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "cohort-variant-stats",
                    title: "Cohort Variant Stats",
                    acronym: "CS",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                // {
                //     id: "hw", title: "Hardy-Weinberg", acronym: "HW",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Association Analysis",
                    category: true,
                    id: "cat-analysis",
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
                // {
                //     id: "tdt",
                //     title: "Family-Based Association (TDT)",
                //     acronym: "TDT",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Sample Analysis",
                    category: true,
                    id: "cat-analysis",
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
                    id: "knockout-result",
                    title: "Knockout Analysis result",
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
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "Individual Analysis",
                //     category: true,
                //     id: "cat-analysis",
                //     visibility: "public"
                // },
                // {
                //     id: "inferred-sex",
                //     title: "Sex Inference",
                //     acronym: "SI",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "individual-relatedness",
                //     title: "Relatedness",
                //     acronym: "RL",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "mendelian-errors",
                //     title: "Mendelian Errors",
                //     acronym: "ME",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Cancer Analysis",
                    category: true,
                    id: "cat-analysis",
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
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "Clinical Interpretation",
                //     category: true,
                //     id: "cat-analysis",
                //     visibility: "public"
                // },
                // {
                //     id: "rd-tiering",
                //     title: "RD Tiering",
                //     acronym: "RDT",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "recessive-gene",
                //     title: "Recessive Gene Analysis",
                //     acronym: "RG",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
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
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "Quality Control",
                //     category: true,
                //     id: "cat-analysis",
                //     visibility: "public"
                // },
                // {
                //     id: "sample-qc",
                //     title: "Sample Quality Control",
                //     description: "Calculate different genetic checks and metrics and store data in Sample Catalog",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "individual-qc",
                //     title: "Individual Quality Control",
                //     description: "Calculate different genetic checks and metrics and store data in Individual Catalog",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "family-qc",
                //     title: "Family Quality Control",
                //     description: "Calculate different genetic checks and metrics and store data in Family Catalog",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "External Tools",
                //     category: true,
                //     id: "cat-analysis",
                //     visibility: "public"
                // },
                // {
                //     id: "plink",
                //     title: "Plink",
                //     acronym: "Pl",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // },
                // {
                //     id: "gatk",
                //     title: "GATK",
                //     acronym: "GT",
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
                    id: "cat-analysis",
                    visibility: "public"
                },
                {
                    id: "variant-exporter",
                    title: "Variant Exporter",
                    acronym: "EX",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "variant-stats-exporter",
                    title: "Variant Stats Exporter",
                    acronym: "VSE",
                    description: "Export variant stats for different cohorts",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "beacon",
                    title: "GA4GH Beacon",
                    description: `
                        <ul>
                            <li>Federated search from the Global Alliance for Genomics and Health</li>
                            <li>Find databases that have information about specific variants</li>
                        </ul>`,
                    thumbnail: "beacon.png",
                    fa_icon: "fa fa-globe-europe",
                    icon: "beacon.svg",
                    visibility: "public"
                }
            ]
        },*/
        {
            id: "clinical",
            title: "Case Interpretation",
            icon: "interpretation_portal.svg",
            visibility: "private",
            submenu: [
                /* {
                    title: "Clinical Management",
                    category: true,
                    id: "cat-clinical",
                    visibility: "public"
                },*/
                {
                    id: "clinicalAnalysisPortal",
                    title: "Case Portal",
                    acronym: "",
                    description: `
                        <ul>
                            <li>Analyse the genomes of participants in the 100,000 Genomes Project</li>
                            <li>Filter by gene, consequence, frequency and much more</li>
                        </ul>
                    `,
                    visibility: "public",
                    fa_icon: "fa fa-user-md",
                    icon: "interpretation_portal.svg",
                    thumbnail: "interpretation_portal.png",
                },
                // {
                //     id: "clinical-analysis-writer",
                //     title: "Create Case",
                //     acronym: "",
                //     icon: "",
                //     description: "",
                //     visibility: "public"
                // },
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                /* {
                    title: "Case Interpretation",
                    category: true,
                    id: "cat-clinical",
                    visibility: "public"
                },
                {
                    id: "interpreter",
                    title: "Case Interpreter",
                    acronym: "",
                    icon: "",
                    description: "",
                    visibility: "public"
                }*/
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "Reported Variants",
                //     category: true,
                //     id: "cat-clinical",
                //     visibility: "public"
                // },
                // {
                //     id: "cva",
                //     title: "Clinical Variant Browser",
                //     acronym: "CVB",
                //     description: "",
                //     icon: "",
                //     visibility: "public"
                // }
            ]
        },
        // {
        //     id: "alignment",
        //     title: "Alignment",
        //     description: "",
        //     icon: "alignment.svg",
        //     visibility: "public",
        //     submenu: [
        //         {
        //             title: "Data Management",
        //             category: true,
        //             id: "cat-alignment",
        //             visibility: "public"
        //         },
        //         {
        //             id: "alignment-index",
        //             title: "Alignment Index",
        //             description: "Create a .bai index file.",
        //             icon: "",
        //             visibility: "public"
        //         },
        //         {
        //             id: "coverage-index",
        //             title: "Coverage Index",
        //             description: "Precompute coverage in a BigWig file",
        //             icon: "",
        //             visibility: "public"
        //         },
        //         {
        //             separator: true,
        //             visibility: "public"
        //         },
        //         {
        //             title: "Summary Stats",
        //             category: true,
        //             id: "cat-alignment",
        //             visibility: "public"
        //         },
        //         {
        //             id: "alignment-stats",
        //             title: "Alignment Stats",
        //             description: "Compute BAM stats using samtools",
        //             icon: "",
        //             visibility: "public"
        //         },
        //     ]
        // },
        {
            id: "catalog",
            title: "Catalog",
            visibility: "private",
            icon: "aggregation2.svg",
            submenu: [
                /* {
                    id: "projects",
                    title: "Projects",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },*/
                {
                    title: "Browsers",
                    category: true,
                    id: "cat-catalog",
                    visibility: "public"
                },
                /* {
                    id: "files",
                    title: "File Browser",
                    visibility: "public"
                },*/
                {
                    id: "sample",
                    title: "Sample Browser",
                    visibility: "public"
                },
                {
                    id: "individual",
                    title: "Individual Browser",
                    visibility: "public"
                },
                {
                    id: "family",
                    title: "Family Browser",
                    visibility: "public"
                }
                /* {
                    id: "cohorts",
                {
                    id: "cohort",
                    title: "Cohort Browser",
                    visibility: "public"
                },
                {
                    id: "clinicalAnalysis",
                    title: "Clinical Analysis Browser",
                    visibility: "public"
                },
                {
                    id: "job",
                    title: "Job Browser",
                    visibility: "public"
                }*/
            ]
        }
    ],
    fileExplorer: {
        visibility: "none"
    },
    jobMonitor: {
        visibility: "none"
    },
    search: {
        placeholder: "Search",
        visible: false
    },
    about: {
        dropdown: true,
        links: [
            /*{id: "code", name: "Source code", url: "https://github.com/opencb/iva", icon: "fa fa-code"},*/
            {id: "about", name: "About OpenCB", url: "http://docs.opencb.org/", icon: "fa fa-info-circle"},
            {id: "documentation", name: "Documentation", url: "https://research-help.genomicsengland.co.uk/pages/viewpage.action?pageId=38047206", icon: "fa fa-book"},
            /*{id: "tutorial", name: "Tutorial", url: "http://docs.opencb.org/display/iva/Tutorials", icon: "fa fa-question-circle"},
            {id: "releases", name: "Releases", url: "https://github.com/opencb/iva/releases", icon: "fa fa-archive"},
            {id: "terms", name: "Terms", url: "#terms", icon: "fa fa-file-alt"},
            {id: "contact", name: "Contact", url: "#contact", icon: "fa fa-envelope"},
            {id: "faq", name: "FAQ", url: "#faq", icon: "fa fa-question"}*/
        ]
    },
    userMenu: [
        {id: "account", name: "Your Profile", url: "#account", icon: "fa fa-user", visibility: "private"},
        {id: "projects", name: "Projects", url: "#projects", icon: "fa fa-database", visibility: "none"},
        {id: "file-manager", name: "File Manager", url: "#file-manager", icon: "fas fa-folder-open", visibility: "none"},
        // {id: "settings", name: "Settings", url: "#settings", icon: "fas fa-cogs"}
    ],
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
    welcomePageContent: `
        <p>
            The Interactive Variant Analysis tool (IVA) enables whole-genome variant browsing and analysis. Query across cohorts to find variants that segregate in family pedigrees, between cases and controls, or in sporadic samples. Utilise a range of filters; including population frequency, consequence type, mode of inheritance and phenotype associations. IVA and OpenCGA are part of the <a href="http://docs.opencb.org/" target="_blank">OpenCB</a> Project.
        </p>
        <p>
            The OpenCGA database currently holds all interpreted genomes that are available from the 100,000 Genomes
            Project from Genomics England. These are divided into the following studies: GRCh37 rare disease (RD37),
            GRCh38 rare disease (RD38), cancer germline GRCh38 (CG38), and cancer somatic GRCh38 (CS38).
        </p>
        <p>
            We are very keen to get user's feedback on IVA including:
        </p>
        <ul>
            <li>how IVA facilitates your research</li>
            <li>how excited you are about the additional functionality IVA brings</li>
            <li>additional functions or changes to IVA you would like us to consider</li>
            <li>any bugs or issues encountered when using IVA</li>
            <li>whether you think IVA will expand the utility of the research environment to a new user base</li>
        </ul>`,
    welcomePageFooter: "<p><img id=\"logo\" src=\"img/opencb-logo.png\" alt=\"opencb-logo\"/></p>",
    gettingStartedComponents: ["browser", "clinicalAnalysisPortal"]
};

//export {application, beacon, cellbase, consequenceTypes, opencga, populationFrequencies, proteinSubstitutionScores}
