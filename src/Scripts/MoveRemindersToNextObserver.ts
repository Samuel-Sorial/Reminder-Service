import { MessageBroker } from "../MessageBroker/MessageBroker";
import { Database } from "../Database/Database";
import { MESSAGE_BROKER_URL, DATABASE_URL } from "../Config/Environment";
import { LongTermObserver } from "../Reminder/Observer/LongTermObserver";

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
    Database.startServer(DATABASE_URL);
    const { totalReminders, listName } =
        await LongTermObserver.moveNextGroupToNextObserver();
    console.log(`Successfully ran Move reminders script at ${new Date().toISOString()}: 
        - Moved ${totalReminders} reminder(s)
        - Removed db list: ${listName}`);
}

moveRemindersToNextObserver();
