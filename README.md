# Sde-mini-project-auth-service

This is the auth microservice where this service is defined to register new users , login the users and get the profile of the logged in user. This service involves the use of Node.Js as the backend language and MySQL Google cloud as database.

## Installation

To setup this Microservice , please follow the below commands.

1. Check the Node.Js is installed in your PC or not. If not please install it according to your system requirements. After the installation of the Node.js verify the installation with the below bash command.

```bash
node --version
```

If this command executed successfully and you get your node.js version that means the installation done successfully!.

2. Fork this repository using the below command.

```bash
git clone <Repo URL>.git
```

3. Type ls on the terminal and go to that directory and intall the libraries which are mentioned in the package.json.

```bash
npm install
```

This command downloads all the libraries required to run this project.

4. Now there is .env file required to setup complete functional project. So create .env file in the root directory of the project and define the .env in the given way.

```bash
PORT='DEFINE YOUR PORT'
NODE_ENV='EITHER DEVELOPMENT OR PERODUCTION'
ACCESS_TOKEN_SECRET='YOUR TOKEN SECRET NAME'
ACCESS_TOKEN_EXPIRY='EXPIRY DURATION'
DB_HOST='YOUR MYSQL IP ADDRESS'
DB_PORT='MY SQL DEFAULT PORT'
DB_USER='USER NAME OF THE MYSQL DATABASE'
DB_PASSWORD='PASSWORD FOR THE MYSQL DB'
DB_NAME='YOUR DATABASE NAME'
```

After define all the above in .env now it's time to run the final command.

```bash
npm run dev
```

If all goes well you see your server is running on your defined port and also the successful connection with the database. Now you can check the functionality of the API's in postman and you can find the routes for the api's in routes folder.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
