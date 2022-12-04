FROM node:14-slim as builder
ENV APP_HOME_DIR=/app
ENV PATH $APP_HOME_DIR/node_modules/.bin:$PATH
WORKDIR $APP_HOME_DIR

COPY ./client $APP_HOME_DIR/client
COPY ./server $APP_HOME_DIR/server
ADD .eslintignore .eslintrc.json .prettierrc yarn.lock package.json $APP_HOME_DIR/

WORKDIR $APP_HOME_DIR/client
RUN yarn
RUN yarn build

WORKDIR $APP_HOME_DIR
RUN yarn

CMD [ "npm", "start" ]