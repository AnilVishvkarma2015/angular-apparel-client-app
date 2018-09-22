export interface AppConfigInterface {
    env: {
        name: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    apiServer: {
        metadata: string;
        rules: string;
    };
}