const variantInterpreterSettings = {
    tools: [
        {
            id: "select"
        },
        {
            id: "qc",
            tabs: ["overview", "sampleVariantStats", /* "cancerQCPlots",*/ "somaticVariantStats", "germlineVariantStats"],
            // both cancer and family tabs
            overviewTabs: ["Summary", /* "VariantStats",*/ "SamtoolsPlots", /* "Alignment",*/ "InferredSex", "MendelianErrors", "Relatedness", /* "AlignmentStats",*/ "GenomicContext"]
        },
        /* {
            id: "methods"
        },*/
        {
            id: "variant-browser"
        }
        /* {
            id: "review"
        },
        {
            id: "report"
        }*/
    ]
};
