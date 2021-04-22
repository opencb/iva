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
    hosts: ["https://ws.opencb.org/cellbase-4.8.2"],
    version: "v4"
};

const opencga = {
    host: "https://ws.opencb.org/opencga-prod",
    // host: "http://localhost:1234/opencga",
    // host: "https://eglh.app.zettagenomics.com/opencga", // public instance
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

// FIXME Change JSorolla components to use suite.appConfig instead
const application = {
    appConfig: "opencb",
}

const suite = {
    name: "OpenCGA Suite",
    version: "v2.1.0-beta",
    logo: "img/opencb-logo.png",

    mode: "development",
    appConfig: "opencb",
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
    userMenu: [
        {id: "account", name: "Your Profile", url: "#account", icon: "fa fa-user", visibility: "private"},
        {id: "projects", name: "Projects", url: "#projects", icon: "fa fa-database", visibility: "private"},
        {id: "file-manager", name: "File Manager", url: "#file-manager", icon: "fas fa-folder-open", visibility: "private"}
        // {id: "settings", name: "Settings", url: "#settings", icon: "fas fa-cogs"}
    ],
    login: {
        visible: true
    },
    notifyEventMessage: "notifymessage",
    session: {
        checkTime: 60000,   // 1 min
        minRemainingTime: 60000,
        maxRemainingTime: 600000    // 10 min
    },
    // Components in the welcome page
    welcomePageContent: `
            <p class="text-center">
                Welcome to the OpenCB Suite for whole genome variant analysis.<br />
                This interactive tool allows finding genes affected by deleterious variants<br />that segregate along family
                pedigrees, case-controls or sporadic samples.
            </p><br>`,
    welcomePageFooter: "<p><img id=\"logo\" src=\"img/opencb-logo.png\" alt=\"opencb-logo\"/></p>",
    // gettingStartedComponents: ["browser", "clinicalAnalysisPortal"],

    // The order, title and nested submenus are respected
    apps: [
        {
            id: "iva",
            name: "Variant Analysis (IVA)",
            logo: "img/iva-black.svg",
            icon: "variant_browser.svg",
            visibility: "public",
            menu: [
                {
                    id: "browser",
                    name: "Variant Browser",
                    // fa_icon: "fa fa-list",
                    icon: "variant_browser.svg",
                    visibility: "public",
                    // submenu: [
                    //     {
                    //         id: "browser",
                    //         name: "Variant Browser",
                    //         acronym: "VB",
                    //         description: `
                    //             <p>Explore all variants</p>
                    //             <ul>
                    //                 <li>Rich annotation and links to leading reference databases</li>
                    //                 <li>Filter by gene, consequence, frequency and much more</li>
                    //             </ul>`,
                    //         visibility: "public",
                    //         // fa_icon: "fa fa-list",
                    //         icon: "variant_browser.svg",
                    //         thumbnail: "variant-browser.png"
                    //     }
                    // ]
                },
                {
                    id: "analysis",
                    name: "Variant Analysis",
                    icon: "variant_browser.svg",
                    visibility: "public",
                    submenu: [
                        {
                            id: "browser",
                            name: "Variant Browser",
                            icon: "variant_browser.svg",
                            acronym: "VB",
                            description: `
                            <p>Explore all variants identified by the 100,000 Genomes Project</p>
                            <ul>
                                <li>Rich annotation and links to leading reference databases</li>
                                <li>Filter by gene, consequence, frequency and much more</li>
                            </ul>`,
                            visibility: "public",
                            // fa_icon: "fa fa-list",
                            thumbnail: "variant-browser.png"
                        }
                    ]
                },
            ],
            fileExplorer: {
                visibility: "private"
            },
            jobMonitor: {
                visibility: "private"
            },
            // TODO This option seems to be deprecated, do we need to keep it?
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
                    {id: "faq", name: "FAQ", icon: "fa fa-question"}
                ]
            },
            userMenu: [
                {id: "account", name: "Your Profile", url: "#account", icon: "fa fa-user", visibility: "private"},
                {id: "projects", name: "Projects", url: "#projects", icon: "fa fa-database", visibility: "private"},
                {id: "projects", name: "Projects", url: "#projects", icon: "fa fa-database", visibility: "private"},
                {id: "file-manager", name: "File Manager", url: "#file-manager", icon: "fas fa-folder-open", visibility: "private"}
                // {id: "settings", name: "Settings", url: "#settings", icon: "fas fa-cogs"}
            ],
        },
        {
            id: "clinical",
            name: "Clinical (XetaBase)",
            logo: "img/tools/icons/interpretation_portal.svg",
            icon: "interpretation_portal.svg",
            visibility: "public",
            menu: [
                {
                    id: "browser",
                    name: "Users",
                    fa_icon: "fa fa-list",
                    icon: "variant_browser.svg",
                    visibility: "public",
                    submenu: [
                        {
                            id: "browser",
                            name: "Variant Browser",
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
                        }
                    ]
                },
            ],
            fileExplorer: {
                visibility: "private"
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
                    {id: "code", name: "Source code", url: "https://github.com/opencb/iva", icon: "fa fa-code"},
                    {id: "documentation", name: "Documentation", url: "http://docs.opencb.org/display/iva", icon: "fa fa-book"},
                    {id: "tutorial", name: "Tutorial", url: "http://docs.opencb.org/display/iva/Tutorials", icon: "fa fa-question-circle"},
                    {id: "releases", name: "Releases", url: "https://github.com/opencb/iva/releases", icon: "fa fa-archive"},
                    {id: "about", name: "About", url: "#about", icon: "fa fa-info-circle"},
                ]
            },
            userMenu: [
                {id: "account", name: "Your Profile", url: "#account", icon: "fa fa-user", visibility: "private"},
                {id: "projects", name: "Projects", url: "#projects", icon: "fa fa-database", visibility: "private"},
                {id: "file-manager", name: "File Manager", url: "#file-manager", icon: "fas fa-folder-open", visibility: "private"}
                // {id: "settings", name: "Settings", url: "#settings", icon: "fas fa-cogs"}
            ],
        },
        {
            id: "admin",
            name: "OpenCGA Admin",
            logo: "img/tools/icons/file_explorer.svg",
            icon: "file_explorer.svg",
            visibility: "public",
            menu: [
                {
                    id: "projects-admin",
                    name: "Project Manager",
                    fa_icon: "fas fa-file-invoice",
                    icon: "variant_browser.svg",
                    visibility: "public",
                },
                {
                    id: "study-admin",
                    name: "Study Admin",
                    fa_icon: "fas fa-file-invoice",
                    icon: "variant_browser.svg",
                    visibility: "public",
                },
                // {
                //     id: "opencga-admin",
                //     name: "Opencga Admin",
                //     fa_icon: "fas fa-user-shield",
                //     icon: "file_explorer.svg",
                //     visibility: "public",
                //     submenu: [
                //         {
                //             id: "browser",
                //             name: "Variant Browser",
                //             acronym: "VB",
                //             description: `
                //             <p>Explore all variants identified by the 100,000 Genomes Project</p>
                //             <ul>
                //                 <li>Rich annotation and links to leading reference databases</li>
                //                 <li>Filter by gene, consequence, frequency and much more</li>
                //             </ul>`,
                //             visibility: "public",
                //             fa_icon: "fa fa-list",
                //             icon: "variant_browser.svg",
                //             thumbnail: "variant-browser.png"
                //         }
                //     ]
                // },
            ],
            fileExplorer: {
                visibility: "private"
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
                    {id: "code", name: "Source code", url: "https://github.com/opencb/iva", icon: "fa fa-code"},
                    {id: "documentation", name: "Documentation", url: "http://docs.opencb.org/display/iva", icon: "fa fa-book"},
                    {id: "tutorial", name: "Tutorial", url: "http://docs.opencb.org/display/iva/Tutorials", icon: "fa fa-question-circle"},
                    {id: "releases", name: "Releases", url: "https://github.com/opencb/iva/releases", icon: "fa fa-archive"},
                    {id: "about", name: "About", url: "#about", icon: "fa fa-info-circle"},
                ]
            },
            userMenu: [
                {id: "account", name: "Your Profile", url: "#account", icon: "fa fa-user", visibility: "private"},
                {id: "projects", name: "Projects", url: "#projects", icon: "fa fa-database", visibility: "private"},
                {id: "file-manager", name: "File Manager", url: "#file-manager", icon: "fas fa-folder-open", visibility: "private"}
                // {id: "settings", name: "Settings", url: "#settings", icon: "fas fa-cogs"}
            ],
        }
    ],
    _menu: [
        {
            id: "browser",
            title: "Variant Browser",
            fa_icon: "fa fa-list",
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
                    fa_icon: "fa fa-list",
                    icon: "variant_browser.svg",
                    thumbnail: "variant-browser.png"
                }
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

                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Individual Analysis",
                    category: true,
                    id: "cat-analysis",
                    visibility: "public"
                },
                {
                    id: "inferred-sex",
                    title: "Sex Inference",
                    acronym: "SI",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "individual-relatedness",
                    title: "Relatedness",
                    acronym: "RL",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "mendelian-errors",
                    title: "Mendelian Errors",
                    acronym: "ME",
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
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "Clinical Interpretation",
                    category: true,
                    id: "cat-analysis",
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
                {
                    id: "recessive-gene",
                    title: "Recessive Gene Analysis",
                    acronym: "RG",
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
                    title: "Quality Control",
                    category: true,
                    id: "cat-analysis",
                    visibility: "public"
                },
                {
                    id: "sample-qc",
                    title: "Sample Quality Control",
                    description: "Calculate different genetic checks and metrics and store data in Sample Catalog",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "individual-qc",
                    title: "Individual Quality Control",
                    description: "Calculate different genetic checks and metrics and store data in Individual Catalog",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "family-qc",
                    title: "Family Quality Control",
                    description: "Calculate different genetic checks and metrics and store data in Family Catalog",
                    icon: "",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    title: "External Tools",
                    category: true,
                    id: "cat-analysis",
                    visibility: "public"
                },
                {
                    id: "plink",
                    title: "Plink",
                    acronym: "Pl",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
                {
                    id: "gatk",
                    title: "GATK",
                    acronym: "GT",
                    description: "",
                    icon: "",
                    visibility: "public"
                },
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
        },
        {
            id: "clinical",
            title: "Case Interpretation",
            icon: "interpretation_portal.svg",
            visibility: "public",
            submenu: [
                {
                    title: "Clinical Management",
                    category: true,
                    id: "cat-clinical",
                    visibility: "public"
                },

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
                {
                    id: "clinical-analysis-writer",
                    title: "Create Case",
                    acronym: "",
                    icon: "",
                    description: "",
                    visibility: "public"
                },
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "Clinical Analysis",
                //     category: true,
                //     id: "cat-analysis",
                //     visibility: "public"
                // },
                // {
                //     id: "rga",
                //     title: "RGA",
                //     acronym: "",
                //     icon: "",
                //     description: "",
                //     visibility: "public"
                // },
                // {
                //     separator: true,
                //     visibility: "public"
                // },
                // {
                //     title: "Case Interpretation",
                //     category: true,
                //     id: "cat-clinical",
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
                //     id: "interpreter",
                //     title: "Case Interpreter",
                //     acronym: "",
                //     icon: "",
                //     description: "",
                //     visibility: "public"
                // }
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
                    id: "cat-alignment",
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
                    id: "cat-alignment",
                    visibility: "public"
                },
                {
                    id: "alignment-stats",
                    title: "Alignment Stats",
                    description: "Compute BAM stats using samtools",
                    icon: "",
                    visibility: "public"
                }
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
                    id: "cat-catalog",
                    visibility: "public"
                },
                {
                    id: "file",
                    title: "File Browser",
                    visibility: "public"
                },
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
                },
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
                }
            ]
        }
    ],

};
