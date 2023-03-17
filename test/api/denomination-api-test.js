import { EventEmitter } from "events";
import { assert } from "chai";
import { churchviewService } from "./churchview-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie , anglican, testDenominations } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Denomination API tests", () => {

  let user = null;

  setup(async () => {
    churchviewService.clearAuth();
    user = await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggie);
    await churchviewService.deleteAllDenominations();
    await churchviewService.deleteAllUsers();
    user = await churchviewService.createUser(maggie);
    // triggers a new bearer token 
    await churchviewService.authenticate(maggie);
    anglican.userid = user._id;
  });

  teardown(async () => {});

  test("create denomination", async () => {
    const returnedDenomination = await churchviewService.createDenomination(anglican);
    assert.isNotNull(returnedDenomination);
    assertSubset(anglican, returnedDenomination);
  });

  test("delete a denomination", async () => {
    const denomination = await churchviewService.createDenomination(anglican);
    const response = await churchviewService.deleteDenomination(denomination._id);
    assert.equal(response.status, 204);
    try {
      const returnedDenomination = await churchviewService.getDenomination(denomination.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Denomination with this id", "Incorrect Response Message");
    }
  });

  test("create multiple denominations", async () => {
    for (let i = 0; i < testDenominations.length; i += 1) {
      testDenominations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await churchviewService.createDenomination(testDenominations[i]);
    }
    let returnedLists = await churchviewService.getAllDenominations();
    assert.equal(returnedLists.length, testDenominations.length);
    await churchviewService.deleteAllDenominations();
    returnedLists = await churchviewService.getAllDenominations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant denomination", async () => {
    try {
      const response = await churchviewService.deleteDenomination("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Denomination with this id", "Incorrect Response Message");
    }
  });
});
