# Class Maping

An application to make parent children relationship between classes

#### Deployment
Create a http server by running the below command in the folder
```sh
$python -m SimpleHTTPServer 8080
```
 Grunt is used as a code bundler
 - prod - Should be used while deploying the code, it is used to minify and mangle all the javascript code and stylesheets
 - dev - Used while development of the app or while debuging
 ```sh
grunt prod
grunt dev
```

 #### Dependencies

 Execute following commands to install all the dependencies required for the app
  ```sh
sudo npm install -g grunt
sudo npm install -g grunt-cli
npm install
```
