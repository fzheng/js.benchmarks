FROM ubuntu:14.04

MAINTAINER @AAT-LABS

RUN apt-get update -y
RUN apt-get install -y curl build-essential g++ python python-dev python-pip python-virtualenv

ADD . /aat-api

WORKDIR /aat-api

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

RUN apt-get install -y nodejs

# Install application's dependencies
RUN npm install

EXPOSE 80

CMD [ "npm", "start" ]


