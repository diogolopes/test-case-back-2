FROM registry.access.redhat.com/ubi8/nodejs-12:latest as node

USER 0

#RUN groupadd -r node && adduser node -g node && mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

#WORKDIR /usr/src/app
WORKDIR /opt/app-root/src
COPY package*.json /opt/app-root/src/
RUN npm set strict-ssl false && npm install --unsafe-perm --verbose
#COPY . .
COPY . /opt/app-root/src/
##COPY --chown=node:node . .
RUN chown -R default: /opt/app-root/src

EXPOSE 3000
USER 1001

CMD [ "node", "index.js" ]