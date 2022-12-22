import { MessageBroker } from "../message-broker/message-broker";
import { Database } from "../database/database";
import { MESSAGE_BROKER_URL, DATABASE_URL } from "../config/environment";
import { LongTermObserver } from "../reminder/observer/long-term-observer";
import { ShortTermObserver } from "../reminder/observer/short-term-observer";

export async function moveRemindersToNextObserver() {
    if (!MESSAGE_BROKER_URL) {
        throw new Error(
            "Can not start service without specifying Message Broker connection string."
        );
    }
    if (!DATABASE_URL) {
        throw new Error("Can not start service without specifying DB url.");
    }
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
