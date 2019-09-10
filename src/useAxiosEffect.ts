import * as React from "react";
import axios, { AxiosRequestConfig, CancelTokenSource, AxiosPromise } from "axios";

const handleRejected = (error: any): Promise<void | never> => {
    if (axios.isCancel(error)) {
        return Promise.resolve();
    }
    return Promise.reject(error);
};

export function useAxiosEffect<T = any>(
    effect: (
        cancelToken: AxiosRequestConfig["cancelToken"]
    ) => AxiosPromise<T>,
    deps: any[]
): void {
    React.useEffect(() => {
        let cancelTokenSource: CancelTokenSource | undefined = axios.CancelToken.source();

        effect(cancelTokenSource.token)
            .catch((error) => {
                cancelTokenSource = undefined;
                return Promise.reject(error);
            })
            .then((response) => {
                cancelTokenSource = undefined;
                return response;
            })
            .catch(handleRejected);

        return () => {
            if (!cancelTokenSource) {
                return;
            }
            cancelTokenSource.cancel();
            cancelTokenSource = undefined;
        };
    }, deps);
}
