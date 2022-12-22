export interface IDatabase {
    closeServer(): Promise<void>;
    addToList(listName: string, value: string): Promise<void>;
    getListElements(
        listName: string,
        from?: number,
        to?: number
    ): Promise<string[]>;
    removeList(listName: string): Promise<void>;
}
