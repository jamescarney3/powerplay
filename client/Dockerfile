# base env - set working directory and install dependencies
FROM node:alpine as base
WORKDIR /app

COPY ./src ./src
COPY package.json .
COPY tsconfig.json .

RUN yarn install

FROM base as development
RUN echo happy developing

FROM base AS production-build
RUN NODE_ENV=production yarn build

FROM nginx:alpine as production
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

COPY nginx.conf /etc/nginx/conf.d/configfile.template
RUN envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf

COPY --from=production-build /app/dist /usr/share/nginx/html

CMD [ "sh", "-c", "nginx -g 'daemon off;'" ]
