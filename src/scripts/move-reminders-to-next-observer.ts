import { MessageBroker } from "../message-broker/message-broker";
import { loadConfig } from "../config";
import { LongTermObserver } from "../reminder/observer/long-term-observer";
import { ShortTermObserver } from "../reminder/observer/short-term-observer";
import { RedisDatabase } from "../database";
import { logger } from "../logger";

export async function moveRemindersToNextObserver() {
    const { MESSAGE_BROKER_URL, DATABASE_URL, QUEUE_NAME } = loadConfig();
    await MessageBroker.connect(MESSAGE_BROKER_URL);
    ShortTermObserver.useEngine(MessageBroker, QUEUE_NAME);
    const db = new RedisDatabase(DATABASE_URL);
    db.startServer();
    LongTermObserver.useEngine(db);
    const { totalReminders, listName } =
        await LongTermObserver.moveNextGroupToNextObserver();
    logger.info(`Successfully ran Move reminders script at ${new Date().toISOString()}: 
        - Moved ${totalReminders} reminder(s)
        - Removed db list: ${listName}`);
    await MessageBroker.closeConnection();
    await db.closeServer();
}

moveRemindersToNextObserver();
