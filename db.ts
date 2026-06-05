import fs from 'fs';
import path from 'path';

// Define the shape of our mock database
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  passwordHash: string;
}

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface Database {
  users: User[];
  transactions: Transaction[];
}

const dbPath = path.join(process.cwd(), 'data.json');

// Initialize database file if it doesn't exist
function initDb() {
  if (!fs.existsSync(dbPath)) {
    const initialData: Database = {
      users: [],
      transactions: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export function readDb(): Database {
  initDb();
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data) as Database;
}

export function writeDb(data: Database) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}
