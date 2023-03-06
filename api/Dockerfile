FROM node:14-slim as builder
ENV APP_HOME_DIR=/app
ENV PATH $APP_HOME_DIR/node_modules/.bin:$PATH
WORKDIR $APP_HOME_DIR

COPY ./ $APP_HOME_DIR/
WORKDIR $APP_HOME_DIR/
RUN yarn
RUN yarn initDB
EXPOSE 4000

CMD ["yarn", "start"]