const SimpleAdder = artifacts.require("SimpleAdder");

module.exports = function(deployer) {
  deployer.deploy(SimpleAdder);
};
