#!/bin/bash

while getopts u:s: opts; do
   case ${opts} in
      u) username=${OPTARG} ;;
      s) studies=${OPTARG} ;;
      *) ;;
   esac
done

if test ! $username; then
  # if username not defined as opt
  echo -n "Enter your Opencga Username [ENTER]: "
  read username
fi

# set password
stty -echo
printf "Enter your Opencga Password [ENTER]: "
read password
stty echo

if test ! "$studies"; then
  # if studies not defined as opt (comma separated)
  echo -en "\nEnter the FQN (comma separated) of the studies you want to test (leave empty for default) [ENTER]: "
  read str_studies
  readarray -d , -t studies<<<"$str_studies"
fi

# iterate over studies and run the test defined in --spec
export CYPRESS_username=$username
export CYPRESS_password=$password
for study in "${studies[@]}"
do
  echo "$study"
  rm -rf mochawesome-report/ && \
  CYPRESS_study="$study" npx cypress run --config videosFolder="cypress/videos/$study",screenshotsFolder="cypress/screenshots/$study" --headless --spec 'cypress/integration/002-login.js';  \
  mochawesome-merge mochawesome-report/*.json -o mochawesome-report/cypress-combined-report.json && \
  marge --reportFilename "$study".html --charts --timestamp _HH-MM_dd-mm-yyyy --reportPageTitle "IVA $study" --reportTitle "IVA study: $study" --reportDir ./report mochawesome-report/cypress-combined-report.json && \
  rm -rf mochawesome-report/
done
spd-say 'end to end test completed'
