const { parse } = require('csv-parse');

const fs = require('fs');

const habitablePlanet = [];

function isHabitable(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

fs.createReadStream('kepler.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitable(data)) {
      habitablePlanet.push(data);
    }
  })
  .on('error', (error) => {
    console.log(error);
  })
  .on('end', () => {
    console.log(
      habitablePlanet.map((planet) => {
        return planet.kepler_name;
      })
    );
  });
