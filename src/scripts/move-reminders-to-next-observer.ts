import { MessageBroker } from "../message-broker/message-broker";
import { Database } from "../database/database";
import { loadConfig } from "../config";
import { LongTermObserver } from "../reminder/observer/long-term-observer";
import { ShortTermObserver } from "../reminder/observer/short-term-observer";

export async function moveRemindersToNextObserver() {
    const { MESSAGE_BROKER_URL, DATABASE_URL } = loadConfig();
    await MessageBroker.connect(MESSAGE_BROKER_URL);
    ShortTermObserver.useEngine(MessageBroker);
    Database.startServer(DATABASE_URL);
    LongTermObserver.useEngine(Database);
    const { totalReminders, listName } =
        await LongTermObserver.moveNextGroupToNextObserver();
    console.log(`Successfully ran Move reminders script at ${new Date().toISOString()}: 
        - Moved ${totalReminders} reminder(s)
        - Removed db list: ${listName}`);
    await MessageBroker.closeConnection();
    await Database.closeServer();
}

moveRemindersToNextObserver();
