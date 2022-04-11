export class DbConfig {
    private _host = 'localhost';
    private _port = 5432;
    private _userName = 'postgres';

    private _logging = false;
    private _password = '';
    private _database = 'mec';
    private _driver = 'postgres';

    public get host(): string {
        return this._host;
    }

    public get port(): number {
        return this._port;
    }

    public get userName(): string {
        return this._userName;
    }

    public get password(): string {
        return this._password;
    }

    public get logging(): boolean {
        return this._logging;
    }

    public get database(): string {
        return this._database;
    }

    public get driver(): string {
        return this._driver;
    }

    public deserialize(setting: any): void {
        if (!setting) {
            return;
        }

        if (typeof setting.host === 'string') {
            this._host = setting.host;
        }

        if (typeof setting.userName === 'string') {
            this._userName = setting.userName;
        }

        if (typeof setting.password === 'string') {
            this._password = setting.password;
        }

        if (typeof setting.database === 'string') {
            this._database = setting.database;
        }

        if (typeof setting.logging === 'boolean') {
            this._logging = setting.logging;
        }

        if (typeof setting.driver === 'string') {
            this._driver = setting.driver;
        }

        this._port = parseInt(setting.port);
    }

    public serialize(): object {
        return {
            driver: this.driver,
            host: this.host,
            port: this.port,
            userName: this.userName,
            password: this.password,
            logging: this.logging,
            database: this.database,
        };
    }
}