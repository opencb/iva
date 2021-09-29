<<<<<<< HEAD:docs/README.md
# README

## Overview

IVA is a generic Interactive Variant Analysis browser that can be used for the visualization of biological information from various data sources. IVA uses data from [OpenCGA](https://github.com/opencb/opencga) which is an OpenCB project.
=======
<img src="src/img/iva_logo.png" alt="Logo"/>

# Overview

The Interactive Variant Analyser (IVA) is the web user interface for OpenCGA that provides unprecedented features for real-time interaction with genomic data. It is suitable for any scale; from the detailed interpretation of a single genomic test through to assessing the genetic diversity of hundreds of thousands of aggregated genomes. It is not just for bioinformaticians; it provides simple and convenient access for biomedical researchers and clinical scientists as well.
>>>>>>> develop:README.md

### Documentation

You can find IVA documentation and tutorials at: [https://github.com/opencb/iva/wiki](https://github.com/opencb/iva/wiki).

### Issues Tracking

You can report bugs or request new features at [GitHub issue tracking](https://github.com/opencb/iva/issues).

### Release Notes and Roadmap

Releases notes are available at [GitHub releases](https://github.com/opencb/iva/releases).

Roadmap is available at [GitHub milestones](https://github.com/opencb/iva/milestones). You can report bugs or request new features at [GitHub issue tracking](https://github.com/opencb/iva/issues).

### Versioning

IVA is versioned following the rules from [Semantic versioning](http://semver.org/).

### Maintainers

We recommend to contact IVA developers by writing to OpenCB mailing list opencb@googlegroups.com. The main developers and maintainers are:
<<<<<<< HEAD:docs/README.md
=======
* Ignacio Medina (im411@cam.ac.uk) (_Founder and Project Leader_)
* Antonio Altamura (antonio.altamura@genomicsengland.co.uk)
* Javier Perez Florido (javier.perez.florido.ext@juntadeandalucia.es)
* Alexis Martínez (alexis.martinez@juntadeandalucia.es)
>>>>>>> develop:README.md

* Ignacio Medina \(im411@cam.ac.uk\) \(_Founder and Project Leader_\)
* Javier Perez Florido \(javier.perez.florido.ext@juntadeandalucia.es\)
* Alexis Martínez \(alexis.martinez@juntadeandalucia.es\)

#### Former Contributors

* Swaathi Kandasaamy \(sk913@cam.ac.uk\)
* Asuncion Gallego \(agallego@cipf.es\)

#### Contributing

IVA is an open-source and collaborative project, currently developement is mainly carried out by Stefan Gräf and Ignacio Medina teams from the University of Cambridge and Joaquin Dopazo team from CIBERER. We appreciate any help and feedback from users, you can contribute in many different ways such as simple bug reporting and feature request. Dependending on your skills you are more than welcome to develop client tools, new features or even fixing bugs.

# How to build
IVA is mainly developed in JavaScript. It requires of OpenCB JSorolla project to be built, this is a JavaScript library developed for several OpenCB web-based projects, it can be found as Git submodule in IVA.

Stable releases are merged and tagged at _master_ branch, you are encourage to use latest stable release for production. Current active development is carried out at _develop_ branch, only building is guaranteed and bugs are expected, use this branch for development or for testing new functionalities.

### Prerequisites
To run and build IVA you need: [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).

#### Installing Node.js and npm

To install [Node.js](https://nodejs.org/en/) you can visit [this link](http://blog.teamtreehouse.com/install-node-js-npm-linux).

### Cloning

IVA is an open-source project and can be downloaded either as package\(tar.gz\) from GitHub releases or source code by cloning the repository.

Default _**develop**_ branch can be downloaded by executing:

```text
$ git clone https://github.com/opencb/iva.git
Cloning into 'iva'...
remote: Enumerating objects: 126, done.
remote: Counting objects: 100% (126/126), done.
remote: Compressing objects: 100% (72/72), done.
remote: Total 10370 (delta 70), reused 85 (delta 38), pack-reused 10244
Receiving objects: 100% (10370/10370), 4.70 MiB | 61.00 KiB/s, done.
Resolving deltas: 100% (6064/6064), done.
```

Latest stable release at _**master**_ branch can be downloaded by executing:

```text
$ git clone -b master https://github.com/opencb/iva.git
Cloning into 'iva'...
remote: Counting objects: 624, done.
remote: Total 624 (delta 0), reused 0 (delta 0), pack-reused 624
Receiving objects: 100% (624/624), 139.37 KiB | 191.00 KiB/s, done.
Resolving deltas: 100% (356/356), done.
Checking connectivity... done.
```

After this, in both cases, you **must** execute the following command to fetch the JSorolla submodule (only the first time):

```
git submodule update --init
```

Go to `./lib/jsorolla` and checkout to ***develop*** branch of Jsorolla by

```text
cd lib/jsorolla
git checkout develop
npm run install
```

### Run
To run IVA in dev mode (hot reload for CSS files and hot restart (aka live reloading) for JS scripts), run

`
npm run serve
`.

### Build
To buil IVA, just run

`
npm run build
`.

### Test
We use [Cypress.io](https://www.cypress.io/) as testing framework.


Having the project running through the command `npm run serve`, you can run the interactive E2E test suite by running the command
```
npm run e2e
```

#### Run tests and generate a report
To run test in headless version (no browser) and generate a report, run
```
npm run e2e-report
```
for more help, try ```npm run e2e-report -h```.

when completed, all compiled files will be located under the _build_ folder.

### Testing

You can copy build content to a web server such as Apache HTTP Server and open your favourite internet browser to open IVA.

### Execute Tests in development with nightwatch\([http://nightwatchjs.org/](http://nightwatchjs.org/)\)

Prerequisite: make sure you have JDK installed, with at least version 8. If you don't have it, you can grab it from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

1. npm install --dev
2. Selenium server. Download the latest release .jar from [http://selenium-release.storage.googleapis.com/index.html](http://selenium-release.storage.googleapis.com/index.html). i.e. selenium-server-standalone-3.7.0.jar
3. Chromedriver. Download from [https://sites.google.com/a/chromium.org/chromedriver/downloads](https://sites.google.com/a/chromium.org/chromedriver/downloads) that version which supports your chrome versión. You can review what version fits your browser here [https://chromedriver.storage.googleapis.com/2.33/notes.txt](https://chromedriver.storage.googleapis.com/2.33/notes.txt).
4. Create a bin folder inside your test folder in root path
5. Move selenium bin and chrome bin inside that bin folder.
6. npm run test-e2e \( or ./node\_modules/.bin/nightwatch test/e2e/clinical-prioritization.js if you want execute just one\)

For Windows environment, just add the suffix `-win`
```
npm run e2e-win
npm run e2e-report-win
```
for more help, try ```npm run e2e-report-win -h```.

The HTML report will be generated in `./report`. The filename will have the structure `<OPENCGA_STUDY_FQN>__<TIME>_<DATE>.html` 
