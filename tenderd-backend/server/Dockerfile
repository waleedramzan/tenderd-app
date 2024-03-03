FROM node:16-alpine
WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "start"]