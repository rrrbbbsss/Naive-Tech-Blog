const { User } = require("../models");

const UserData = [
  {
    username: "ali",
    password: "12345678",
  },
  {
    username: "bob",
    password: "87654321",
  },
];

const seedUser = () => User.bulkCreate(UserData);

module.exports = seedUser;
