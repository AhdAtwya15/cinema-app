import Cookies, {type CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

class CookieService {
    get(key: string)
    {
        return cookies.get(key);

    }
    set(key: string, value: string, options?: CookieSetOptions)
    {
        return cookies.set(key, value, options);
    }
    remove(key: string, options?: CookieSetOptions)
    {
        return cookies.remove(key, options);
    }
    
}

export default new CookieService();
