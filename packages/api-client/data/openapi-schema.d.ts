export interface paths {
    "/size": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Package size data */
        get: {
            parameters: {
                query: {
                    /** @description Set the input */
                    input: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successfully fetched data */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {number} */
                            status: 400;
                            id: string;
                            message: string;
                            error: Record<string, never>;
                            help: string;
                        };
                    };
                };
                /** @description Internal Server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @enum {number} */
                            status: 500;
                            id: string;
                            message: string;
                            error: Record<string, never>;
                            help: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
