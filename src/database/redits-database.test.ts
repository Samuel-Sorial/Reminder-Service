import { RedisDatabase } from "./redis-database";
import * as redisMock from "redis-mock";
import { logger } from "../logger";

const listNames = {
    add: "add-test-list",
    get: "get-test-list",
    remove: "remove-test-list",
    nonExisting: "non-existing-list",
};
describe("RedisDatabase", () => {
    let redisDatabase: RedisDatabase;
    let mockClient: redisMock.RedisClient;
    beforeAll(() => {
        logger.silent = true;
    });
    afterAll(() => {
        logger.silent = false;
    });

    beforeEach(() => {
        mockClient = redisMock.createClient();
        redisDatabase = new RedisDatabase("");
        redisDatabase["client"] = mockClient;
    });

    afterEach(() => {
        mockClient.flushall();
    });

    describe("addToList", () => {
        it("should add an element to the list", async () => {
            await redisDatabase.addToList(listNames.add, "element1");
            expect(await redisDatabase.getListElements(listNames.add)).toEqual([
                "element1",
            ]);
        });
    });

    describe("getListElements", () => {
        it("should return the elements in the list", async () => {
            await redisDatabase.addToList(listNames.get, "element1");
            await redisDatabase.addToList(listNames.get, "element2");
            await redisDatabase.addToList(listNames.get, "element3");

            const elements = await redisDatabase.getListElements(listNames.get);
            expect(elements).toEqual(
                expect.arrayContaining(["element1", "element2", "element3"])
            );
        });

        it("should return an empty array if the list does not exist", async () => {
            const elements = await redisDatabase.getListElements(
                listNames.nonExisting
            );
            expect(elements).toEqual([]);
        });
    });

    describe("removeList", () => {
        it("should remove an existing list", async () => {
            await redisDatabase.addToList(listNames.remove, "element1");
            await redisDatabase.removeList(listNames.remove);
            expect(
                await redisDatabase.getListElements(listNames.remove)
            ).toEqual([]);
        });

        it("should complete even if the list does not exist", async () => {
            await redisDatabase.removeList(listNames.remove);
            expect(
                await redisDatabase.getListElements(listNames.remove)
            ).toEqual([]);
        });
    });
});
