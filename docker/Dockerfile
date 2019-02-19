FROM httpd

# Minimum compatible git commit, please only use later commits.

# Install dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl gnupg2 && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash && \
    apt-get install -y git nodejs npm

RUN echo '{ "allow_root": true }' > /root/.bowerrc && \
    npm install -g grunt-cli

COPY ./build/* /usr/local/apache2/htdocs

EXPOSE 80

VOLUME /usr/local/apache2/htdocs/conf

