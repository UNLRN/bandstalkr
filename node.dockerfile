FROM node:latest

MAINTAINER Matt Jiles

ADD . /src
WORKDIR /src

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby
RUN gem install sass

RUN npm install gulp -g

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "gulp"]
