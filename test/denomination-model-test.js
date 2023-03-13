import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testDenominations, anglican } from "./fixtures.js";

suite("Denomination Model tests", () => {

  setup(async () => {
    db.init("");
    await db.denominationStore.deleteAllDenominations();
    for (let i = 0; i < testDenominations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDenominations[i] = await db.denominationStore.addDenomination(testDenominations[i]);
    }
  });

  test("create a denomination", async () => {
    const denomination = await db.denominationStore.addDenomination(anglican);
    assert.equal(anglican, denomination);
    assert.isDefined(denomination._id);
  });

  test("delete all denominations", async () => {
    let returnedDenominations = await db.denominationStore.getAllDenominations();
    assert.equal(returnedDenominations.length, 3);
    await db.denominationStore.deleteAllDenominations();
    returnedDenominations = await db.denominationStore.getAllDenominations();
    assert.equal(returnedDenominations.length, 0);
  });

  test("get a denomination - success", async () => {
    const denomination = await db.denominationStore.addDenomination(anglican);
    const returnedDenomination = await db.denominationStore.getDenominationById(denomination._id);
    assert.equal(anglican, denomination);
  });

  test("delete One Denomination - success", async () => {
    const id = testDenominations[0]._id;
    await db.denominationStore.deleteDenominationById(id);
    const returnedDenominations = await db.denominationStore.getAllDenominations();
    assert.equal(returnedDenominations.length, testDenominations.length - 1);
    const deletedDenomination = await db.denominationStore.getDenominationById(id);
    assert.isNull(deletedDenomination);
  });

  test("get a denomination - bad params", async () => {
    assert.isNull(await db.denominationStore.getDenominationById(""));
    assert.isNull(await db.denominationStore.getDenominationById());
  });

  test("delete One Denomination - fail", async () => {
    await db.denominationStore.deleteDenominationById("bad-id");
    const allDenominations = await db.denominationStore.getAllDenominations();
    assert.equal(testDenominations.length, allDenominations.length);
  });
});
