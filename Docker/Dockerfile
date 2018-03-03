
FROM ruby-workspace

RUN apk add --update \
    tzdata \
    nodejs \
    mariadb \
    mariadb-client \
    mariadb-dev \
&& rm -rf /var/cache/apk/*

RUN gem install rails

RUN rm -rf /var/cache/apk/*

COPY docker-entrypoint.sh /
COPY create-database.sh /
COPY create-user.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3000
