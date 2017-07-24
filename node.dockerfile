FROM node:7.10.0

MAINTAINER Matt Jiles

WORKDIR /src/
ADD package.json /src/

# # RUN apt-get update -qq && apt-get install -y build-essential
# # RUN apt-get install -y ruby-full rubygems
# # RUN gem install sass

# # RUN npm install gulp -g

# # RUN npm install
# # RUN npm rebuild node-sass --force

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
