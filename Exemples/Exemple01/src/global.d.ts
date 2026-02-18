export interface ElectronAPI{
    // Exemple a.
    getAppInfo: () => any;

    // Exemple b.
    performTask: (data: any) => Promise<void>;
    onTaskResult: (callback: (result: any) => void) =>void;

    calculate: (a:number, b:number) => Promise<number>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}