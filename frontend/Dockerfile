FROM  node:latest
LABEL version="1.0" 
LABEL maintainer="Erdal Ozkaya <erdalozkaya@yahoo.com>"
LABEL description="NodeJS, Express, ReactJS, MongoDB and Docker containerized backend for the MERN stack application."

WORKDIR /app
COPY    package*.json .
RUN     npm install
COPY    . .
EXPOSE  3000
CMD     ["npm", "start"]
