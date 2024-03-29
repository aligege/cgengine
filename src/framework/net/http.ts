export class http {
    get(url: string, responseType?: XMLHttpRequestResponseType): Promise<XMLHttpRequest> {
        return new Promise((resolve, reject) => {
            try {
                let xhr = new XMLHttpRequest()
                xhr.withCredentials=true
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        resolve(xhr)
                    }
                }
                xhr.ontimeout = () => {
                    resolve(null)
                }
                xhr.onerror = (err) => {
                    console.log("err url=" + url)
                    console.error(err)
                    resolve(null)
                }
                xhr.responseType = responseType || "json"
                xhr.open("GET", url, true)
                xhr.setRequestHeader("Access-Control-Allow-Origin","*")
                xhr.send()
            }
            catch (err) {
                console.log("err url=" + url)
                console.error(err)
                resolve(null)
            }
        })
    }
    /**
     * 
     * @param url 请求地址
     * @param data 数据
     */
    post(url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let xhr = new XMLHttpRequest()
                //xhr.withCredentials=true
                xhr.onreadystatechange = (ev) => {
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        let jsonData = null
                        try {
                            if (xhr.response) {
                                jsonData = JSON.parse(xhr.response)
                            }
                            else {
                                jsonData = {}
                            }
                        }
                        catch (err) {
                            resolve({ errcode: err })
                            return
                        }
                        resolve(jsonData)
                    }

                }
                xhr.onerror = (err) => {
                    resolve({ errcode: err })
                }
                xhr.ontimeout = (err) => {
                    resolve({ errcode: err })
                }
                xhr.open("post", url, true)
                xhr.setRequestHeader("Content-Type", "application/json")
                xhr.send(JSON.stringify(data || {}))
            }
            catch (err) {
                console.log("err url=" + url)
                console.error(err)
                resolve({ errcode: err })
            }
        })
    }
}