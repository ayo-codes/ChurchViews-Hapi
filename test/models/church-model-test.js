import { assert } from "chai";
import { db } from "../../src/models/db.js";
import {testDenominations, testChurches, testUsers, anglican, catholic, whitefriar } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Churches Model tests", () => {

  let catholicList = null;

  setup(async () => {
    db.init("mongo");
    await db.denominationStore.deleteAllDenominations();
    await db.churchStore.deleteAllChurches();
    catholicList = await db.denominationStore.addDenomination(catholic);
    for (let i = 0; i < testChurches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testChurches[i] = await db.churchStore.addChurch(catholicList._id, testChurches[i]);
    }
  });

  test("create single church", async () => {
    const anglicanList = await db.denominationStore.addDenomination(anglican);
    const church = await db.churchStore.addChurch(anglicanList._id, whitefriar)
    assert.isNotNull(church._id);
    assertSubset (whitefriar, church);
  });

  test("get multiple churches", async () => {
    const churches = await db.churchStore.getChurchesByDenominationId(catholicList._id);
    assert.equal(churches.length, testChurches.length)
  });

  test("delete all churches", async () => {
    const churches = await db.churchStore.getAllChurches();
    assert.equal(testChurches.length, churches.length);
    await db.churchStore.deleteAllChurches();
    const newChurches = await db.churchStore.getAllChurches();
    assert.equal(0, newChurches.length);
  });

  test("get a church - success", async () => {
    const anglicanList = await db.denominationStore.addDenomination(anglican);
    const church = await db.churchStore.addChurch(anglicanList._id, whitefriar)
    const newChurch = await db.churchStore.getChurchById(church._id);
    assertSubset (whitefriar, newChurch);
  });

  test("delete One Church - success", async () => {
    await db.churchStore.deleteChurch(testChurches[0]._id);
    const churches = await db.churchStore.getAllChurches();
    assert.equal(churches.length, testDenominations.length - 1);
    const deletedChurch = await db.churchStore.getChurchById(testChurches[0]._id);
    assert.isNull(deletedChurch);
  });

  test("get a church - bad params", async () => {
    assert.isNull(await db.churchStore.getChurchById(""));
    assert.isNull(await db.churchStore.getChurchById());
  });

  test("delete one church - fail", async () => {
    await db.churchStore.deleteChurch("bad-id");
    const churches = await db.churchStore.getAllChurches();
    assert.equal(churches.length, testDenominations.length);
  });
});
