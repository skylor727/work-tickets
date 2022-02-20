FROM node:15

WORKDIR /app

COPY ./ ./

CMD ["node", "app.js"]