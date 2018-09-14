## Build from Apache HTTPD public image
## https://hub.docker.com/_/httpd/
FROM httpd:2.4

## Code must be placed into /usr/local/apache2/htdocs/
WORKDIR /usr/local/apache2/htdocs/
COPY . .
EXPOSE 80
