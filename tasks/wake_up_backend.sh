#!/bin/bash

#ejecuta una llamada a un jar el cual edita los archivos rechazados por intelar, modifica fecha y secuencial
# una vez editados son enviados a intelar
export GRAILS_OPTS="-XX:MaxPermSize=1024m -Xmx1024M -Xms1024m -server"
export HOST_KEY="https://sso.egas.com.mx/"
export REALM_KEY="DEV"
export CLIENT_KEY="qsstorage"
export USER_KEY="admin"
export PASS_KEY="Jc2mqnFxDC8A"
echo $GRAILS_OPTS
echo $PASS_KEY
rootWFL=$( cd `dirname $0` >/dev/null; pwd );

        EXITCODE=;                                   
                #funcion que ejecuta el jar
                RunJava 
                EXITCODE=$?;                                        

                DISPLAY "El exit code ::--->  $EXITCODE";

              if [ "$EXITCODE" != "0" ]
                then
                    DISPLAY "System exit es diferente de 0 , finalizo con error -1  "
                else            
                    DISPLAY "Ejecución correcta de jar  ::---> ";
                    D
                fi          

# FUNCION PARA EJECUTAR JAVA 
function RunJava
{
echo "Mandando llamar jar con ruta "
    #ejecuta java, puedes indicar la ruta donde está o pasarla por variable
    java $DEBUG -jar /root/keycloak_management/dashboard_back_keycloak/build/libs/Project-0.0.1-SNAPSHOT.jar ;
}   
