export default class WindowHandler {
    private parentWindow: Window;

    constructor(parentWindow) {
        this.parentWindow = parentWindow;
    }

    public openNewWindow(url: string, windowName: string) {
        if (windowName && url) {
            const childWindow: Window = window.open(url, windowName);
            window.childWindows.push({
                name: windowName,
                url,
                reference: childWindow
            });
        }
    }

    private checkIfCorrectWindow(item: ChildWindow, url: string, windowName: string): boolean {
        return (item.url == url) && (item.name == windowName);
    }

    public closeWindow(url: string, windowName: string) {
        const cWindow: ChildWindow = window.childWindows.find(item => this.checkIfCorrectWindow(item, url, windowName) );
        if (cWindow) {
            cWindow.reference?.close();
            window.childWindows = window.childWindows.filter(item => !this.checkIfCorrectWindow(item, url, windowName));
        }
    }

    public getAllOpenChildWindows(): Array<ChildWindow> {
        return window.childWindows.filter(i => !i.reference?.closed);
    }

    public publishToOtherWindows(event: string, data: any, sourceWindow: Window | MessageEventSource) {
        this.publishToAllChildWindows(event, data, sourceWindow);
        this.publishToParentWindow(event, data, sourceWindow);
    }

    public publishToAllChildWindows(event: string, data: any, sourceWindow: Window | MessageEventSource) {
        this.getAllOpenChildWindows().forEach(item => {
            if (item.reference !== sourceWindow) {
                item.reference.postMessage({event, data}, '*');
            }
        });
    }

    public publishToParentWindow(event: string, data: any, sourceWindow: Window | MessageEventSource) {
        //TODO: check if parent window is same origin or not
        if (!this.parentWindow?.closed && sourceWindow != this.parentWindow) {
            // (this.parentWindow as any)?.publishEvent?.(event, data, window.name);
            this.parentWindow?.postMessage({event, data}, '*');
        }
    }

    public closeAllChildWindows(): void {
        this.getAllOpenChildWindows().forEach(item => item.reference?.close?.());
    }
}