FROM node:12.16.3 AS ui-build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install -g @angular/cli && npm install

#FROM node:12.16.3 AS server-build
#WORKDIR /root/
#COPY --from=ui-build /usr/src/app/my-app/dist ./my-app/dist
#COPY package*.json ./
#RUN npm install
#COPY server.js .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]