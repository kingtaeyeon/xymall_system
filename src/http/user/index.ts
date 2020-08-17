import http from "../http";


export const login = (options: ILogin) => http.post('/login', options);


/**
 * 刷新token
 **/
export const refreshToken = (authToken: string) => http.put('/auth/tokens', {refreshToken}, null);
