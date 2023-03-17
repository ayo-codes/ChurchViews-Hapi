import { assert } from "chai";
import { churchviewService } from "./churchview-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers , maggieCredentials } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    churchviewService.clearAuth();
    await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggieCredentials);
    await churchviewService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await churchviewService.createUser(testUsers[i]);
    }
    await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggieCredentials);
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await churchviewService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users via API", async () => {
    let returnedUsers = await churchviewService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await churchviewService.deleteAllUsers();
    await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggieCredentials);
    returnedUsers = await churchviewService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await churchviewService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await churchviewService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await churchviewService.deleteAllUsers();
    await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggieCredentials);
    try {
      const returnedUser = await churchviewService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

});
