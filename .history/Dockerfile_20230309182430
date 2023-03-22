FROM node:18.13

# COPY web-aos-admin-v2/package*.json ./
COPY ./test-server/ /var/www/html/

WORKDIR /var/www/html/

ENV TZ=Asia/Seoul

EXPOSE 30000

CMD ["node", "server.js"]