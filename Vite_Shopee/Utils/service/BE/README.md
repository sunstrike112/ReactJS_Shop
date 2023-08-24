<p align="center">
  <a href="https://siliconstack.com.au" target="blank"><img src="https://siliconstack.com.au/wp-content/uploads/2021/01/Pink.png" width="320" alt="Nest Logo" /></a>
</p>

## Description

SS Framework based on Nestjs Framework & Prisma.
(https://nestjs.com/ and https://www.prisma.io/)

Link detail documentation: https://www.notion.so/SS-Framework-Document-fa6d07370f514250ad35c99a2cc2bfce
(You need to invited by administrator, please send mail to tien@siliconstack.com.au)

## Requirements
1. Nodejs version 12+ and need use nvm to runnings multi-version node
2. MySQL >= 5.7 or PostgreSQL >= 10
3. Vscode


## Installation

#### 1. Node modules
```bash
# Install nestjs cli
$ npm i -g @nestjs/cli

# Install hygen global command
$ npm i -g hygen

# Install node module for applications
$ npm install
```

#### 2. Vscode plugin
- Code spell checker
- DotENV
- MJML (for email templates)
- mjml-syntax
- npm Intellisense
- Prisma

## Running the app (steps by steps)
We are using monorepo structured and separated two applications: API and System

#### 1. Change environment setting
- Replace .env.example to .env
- Change value of "DATABASE_URL" with your information
- Change other environment variables 

#### 2. Prisma migration
```bash
# migration for the first runnings
$ npx prisma migrate dev

# Running seeds, at the root application
$ node ./prisma/main_seed.js
$ node ./prisma/suburbs_seed.js
```
### Notes
```bash
# For dev, when you change Prisma DB schema without generate migration
$ npx prisma db push

# After your schema is good for the features
# <file name migration> need follow formula: <action_feature>, eg: create_user_table, add_status_user_table
$ npx prisma migrate dev --name <file name migration>
# Then you need run generate
$ npx prisma generate
```

#### 2. API Application
```bash
# development api app
$ npm run start api

# watch mode api app
$ npm run start:dev api

# production mode api app
$ npm run start:prod api
```

#### 3. System Application
```bash
# development api app
$ npm run start system

# watch mode api app
$ npm run start:dev system

# production mode api app
$ npm run start:prod system
```

## CRUD modules for API application
We are using hygen to make crud modules
(https://www.hygen.io/)

```bash
# --name is name of module, and with format param case + singularize
# --type is "core" or "modules"
# eg: hygen generator module --name <module name> --type <type>
$ hygen generator module --name role-permission --type modules
```

For module is not crud, you can use nest cli to make module
(https://docs.nestjs.com/cli/usages)
```bash
# eg: nest generate res modules/<module name>
$ nest generate res modules/demo-feature
```

## Generation documentation
The code support to generate documentation.
### 1. Prisma documentation
```bash
# Then you need run generate
$ npx prisma generate
```
After call generate, the system will make:
- prisma-docs (prisma schema documentation)
- dbml (ERD for https://dbdiagram.io/)


### 2. Compodoc documentation
```bash
# Compodoc documentation
$ npx @compodoc/compodoc -p tsconfig.json -s
```
After call generate, will make documentation folder


## Detail documentation
Link detail documentation: https://www.notion.so/SS-Framework-Document-fa6d07370f514250ad35c99a2cc2bfce



https://github.com/typestack/class-validator
https://github.com/typestack/class-transformer
https://www.prisma.io/docs/concepts