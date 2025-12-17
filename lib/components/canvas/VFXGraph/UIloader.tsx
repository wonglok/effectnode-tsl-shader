// @ts-ignore
let reqUI = import.meta.glob('./GraphUI/*', { eager: true });

let uiTypes: Record<string, any> = {};
Object.keys(reqUI).forEach((key) => {
    let ui: any = reqUI[key];
    if (ui?.name) {
        uiTypes[ui.name] = ui.default;
    }
});

export { uiTypes };
