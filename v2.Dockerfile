FROM node:12-alpine
COPY server /app
COPY build /app/build
WORKDIR /app
RUN npm install
EXPOSE 80
CMD ["node", "index"]
