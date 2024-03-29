export declare class http {
    get(url: string, responseType?: XMLHttpRequestResponseType): Promise<XMLHttpRequest>;
    /**
     *
     * @param url 请求地址
     * @param data 数据
     */
    post(url: string, data?: any): Promise<any>;
}
