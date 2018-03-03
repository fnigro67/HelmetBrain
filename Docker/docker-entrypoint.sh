#!/bin/bash

export MYSQL_ALLOW_EMPTY_PASSWORD=1
nohup /create-database.sh 0<&- &>/dev/null &

/create-user.sh

