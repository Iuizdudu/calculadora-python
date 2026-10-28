# Estágio de compilação (Build)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY package.json .npmrc* ./

# Instala dependências respeitando .npmrc
RUN npm install --legacy-peer-deps

# Copia o código fonte completo
COPY . .

# Compila o projeto Vite para produção
RUN npm run build

# Estágio de execução com servidor leve Nginx
FROM nginx:alpine AS runner

# Copia a build do estágio anterior para o diretório web do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração simples do Nginx para suportar SPA (Single Page App)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
