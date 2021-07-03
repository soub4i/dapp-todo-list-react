var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Todo = artifacts.require("./Todo.sol");

module.exports = function(deployer) {
  deployer.deploy(Todo);
};

