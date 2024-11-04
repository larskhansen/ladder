FROM node:20 AS build

WORKDIR /usr/src/app

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

EXPOSE 3000
USER node
CMD npm run start