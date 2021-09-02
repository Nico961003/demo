#!/bin/bash
timeout 1000 bash -c '</dev/tcp/127.0.0.1/8083 && echo Puerto abierto || sh ~/keycloak_management/demo/tasks/wake_up_frontend.sh ' || echo Timeout de conexión
