const SimpleCounter = artifacts.require("./SimpleCounter.sol");

contract("SimpleCounter", accounts => {
  it("...add to count and equal 1.", async () => {
    const simpleCounterInstance = await SimpleCounter.deployed();

    // Add to count
    await simpleCounterInstance.addCount({ from: accounts[0] });

    // Get stored value
    const storedData = await simpleCounterInstance.count.call();

    assert.equal(storedData, 1, "The value should be 1.");
  });
});
