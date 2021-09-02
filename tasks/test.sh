#!/bin/bash
timeout 1000 bash -c '</dev/tcp/127.0.0.1/8090 && echo Puerto abierto || sh ~/keycloak_management/demo/tasks/wake_up_backend.sh ' || echo Timeout de conexión
