FROM node:20 AS build

WORKDIR /home/node/app

# copy project file
COPY --chown=node:node . .

# install dependencies
USER node
RUN npm set progress=true && \
    npm config set depth 0 && \
    npm install && \
    npm run build

# Run lint
RUN npm run lint

FROM node:20 AS release

WORKDIR /home/node/app

COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/.next ./.next
COPY --chown=node:node --from=build /home/node/app/package*.json ./
COPY --chown=node:node --from=build /home/node/app/next.config.ts ./
COPY --chown=node:node --from=build /home/node/app/tsconfig.json ./tsconfig.json

EXPOSE 3000
USER node
CMD npm run start