# Class Maping

An application to make parent children relationship between classes
### Functionalities

Each class created is displayed in the form of cards containing information
- Name
- Properties : key value pair of the class
- Relationship : Relationship can have 2 parts
    - Parent : Name of the class from which the class is derived (optional)
    - Children : List of classes which are derived from the current class

There can be 3 actions that can be taken on a class
- Edit : By clicking on the righ most icon shown in the image a modal will be displayed in which a user can add, delete, update existing properties of the class
- Delete : By clicking on the left most element icon in the image a user can delete the class but delete option is only visible when there is no children present of that class
- View : Click the center icon to view all the properties which belong to that class or are ingherited from the parent class. And a input field is also given to test relationship

![Alt text](https://github.com/vidit1/classes-front/blob/master/images/options.png?raw=true "Title")
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
