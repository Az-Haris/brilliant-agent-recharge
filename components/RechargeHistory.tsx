"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CircleX, Clock } from "lucide-react";

type Status = "Pending" | "Success" | "Rejected";
type Row = { number: string; amount: number; status: Status };

function StatusBadge({ status }: { status: Status }) {
  if (status === "Success") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
        <CheckCircle2 className="w-3 h-3" /> Success
      </span>
    );
  }
  if (status === "Rejected") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 border border-red-200">
        <CircleX className="w-3 h-3" /> Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

export default function RechargeHistory() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recharge")
      .then((r) => r.json())
      .then((data) => {
        setRows(data.records ?? []);
        console.log(data.records);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full px-4 mx-auto relative">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl text-[#FA7066] font-bold">
          Latest Recharge History
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Recent top-ups processed by our agents
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#FA7066]/50 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[#1A3955] text-white">
            <tr className="text-center">
              <th className="px-4 py-3 font-semibold">Number</th>
              <th className="px-2 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-400">
                  No records yet
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr
                  key={i}
                  className="text-center border-t border-[#FA7066]/50"
                >
                  <td className="px-4 py-3 font-mono">{r.number}</td>
                  <td className="px-2 py-3 font-semibold">৳{r.amount}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
