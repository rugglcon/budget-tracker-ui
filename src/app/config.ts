export class Config {
    public static baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/api' : process.env.API_URL;
}
