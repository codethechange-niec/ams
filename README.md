## Downloading Attendance management System

1. Create a new, empty folder called opensource/ in your computer's home folder.
2. Navigate to it (`cd opensource`), then fork and clone the ams repo so that it gets downloaded into opensource/ams.
3. Navigate to this folder (`cd ams`) and run `git remote add upstream https://github.com/codethechange-niec/ams.git` (or, if you're using SSH, use `git@github.com:codethechange-niec/ams.git`) to add an upstream remote that's linked to ams's main repository. (This will be necessary when submitting PRs later.)
4. Create a new database(MySQL):
  	1. `mysql -u root -p` (Enter root password when prompted)
	2. Create new user: `CREATE USER 'ams_user'@'localhost' IDENTIFIED BY 'ams@123';`
	3. Grant all privileges to the user you just created: `GRANT ALL PRIVILEGES ON * . * TO 'ams_user'@'localhost';`
  	4. Exit from mysql: `exit`
	5. Login in with the ams_user: `mysql -u ams_user -p`
	6. create database named ams: `CREATE DATABASE ams;`
	7. Exit from mysql: `exit`
  	8. Import database settings: `mysql -u ams_user -p ams < ams.sql`
5. Create application environment variables: `cp .env.example .env`
6. Run `npm install` to install required dependencies.
7. Run the server: `npm start`
8. Open http://localhost:3000 in the browser.

# Instructions for making code changes.

Before making any code changes read wiki(https://github.com/codethechange-niec/ams/wiki#instructions-for-making-a-code-change)

