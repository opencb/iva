# Installation

## Quick installation

### Bare installation

* Download the latest tar.gz package from [https://github.com/opencb/iva/releases](https://github.com/opencb/iva/releases).
* Extract the package `tar -xvf iva-[VERSION].tar.gz`
* Move the folder into the working directory of a static web server of your choice \(e.g. Apache\)

### Docker

IVA is also provided as a Docker image here [https://hub.docker.com/repository/docker/opencb/iva-app](https://hub.docker.com/repository/docker/opencb/iva-app).  
  
Pull and lauch the container:  
`docker run --rm --name iva -p 8000:80 opencb/iva-app`

Then visit:  
`localhost:8000/iva`

## Installation for developers

### Clone

The repository of the project is here [https://github.com/opencb/iva](https://github.com/opencb/iva).

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

After this, in both cases, you **must** execute the following command to fetch the JSorolla submodule \(only the first time\):

```text
git submodule update --init
```

Go to `./lib/jsorolla` and checkout to _**develop**_ branch of Jsorolla by

```text
cd lib/jsorolla
git checkout develop
npm run install
```

### Run

To run IVA in dev mode \(hot reload for CSS files and hot restart, aka "live reloading", for JS scripts\), run

`npm run serve`.

### Build

To produce the built version, just run

`npm run build`.

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

