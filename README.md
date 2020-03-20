## Downloading Attendance management System

1. Create a new, empty folder called opensource/ in your computer's home folder.
2. Navigate to it (`cd opensource`), then fork and clone the ams repo so that it gets downloaded into opensource/ams.
3. Navigate to this folder (`cd ams`) and run `git remote add upstream https://github.com/codethechange-niec/ams.git` (or, if you're using SSH, use `git@github.com:codethechange-niec/ams.git`) to add an upstream remote that's linked to ams's main repository. (This will be necessary when submitting PRs later.)
4. Create a new database(MySQL) by following these commands:
  1. `mysql -u root -p` (Enter root password when prompted)
  2. `CREATE USER 'ams_user'@'localhost' IDENTIFIED BY 'ams@123';`
  3. `GRANT ALL PRIVILEGES ON * . * TO 'ams_user'@'localhost';`
  4. `exit`
  5. `mysql -u ams_user -p`
  6. `CREATE DATABASE ams;`
  7. `exit`
  8. `mysql -u ams_user -p ams < ams.sql`
5. Run `npm install` to install required dependencies.
6. Run the server: `node server.js`
7. Open http://localhost:3000 in the browser.

# Instructions for making code changes.

Before making any code changes read wiki(https://github.com/codethechange-niec/ams/wiki#instructions-for-making-a-code-change)
