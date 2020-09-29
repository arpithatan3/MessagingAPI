declare var registry: Registry;
declare var childWindows: Array<ChildWindow>;

interface Registry {
    [key: string]: Array<Function>
}

interface ChildWindow {
    name: string,
    url: string,
    reference: Window
}


interface Status {
    status: boolean,
    status_code: string,
    message: string
}