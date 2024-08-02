FROM nginx:stable-alpine
COPY ./dist/ /usr/share/nginx/html
COPY docker.nginx.template /etc/nginx/conf.d/docker.nginx.template
CMD envsubst '${API_URL},${STS_URL},${MEDIA_URL}' < /etc/nginx/conf.d/docker.nginx.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
