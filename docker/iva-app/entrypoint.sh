#!/bin/bash

echo "total args:" $#
echo "first:" $1
echo "second:" $2
#sed -i 's/host:".*"/host: "val" /g' /usr/local/apache2/htdocs/iva/conf/conf.js


while [[ $# -gt 0 ]] ;do
   case $1 in
      --host=*)
         echo host ${1##--host=}
         echo "opencga.host = ${1##--host=};" >> /usr/local/apache2/htdocs/iva/conf/conf.js
         # exit
         ;;
   esac
   shift
done

echo CMD"$@"
exec "$@"
