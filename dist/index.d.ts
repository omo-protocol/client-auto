declare const AutoClientInterface: {
    name: string;
    config: {};
    start: (runtime: any) => Promise<any>;
    stop: (_runtime: any) => Promise<void>;
};

export { AutoClientInterface, AutoClientInterface as default };
