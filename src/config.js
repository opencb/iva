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
    // user: "hgva",
    // projects: ["hsapiens_grch37"],
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
            visibility: "public"
        },
        {
            id: "prioritization",
            title: "Prioritization",
            visibility: "public",
            submenu: [
                {
                    id: "family-prioritization",
                    title: "Family",
                    visibility: "public"
                },
                {
                    id: "cancer-prioritization",
                    title: "Cancer",
                    visibility: "public"
                },
                {
                    separator: true,
                    visibility: "public"
                },
                {
                    id: "prioritizationCC",
                    title: "Case-Control",
                    visibility: "public"
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

var consequenceTypes = [
    {
        id: "SO:0001628",
        name: "intergenic_variant",
        title: "Intergenic",
        description: "A sequence variant located in the intergenic region, between genes",
        color: "#00FFCC",
        items: [
            {
                id: "SO:0001636",
                name: "2KB_upstream_variant",
                title: "2KB_upstream_variant",
                description: "A sequence variant located within 2KB 5' of a gene",
                checked: true
            }
        ]
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
