#change this to your own repo, should you have uploaded your image!
FROM  quasarframework/client-dev:latest

MAINTAINER Tiberiu Ichim <tiberiu.ichim@gmail.com>

WORKDIR /opt/app

COPY package.json /opt/app/
RUN npm install

COPY . /opt/app

EXPOSE 8080

CMD /bin/sh
