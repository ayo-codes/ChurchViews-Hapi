import { assert } from "chai";
import { churchviewService } from "./churchview-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    churchviewService.clearAuth();
    await churchviewService.createUser(maggie);
    await churchviewService.authenticate(maggieCredentials);
    await churchviewService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await churchviewService.createUser(maggie);
    const response = await churchviewService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await churchviewService.createUser(maggie);
    const response = await churchviewService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    churchviewService.clearAuth();
    try {
      await churchviewService.deleteAllUsers(); 
      assert.fail("Route not protected");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.statusCode);
      assert.equal(error.response.data.statusCode, 401);
    }
  });

});
