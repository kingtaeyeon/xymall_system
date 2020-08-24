interface ActionParams<T = any> {
    type: string;
    payload: Object<T>
}

interface IState {
    common: {
        retryTip: boolean;
    };
    user: IUser;
    menu: IMenu
}
