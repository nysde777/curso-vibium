# SwagCart 
hola claude este proyecto prueba una tienda en linea con vibium y Node.js

## Como escribir el codigo
- todo en español
- codigo simple facil de entender 
- no crees archivos que no te pida. 

## Los archivos
- ayudantes.js abrir el nagevador() devuelve el bro y page, iniciar sesion(page) con lo cual ingresa a la tienda
- extraer.js estraerEmpleados(page) leee la tabla completa todas las paginas
- screpear.js guardar los empleados en datos/empleados.js
- grabar.js graba la compra en gracion.zip
- tests/: las pruebas, usa los ayudantes para no repetir el codigo

## La tienda esta en https://www.saucedemo.com
- el campo usarios dice username y el de la contrañsa es password el boton de login dice login
- al ingresar la direccion de la pagina tiene inventory.html
- el titulo se busca con data-test=title y dice prodcuts hay 6 productos inventory-item
- el boton para agregar prodcutos al carrito tiene el el id addtocard
- validar que el contador del carrito se incremente 
- el usaurio y la contraseña esta en el archivo .env

## La tabla https://datatables.net/examples/core/basic_init/zero_configuration.html
- la tabla tiene una lista de empleados paginados
- las columnas son las siguientes 
Name
Position
Office
Age
Start date
Salary
- No te olvides paginar para obtener todos los datos

## Vibium
- usa vibium

## Pruebas y comandos
- la pruebas van en tests y su nombre termina en test.js los demas archivos no llevan test en el nombre
- los comandos de package.json debe funcionar en windows y linux

## github actions
- usa ubuntu con node 
- instala las dependencias
- los usaurios y las contraseñas vienen en el archivo .env SWAG_USUARIO SWAG_CLAVE 
- los resultados se suben con if always para tenerlos aunque algo falle

## seguridad
- nunca escribas contraseñas en el codigo ni las muestres en la consola o logs
- nunca usas no sandbox
