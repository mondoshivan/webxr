# WebXR

## Webpack

All [name].ts files in ./src will be treated as entry scripts, resulting in [name].bundle.js files in ./dist.

## Typescript

https://www.skypack.dev/view/aframe-typescript-class-components

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
npm install
npm build
````

## Docker Deployment

```sh
PROJECT_DIR="/path/to/WebXR"
cd "${PROJECT_DIR}"
docker-compose up -d
```