const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Twitter", (m) => {
  const twitter = m.contract("Twitter", [], {
   
  });

  return { twitter };
});
