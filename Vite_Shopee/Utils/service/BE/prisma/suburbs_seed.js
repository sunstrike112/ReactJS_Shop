const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')

async function main() {
  try {
    let suburbsJson = fs.readFileSync(__dirname + '/suburbs.json', 'utf8');
    let suburbs = JSON.parse(suburbsJson).data;
    
    for (let i = 0; i < suburbs.length; ++i) {
      const _suburb = suburbs[i];
      const suburbTranformed = {
        suburb: _suburb.suburb,
        postCode: _suburb.postcode.toString(),
        stateSuburbCode: _suburb.ssc_code.toString(),
        stateIsoCode: _suburb.state,
        stateName: _suburb.state_name,
        urbanArea: _suburb.urban_area,
        latitude: _suburb.lat,
        longitude: _suburb.lng,
        timezone: _suburb.timezone
      };
      await prisma.suburb.create({
        data: suburbTranformed
      });
    }
  } catch (err) {
    console.log(err)
  }
}

let isSuccess = true;

main()
  .catch((e) => {
    isSuccess = false;
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(isSuccess ? 0 : 1);
  });