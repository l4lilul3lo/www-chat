# WWW Chat - https://www-chat.herokuapp.com/

**Project stack**

This project uses:  
[Postgresql](https://www.postgresql.org/)  
[Express](https://expressjs.com/)  
[React](https://reactjs.org/)  
[Node](https://nodejs.org/en/)  
[Redis](https://redis.io/docs/getting-started/)

---

**Project install**

Once the project is on your machine run `npm install-all` in the root directory to install all necessary packages. Or however you'd like to do it.

---

**.env**

SESSION_SECRET=  
DB_USER=  
DB_PASSWORD=  
DB_HOST=localhost  
DB_PORT=5432  
DB_NAME=

---

**Database**

This project uses postgresql.

The connection string to the database uses environment variables. Be sure to fill out the .env file.

Once you've completed the .env file you can check the connection by running `npm run reset-db`.

If the connection is working, this command will drop tables, create tables, and populate tables with initial data. Don't put in the wrong database name.

If you would like more or less data, you can change the amount of data created in the populateTables function found in `db/dbFunctions.js`.

Then simply run `npm run reset-db` again to apply the changes.

The database ERD can be seen below:

![SQL Diagram](https://imagehostingserver.l4lilul3lo.repl.co/images/drawSQL-export-2022-07-04_14_48.png)

---

**Redis**

Redis is currently only being used as a session store. It may be used for more in the future as optimizations need to be made.

Make sure you have redis installed and running somewhere before launching the project.

**Puppeteer**

_preface_

I'm currently using Ubuntu 20.04 on Windows Subsystem for Linux 2 (WSL2). Before puppeteer would work I had to install the Ubuntu dependencies for it.

If you are in the same boat as me, running the command will install all of those dependencies.

`sudo apt-get install -yq --no-install-recommends libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 libnss3 libgbm-dev`

If not, and it works out of the box, then great! Otherwise, get to googling or something.

The project makes use of puppeteer to simulate multiple user connections. It will eventually also simulate user actions.

The way I have it set up currently, it creates 5 different instances of headless google chrome. I'm not sure, but that may be a lot to handle for some hardware. If you are worried about it you can change the amount of browsers that are created by finding `createBrowsers` function call near the bottom of `puppets.js`. Change the argument to w/e integer you feel comfortable with.

To run the environment in sim mode with puppeteer run `npm run dev-sim`

---

That's all for now.
