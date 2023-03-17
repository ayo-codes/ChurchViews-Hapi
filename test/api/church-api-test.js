import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { churchviewService } from "./churchview-service.js";
import { maggie, anglican, testDenominations, testChurches, whitefriar } from "../fixtures.js";

suite("Church API tests", () => {
  let user = null;
  let sampleDenomination = null;

  setup(async () => {
    churchviewService.clearAuth();
    user = await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggie);
    await churchviewService.deleteAllDenominations();
    await churchviewService.deleteAllChurches();
    await churchviewService.deleteAllUsers();
    user = await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggie);
    anglican.userid = user._id;
    sampleDenomination = await churchviewService.createDenomination(anglican);
  });

  teardown(async () => {});

  test("create church", async () => {
    const returnedChurch = await churchviewService.createChurch(sampleDenomination._id, whitefriar);
    assertSubset(whitefriar, returnedChurch);
  });

  test("create Multiple churches", async () => {
    for (let i = 0; i < testChurches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await churchviewService.createChurch(sampleDenomination._id, testChurches[i]);
    }
    const returnedChurches = await churchviewService.getAllChurches();
    assert.equal(returnedChurches.length, testChurches.length);
    for (let i = 0; i < returnedChurches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const church = await churchviewService.getChurch(returnedChurches[i]._id);
      assertSubset(church, returnedChurches[i]);
    }
  });

  test("Delete Church API", async () => {
    for (let i = 0; i < testChurches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await churchviewService.createChurch(sampleDenomination._id, testChurches[i]);
    }
    let returnedChurches = await churchviewService.getAllChurches();
    assert.equal(returnedChurches.length, testChurches.length);
    for (let i = 0; i < returnedChurches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const church = await churchviewService.deleteChurch(returnedChurches[i]._id);
    }
    returnedChurches = await churchviewService.getAllChurches();
    assert.equal(returnedChurches.length, 0);
  });

  test("test denormalised denomination", async () => {
    for (let i = 0; i < testChurches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await churchviewService.createChurch(sampleDenomination._id, testChurches[i]);
    }
    const returnedDenomination = await churchviewService.getDenomination(sampleDenomination._id);
    assert.equal(returnedDenomination.churches.length, testChurches.length);
    for (let i = 0; i < testChurches.length; i += 1) {
      assertSubset(testChurches[i], returnedDenomination.churches[i]);
    }
  });
});
