import { RedisDatabase } from "./redis-database";
import * as redisMock from "redis-mock";

describe("RedisDatabase", () => {
    let redisDatabase: RedisDatabase;
    let mockClient: redisMock.RedisClient;

    beforeEach(() => {
        mockClient = redisMock.createClient();
        try {
            redisDatabase = new RedisDatabase("fake-url");
            // Override the private `client` property with the mock client
            redisDatabase["client"] = mockClient;
        } catch (err) {}
    });

    afterEach(() => {
        mockClient.flushall();
    });

    describe("addToList", () => {
        it("should add an element to the list", async () => {
            await redisDatabase.addToList("my-list", "element1");
            expect(await redisDatabase.getListElements("my-list")).toEqual([
                "element1",
            ]);
        });
    });
});
