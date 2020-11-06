# Introduction 
Portais Legais DIRF


# Variáveis de Ambiente aplicação, conexão com banco de dados e BUS (o default se não setado é o ambiente de DEV e porta 3000)
 - username: process.env.DB_USER 
 - password: process.env.DB_PASSWORD
 - database:  process.env.DB_NAME
 - host: process.env.DB_HOST
 - port: process.env.PORT
 - process.env.BUS_URL_GERAR_ANOS
 - process.env.BUS_URL_GERAR_JSON
 - process.env.BUS_USER
 - process.env.BUS_PASSWD
 - process.env.BUS_AUTH

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
    ```sh
    npm install
    ```
2.	Software dependencies
```sh
    "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-validator": "^6.6.1",
    "sequelize": "^5.22.3",
    "tedious": "^9.2.1",
    "validator": "^13.1.1"
  },
  "devDependencies": {
    "sequelize-cli": "^6.2.0"
  }
  ```
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)