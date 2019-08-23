export class Config {
    public static baseUrl = (process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : process.env.API_URL) + '/api';
}
