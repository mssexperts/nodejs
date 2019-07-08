#!/usr/bin/env bash

#Run database migration command
echo -e "\033[1;34mRunning database migration script...\033[0m \n"
node_modules/.bin/sequelize db:migrate --url ${1}
echo -e "\n"

#Run database seed command
echo -e "\033[1;34mRunning database seed command...\033[0m \n"
node_modules/.bin/sequelize db:seed:all --url ${1}
echo -e "\n"
