const faker = require('faker');

const workOrders = () => {
  const orders = [];

  for (let x = 0; x < 20; x++) {
    const deadline = faker.date.past();
    const description = faker.lorem.sentences(3);
    const id = faker.lorem.word();
    const name = `Work order ${id}`
    const workerId = faker.random.number(10);

    orders.push({ deadline, description, id, name, workerId });
  }

  return orders;
}

const workers = id => {
  const companyName = faker.company.companyName();
  const image = faker.image.avatar();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const name = `${firstName} ${lastName}`;
  const email = `${firstName}_${lastName}@gmail.com`;

  return { companyName, email, image, name, id};
}

module.exports = { workOrders, workers }