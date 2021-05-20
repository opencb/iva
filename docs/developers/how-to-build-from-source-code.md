# How to build from source code

IVA is developed with Lit, therefore it is mainly developed in JavaScript and makes a heavy usage of HTML and CSS. It uses Grunt as building tool. IVA also requires of OpenCB JSorolla project to be built, this is a JavaScript library developed for several OpenCB web-based projects, this can be found as Git submodule in IVA.

Stable releases are merged and tagged at `master` branch, you are encourage to use the latest stable release for production. Current active development is carried out at `develop` branch, only building is guaranteed and bugs are expected, use this branch for development or for testing new functionalities. The only dependency of IVA from OpenCB is JSorolla.

### Prerequisites

The following technologies are needed to build IVA

* Install [Nodejs ](https://nodejs.org/en/)

### Cloning

IVA is an open-source project and can be downloaded either as package\(tar.gz\) from GitHub releases or source code by cloning the repository.

Default `develop` branch can be downloaded by executing:

```bash
$ git clone https://github.com/opencb/iva.git
Cloning into 'iva'...
remote: Counting objects: 624, done.
remote: Total 624 (delta 0), reused 0 (delta 0), pack-reused 624
Receiving objects: 100% (624/624), 139.37 KiB | 0 bytes/s, done.
Resolving deltas: 100% (356/356), done.
Checking connectivity... done.
```

Latest stable release at `master` branch can be downloaded by executing:

```bash
$ git clone -b master https://github.com/opencb/iva.git
Cloning into 'iva'...
remote: Counting objects: 624, done.
remote: Total 624 (delta 0), reused 0 (delta 0), pack-reused 624
Receiving objects: 100% (624/624), 139.37 KiB | 191.00 KiB/s, done.
Resolving deltas: 100% (356/356), done.
Checking connectivity... done.
```

After this, in both cases, you **must** execute the following command to fetch the JSorolla submodule \(only the first time\):

```text
git submodule update --init
```

Go to `lib/jsorolla` and checkout to `develop` branch of Jsorolla by

```text
cd lib/jsorolla
git checkout develop
```

### Build

First, you must update JSorolla dependencies, from the root folder execute:

```text
cd lib/jsorolla
npm install
```

Finally, to build IVA execute:

We have to install npm packages for IVA, from the root folder execute:

```text
npm install
```

And now execute:

```text
npm run build
```

when completed, all compiled files will be located under the `build` folder.

### Test

We use [Cypress.io](https://www.cypress.io/) as testing framework.

Having the project running through the command `npm run serve`, you can run the **interactive E2E** test suite by running the command

```text
npm run e2e
```

or the **headless E2E** test suite \(no browser window\).  
This mode comes with an HTML report \(generated in `./report`\).

```text
npm run e2e-report
```

in a Windows environment, just add the suffix `-win`

```text
npm run e2e-win
npm run e2e-report-win
```

