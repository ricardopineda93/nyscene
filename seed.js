const { db, Movies } = require('./server/database/index');
const { green, red } = require('chalk');
const moviesDataSeed = JSON.parse(
  require('fs').readFileSync('./locationAndMovieData.json', 'utf8')
);

const seed = async () => {
  await db.sync({ force: true });

  await Promise.all(moviesDataSeed.map(movie => Movies.create(movie)));

  console.log(green('Seeded and sowed!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oops! Likes like there was an issue seeding!'));
  console.error(err);
  db.close();
});
