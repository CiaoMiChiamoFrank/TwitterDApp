const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Apple", (m) => {
  const apple = m.contract("Apple", [], {
   
  });

  return { apple };
});
