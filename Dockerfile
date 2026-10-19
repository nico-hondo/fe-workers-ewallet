FROM node:24.18.0 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV VITE_API_URL=/api
RUN npm run build

FROM nginx:1.28.3
COPY --from=builder /app/dist /usr/share/nginx/html
RUN echo 'server { listen 80; server_name _; root /usr/share/nginx/html; index index.html; location /api/ { proxy_pass http://host.docker.internal:8080/; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; } location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]