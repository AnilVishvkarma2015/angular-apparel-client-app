export interface AppConfigInterface {
    env: {
        name: string;
    };
    logging: {
        console: boolean;
    };
    apiServer: {
        baseURL: string;
    };
}