## Downloading Attendance management System

1. Create a new, empty folder called opensource/ in your computer's home folder.
2. Navigate to it (`cd opensource`), then fork and clone the ams repo so that it gets downloaded into opensource/ams.
3. Navigate to this folder (`cd ams`) and run `git remote add upstream https://github.com/codethechange-niec/ams.git` (or, if you're using SSH, use `git@github.com:codethechange-niec/ams.git`) to add an upstream remote that's linked to ams's main repository. (This will be necessary when submitting PRs later.)
4. Create a new database(MySQL) and import ams.sql to it by following these commands:
  1. `mysql -u root -p` (Enter root password when prompted)
  2. `CREATE DATABASE ams;`, Do not exit mysql now if wants to create new user.
	3. Create new mysql user by following these steps:
		1. For creating new user: `CREATE USER 'ams_user'@'localhost' IDENTIFIED BY 'ams@123';`
		2. Grant all privileges to the new user: `GRANT ALL PRIVILEGES ON * . * TO 'ams_user'@'localhost';`
  4. Exit from mysql: `exit`
  5. Import database file(make sure ams.sql must be in same directory): `mysql -u ams_user -p ams < ams.sql`
5. Run `npm install` to install required dependencies.
6. Make a source file to store environment variables (I already created the file you can just download it on the project directory and edit):
	1. In the same project directory that you forked, download file (https://drive.google.com/open?id=1WCdYGBLbc9wQQknf0vZTRehIfl_x3TDp)
	2. Edit file by filling your database credentials and save it.
		1. In bash shell(linux terminal): `nano ams-env`, then ctrl+o to save.
6. Run the server: `npm start`
7. Open http://localhost:3000 in the browser.

# Instructions for making code changes.

Before making any code changes read wiki(https://github.com/codethechange-niec/ams/wiki#instructions-for-making-a-code-change)

