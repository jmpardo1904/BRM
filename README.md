# BRM

## :hammer:Ejecutar los siguientes comandos


Para el correcto funcionamiento del API Rest:

`Comando 1`: npm install

`Comando 2`: npx sequelize-cli db:migrate

`Comando 3`: npx sequelize-cli db:seed:all

editar el archivo database.js ubicado en ./src/config/database.js
```javascript
const sequelize = new Sequelize("nombre_bd", "usuario", "contraseña", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
```
una vez hecho los pasos mencionados anteriormente.


para ejecutar el servidor de nodemon, debemos introducir el comando:

`Comando`: npm run dev
