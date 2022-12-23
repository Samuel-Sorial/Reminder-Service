#####################
### Builder Image ###
#####################

FROM node:18-alpine as builder

# prepare builder files
RUN mkdir -p /home/node/src
COPY package*.json /home/node/src/
RUN chown -R node:node /home/node/src
COPY --chown=node:node . /home/node/src

# install packages
RUN npm install -g typescript ts-node
WORKDIR /home/node/src
USER node
RUN npm i

# build
RUN npm run build


#####################
### Service Image ###
#####################

FROM node:18-alpine

# install packages
RUN apk add --update busybox-suid

# prepare service files
RUN mkdir -p /home/node/service
RUN mkdir -p /home/node/log
COPY package*.json /home/node/service/
COPY --from=builder /home/node/src/build /home/node/service/
RUN chown -R node:node /home/node/service /home/node/log

# add crontabs
COPY ./crontabs/node /var/spool/cron/crontabs/node
RUN chown root:node /var/spool/cron/crontabs/node
RUN chmod 600 /var/spool/cron/crontabs/node

# install dependencies
USER node
WORKDIR /home/node/service
RUN npm ci --production

# run service
USER node
CMD node main.js | tee /home/node/log/node.log
USER root

# expose port
EXPOSE 3000
