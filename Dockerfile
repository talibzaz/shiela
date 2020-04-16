FROM nginx:alpine

# Run yarn build or npm run build before you build this image.
COPY dist /var/html/sheila

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]