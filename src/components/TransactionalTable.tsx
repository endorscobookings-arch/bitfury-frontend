import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
}

interface TransactionsResponse {
  success: boolean;
  transactions?: Array<{
    id: number;
    transaction_type: string;
    amount: number;
    status: string;
    created_at: string;
  }>;
}

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/transactions`)
      .then((res) => res.json())
      .then((data: TransactionsResponse) => {
        const rows = data.transactions ?? [];
        setTransactions(
          rows.map((tx) => ({
            id: tx.id,
            type: tx.transaction_type,
            amount: tx.amount,
            status: tx.status,
            date: tx.created_at,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="transaction-table">
      <h2>Recent Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.type}</td>
              <td>${tx.amount}</td>
              <td>{tx.status}</td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
