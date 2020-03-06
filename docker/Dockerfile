FROM httpd:2.4-alpine

## To run the docker use:
##   docker build -t iva-httpd .
##   docker run -dit --name httpd-alpine -p 81:80 iva-httpd
## Then open:  http://localhost:81/iva

LABEL org.label-schema.vendor="OpenCB" \
      org.label-schema.name="iva" \
      org.label-schema.url="http://docs.opencb.org/display/iva" \
      org.label-schema.description="An open-source web app for interactive variant analysis" \
      maintainer="Antonio Altamura <antonioaltamura7@gmail.com>" \
      org.label-schema.schema-version="1.0"

## Create and change user
#RUN addgroup -S iva && adduser -S iva -G iva
#USER iva

## Copy files
COPY entrypoint.sh /usr/local/bin
#COPY ./build /usr/local/apache2/htdocs/iva

VOLUME /usr/local/apache2/htdocs/iva/conf
EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]
