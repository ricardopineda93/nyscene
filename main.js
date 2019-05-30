'use strict';

const { db } = require('./server/database/index');
const app = require('./server/index');
const PORT = 3000;

db.sync().then(() => {
  console.log('db synced!');
  app.listen(PORT, () => console.log(`Serving up the scenes on port ${PORT}!`));
});
