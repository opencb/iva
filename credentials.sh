#!/bin/bash

echo -n "Enter your Opencga Username [ENTER]: "
read username
stty -echo
printf "Enter your Opencga Password [ENTER]: "
read password
stty echo

CYPRESS_username=$username CYPRESS_password=$password "$@"
