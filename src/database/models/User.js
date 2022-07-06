const fs = require("fs");
const path = require("path");

const User = {
  fileName: "./src/database/users.json",

  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  findAll: function () {
    return this.getData();
  },

  generateId: function () {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  findByPk: function (id) {
    let allUsers = this.findAll();
    let user = allUsers.find((user) => user.id === id);
    return user;
  },

  findByField: function (field, input) {
    let allUsers = this.findAll();
    let user = allUsers.find((user) => user[field] == input);
    return user;
  },

  create: function (userData) {
    let allUsers = this.findAll();
    let newUser = {
      id: this.generateId(),
      ...userData,
    };
    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, "  "));
    return newUser;
  },

  delete: function (id) {
    let allUsers = this.findAll();
    let newAllUsers = allUsers.filter((user) => user.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(newAllUsers, null, "  "));
    return true;
  },
};

module.exports = User;
