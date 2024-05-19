export class R<T> {
    code: number; //编码：1成功，0和其它数字为失败
    msg: string; //错误信息
    data: T; //数据
    map: Record<string, unknown> = {}; //动态数据

    static success<T>(object: T): R<T> {
        const r = new R<T>();
        r.data = object;
        r.code = 1;
        return r;
    }

    static error<T>(msg: string): R<T> {
        const r = new R<T>();
        r.msg = msg;
        r.code = 0;
        return r;
    }
    static loginError<T>(msg: string): R<T> {
        const r = new R<T>();
        r.msg = msg;
        r.code = 0;
        return r;
    }
    add(key: string, value: unknown): R<T> {
        this.map[key] = value;
        return this;
    }
    toJSON() {
        const { map, ...rest } = this;
        if (Object.keys(map).length === 0) {
            return rest;
        }
        return this;
    }
}