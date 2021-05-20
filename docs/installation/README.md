# Installation

{% hint style="info" %}
**Note**

**OpenCGA** is an open-source project that aims to provide a Big Data storage engine and analysis framework for genomic scale data analysis of hundreds of terabytes or even petabytes. OpenCGA provides a scalable and high-performance Storage Engine framework to index biological data such as BAM or VCF files using different NoSQL databases. A metadata Catalog has been also developed to provide authentication and ACLs and to keep track all of files and sample annotation. All these can be queried through a comprehensive RESTful web services API or using the command line interface.

To set up OpenCGA, Please go to [Installation](http://docs.opencb.org/display/opencga/Installation).

**IVA** is a generic Interactive Variant Analysis browser that can be used for the visualization of biological information from various data sources. IVA queries OpenCGA server through web services and serves as a visualization tool. 
{% endhint %}

### Bare installation

* Download the latest tar.gz package from [https://github.com/opencb/iva/releases](https://github.com/opencb/iva/releases).
* Extract the package `tar -xvf iva-[VERSION].tar.gz`
* Move the folder into the working directory of a static web server of your choice \(e.g. Apache\)

### Add IVA **into Apache HTTP Server**

IVA can be set up either by downloading **iva-\#.\#.\#.tar.gz** from every stable release of IVA which can be found in [https://github.com/opencb/iva/releases ](https://github.com/opencb/iva/releases%20) or by building it from scratch and then copying the build content into a web server like **Apache HTTP Server.**

**Step 1:** Download the Iva 

![](../.gitbook/assets/image%20%2812%29.png)

**Step 2:** `Copy or Move`the downloaded file to the server in this path `/var/www/html/` then `extract the file`

 

