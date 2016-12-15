# Overview
IVA is a generic Interactive Variant Analysis browser that can be used for the visualization of biological information from various data sources. IVA uses data from [OpenCGA](https://github.com/opencb/opencga) which is an OpenCB project.

### Documentation
You can find IVA documentation and tutorials at: https://github.com/opencb/iva/wiki.

### Issues Tracking
You can report bugs or request new features at [GitHub issue tracking](https://github.com/opencb/iva/issues).

### Release Notes and Roadmap
Releases notes are available at [GitHub releases](https://github.com/opencb/iva/releases).

Roadmap is available at [GitHub milestones](https://github.com/opencb/iva/milestones). You can report bugs or request new features at [GitHub issue tracking](https://github.com/opencb/iva/issues).

### Versioning
IVA is versioned following the rules from [Semantic versioning](http://semver.org/).

### Maintainers
We recommend to contact IVA developers by writing to OpenCB mailing list opencb@googlegroups.com. The main developers and maintainers are:
* Ignacio Medina (im411@cam.ac.uk) (_Founder and Project Leader_)
* Swaathi Kandasaamy (sk913@cam.ac.uk)
* Asuncion Gallego (agallego@cipf.es)

##### Contributing
IVA is an open-source and collaborative project, currently developement is mainly carried out by Stefan Gräf and Ignacio Medina teams from the University of Cambridge and Joaquin Dopazo team from CIBERER. We appreciate any help and feedback from users, you can contribute in many different ways such as simple bug reporting and feature request. Dependending on your skills you are more than welcome to develop client tools, new features or even fixing bugs.

# How to build
IVA is developed in HTML5, therefore it is mainly developed in JavaScript and makes a heavy usage of HTML and CSS. It uses Grunt as building tool. IVA also requires of OpenCB JSorolla project to be built, this is a JavaScript library developed for several OpenCB web-based projects, this can be found as Git submodule in IVA.

Stable releases are merged and tagged at _master_ branch, you are encourage to use latest stable release for production. Current active development is carried out at _develop_ branch, only building is guaranteed and bugs are expected, use this branch for development or for testing new functionalities. The only dependency of IVA from OpenCB is JSorolla.

### Prerequisites
The following technologies are needed to build IVA: [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), [Bower](https://bower.io/) and [Grunt](http://gruntjs.com/getting-started).

##### Installing Node.js and npm
To install [Node.js](https://nodejs.org/en/) you can visit [this link](http://blog.teamtreehouse.com/install-node-js-npm-linux).

[npm](https://www.npmjs.com/) stands for *node packaged modules* and it is the dependency manager of [Node.js](https://nodejs.org/en/).

##### Install Bower
After installing Node.js and npm, we can install Bower by executing the following commands with root permission:

```
$ sudo npm install -g bower
```

##### Install Grunt
To install grunt, run

```
 npm install -g grunt-cli
```

### Cloning
IVA is an open-source project and can be downloaded either as package(tar.gz) from GitHub releases or source code by cloning the repository.

Default ***develop*** branch can be downloaded by executing:

```
$ git clone https://github.com/opencb/iva.git
Cloning into 'iva'...
remote: Counting objects: 624, done.
remote: Total 624 (delta 0), reused 0 (delta 0), pack-reused 624
Receiving objects: 100% (624/624), 139.37 KiB | 0 bytes/s, done.
Resolving deltas: 100% (356/356), done.
Checking connectivity... done.
```

Latest stable release at ***master*** branch can be downloaded by executing:

```
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

Go to lib/jsorolla and checkout to ***next-v2.0.0*** branch of Jsorolla by 

```
cd lib/jsorolla
git checkout next-v2.0.0
```

### Build
First, you must update JSorolla dependencies, from the root folder execute:

```
cd lib/jsorolla
npm install
bower install
grunt
```

Finally, to build IVA execute:

We have to install npm packages for IVA, from the the root folder execute:

```
npm install
```

This will make npm to look at file [package.json](https://github.com/opencb/iva/blob/develop/package.json) and install locally all the dependencies listed there.

To install all *Bower* dependencies for IVA execute from the root folder:

```
bower install
```

This will make Bower to look at file [bower.json](https://github.com/opencb/iva/blob/develop/bower.json) and install locally all the dependencies.

At last execute:

```
grunt
```

When completed, all compiled files will be located under the build folder.

### Testing
You can copy build content to a web server such as Apache HTTP Server and open your favourite internet browser to open IVA.
