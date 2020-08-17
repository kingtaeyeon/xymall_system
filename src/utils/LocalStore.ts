/**
 * 简单封装本地存储 供外部调用
 * @author LiHao
 * @since 2020-08-04 19:40
 **/
const store = window.localStorage;

class LocalStore {
    /*
     * 设置数据：如果value是object 会调用JSON.stringify自动转换为字符串
     */
    public static set(key: string, value: any) {
        if( !store) {
            return;
        }
        // 备份一份
        let v = value;

        try {
            if( typeof  value == 'object') {
                v = JSON.stringify(v);
            }

            store.setItem(key, v);
        } catch(error)  {
            // 做错误处理
        }
    }

    /**
     * 直接获取原始数据
     **/
    public static get (key: string) {
        if( !store ) {
            return;
        }

        return store.getItem(key);
    }

    /*
     * 获取的同时 转换为JSON
     */
    public static getJson(key: string) {
        if( !store ) {
            return;
        }

        const data = store.getItem(key);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                // do..
            }
        }
    }

    /**
     * 删除
     * @param key
     */
    public static remove(key: string) {
        if( !store ) {
            return;
        }

        try {
            store.removeItem(key);
        } catch (error) {
            // do..
        }
    }
}
export default LocalStore;
