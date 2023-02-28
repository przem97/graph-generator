FROM node:19.3.0

WORKDIR /graph-solver

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "ts-node", "index.ts"]