#! /usr/bin/env node 

const {  execSync } = require('child_process');
var fs = require('fs');
const path = require('node:path');
const { cwd } = require('process');

const arguments = process.argv.slice(2);

const appName = arguments[0];

const userPath = cwd();
const modulePath = __dirname;
console.log(modulePath);
console.log(userPath);

if(['--typescript'].includes(appName) || !appName){
    console.log('You need spefect app name');
    process.exit(1);
}

if(! /^[a-zA-Z0-9\-]+$/.exec(appName) ){
    console.log('your react app name is incorect!');
    process.exit(1);
}

let isTypecriptApp = false;
if(arguments.includes('--typescript')){
    console.log('Create react typescript app');
    isTypecriptApp=true;
}else{
    console.log('create react app');
}

const appDirectory = `${userPath}/${appName}`;

if (fs.existsSync(appDirectory)) {
    console.log(`${appName} 'dirctory is exists!`);
    process.exit(1);
}

try{
    fs.mkdirSync(appDirectory);
    fs.copyFileSync(`${modulePath}/template/react/package.json`,`${appDirectory}/package.json`);
    fs.copyFileSync(`${modulePath}/template/react/gitignore`,`${appDirectory}/.gitignore`);
    fs.copyFileSync(`${modulePath}/template/react/README.md`,`${appDirectory}/README.md`);
    fs.copyFileSync(`${modulePath}/template/react/webpack.config.js`,`${appDirectory}/webpack.config.js`);

    if(isTypecriptApp){
        fs.copyFileSync(`${modulePath}/template/react/tsconfig.json`,`${appDirectory}/tsconfig.json`);
    }

    const srcDirectory = appDirectory + '/src';
    if(isTypecriptApp){
        copyFolderSync(`${modulePath}/template/react/src/ts`,srcDirectory);
    }else{
        copyFolderSync(`${modulePath}/template/react/src/js`,srcDirectory);
    }
    

    const publicDirectory = appDirectory + '/public';
    copyFolderSync(`${modulePath}/template/react/public`,publicDirectory);


    /* replace app name in package.json */

    fs.readFile(`${appDirectory}/package.json`, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/__APP_NAME__/g, appName);
      
        fs.writeFile(`${appDirectory}/package.json`, result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
    });

    fs.readFile(`${appDirectory}/webpack.config.js`, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        var result = '';
        if(isTypecriptApp){
            result = data.replace(/__ROOT_FILE__/g, `./src/index.tsx`)
        }else{
            result = data.replace(/__ROOT_FILE__/g, `./src/index.jsx`)
        }
      
        fs.writeFile(`${appDirectory}/webpack.config.js`, result, 'utf8', function (err) {
           if (err) return console.log(err);
        });
    });

}catch(e){
    console.log('an error when creating files');
    process.exit(1);
}


/* install dependensies */



console.log('installing packages...');
console.log('Please wait!');
 
console.log('installing react ...');
execCommand(`cd ${appName} && npm i react react-dom`);
console.log('installing webpack ...');
execCommand(`cd ${appName} && npm i --save-dev webpack webpack-cli webpack-dev-server css-loader html-webpack-plugin mini-css-extract-plugin copy-webpack-plugin @svgr/webpack`);
console.log('installing eslint ...');
execCommand(`cd ${appName} && npm i --save-dev eslint eslint-config-airbnb-base eslint-plugin-jest eslint-config-prettier`);
console.log('installing path ...');
execCommand(`cd ${appName} && npm i --save-dev path`);
console.log('installing babel ...');
execCommand(`cd ${appName} && npm i --save-dev babel-loader @babel/preset-env @babel/core @babel/plugin-transform-runtime @babel/preset-react @babel/eslint-parser @babel/runtime @babel/cli`);

if(isTypecriptApp){
    console.log('installing typescript ...');
    execCommand(`cd ${appName} && npm i --save-dev typescript @types/node `);

    console.log('installing ts-loader ...');
    execCommand(`cd ${appName} && npm i --save-dev  ts-loader`);

    console.log('installing react types ...');
    execCommand(`cd ${appName} && npm i --save-dev @types/react @types/react-dom`);

    console.log('installing babel typescript ...');
    execCommand(`cd ${appName} && npm i --save-dev @babel/preset-typescript`);
    
}


console.log(`${appName} app created successfully`);
console.log(`use cd ${appName} && npm run start and enjoy it!`);


/* functions */

function execCommand(command){
    execSync(command);
}

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

