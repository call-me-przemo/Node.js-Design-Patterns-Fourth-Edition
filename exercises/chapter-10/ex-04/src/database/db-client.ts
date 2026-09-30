import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

export class DbClient {
  private db: Database | null = null;

  constructor(private readonly dbPath: string) {}

  public async query(sql: string, params?: Array<string | number>) {
    const db = await this.connect();

    return db.all(sql, params);
  }

  public async close() {
    if (this.db) {
      await this.db.close();

      this.db = null;
    }
  }

  private async connect() {
    if (this.db) {
      return this.db;
    }

    this.db = await open({ filename: this.dbPath, driver: sqlite3.Database });

    return this.db;
  }
}
