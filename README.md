# WebXR

## SSL

https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04

```sh
PROJECT_DIR="/path/to/WebXR"
cd "${PROJECT_DIR}"
mkdir -p nginx/ssl/certs
mkdir -p nginx/ssl/private

# note: use IP as host
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ${PWD}/nginx/ssl/private/ssl.key \
    -out ${PWD}/nginx/ssl/certs/ssl.crt
    
sudo openssl dhparam -out ${PWD}/nginx/ssl/certs/dhparam.pem 2048

```

## Nginx Configuration

Adapt the value for the "servername" parameters in the /nginx/default.conf to match the IP / host from the SSL certificate.

## NPM Modules

```sh

HTML_DIR="/path/to/WebXR/html"
cd "${HTML_DIR}"

npm install aframe
npm install @types/aframe
npm install typescript --save-dev
npx tsc --init --rootDir scripts --outDir build --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs --allowJs true --noImplicitAny true

````

## Deployment

```sh

PROJECT_DIR="/path/to/WebXR"
cd "${PROJECT_DIR}"

# docker run
docker run --name WebXR \
    -p 8001:443 \
    -v ${PWD}/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro \
    -v ${PWD}/nginx/snippets:/etc/nginx/snippets \
    -v ${PWD}/nginx/ssl:/etc/ssl \
    -v ${PWD}/html:/usr/share/nginx/html:ro \
    -d nginx
```