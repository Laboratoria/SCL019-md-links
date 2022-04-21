# Markdown Links

## Índice

* [1. Sobre el módulo](#1-sobre-el-módulo)
* [2. Instalación](#2-instalación)
* [3. Cómo usar](#3-cómo-usar)

***

## 1. Sobre el módulo
md-links-munita es una aplicación que permite verificar el estado de los links contenidos en archivos md de manera fácil y rápida, con la opción de ver stats básicas como el total de links encontrados, links funcionales y links rotos, además de poder desplegar una lista completa de links que indica de forma gráfica y sencilla el estado de cada uno.


## 2. Instalación
Para instalar, sólo debes ejecutar el siguiente comando en tu terminal:

`npm install md-links-munita`

## 3. Cómo usar
Una vez instalada, puedes llamar a la aplicación como 'mdlink', agregando la ruta del archivo o directorio a revisar y especificando si quieres ver --stats y/o --validate.

### Ejemplos:
```sh
mdlink ./some/example.md --stats
mdlink ./some/example.md --validate
mdlink ./some/example.md --stats --validate
```

Si falta alguno de los datos, recibirás un mensaje de aviso y tendrás que iniciar la aplicación nuevamente, ingresando lo que faltaba.




