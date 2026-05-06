"use client";

import { useState } from "react";

const SEND_NUMBER = "01784410162";
const QUICK_AMOUNTS = [20, 50, 100, 200, 500];

export default function RechargeForm() {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(SEND_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Recharge request submitted");
  };

  return (
    <section className="relative w-full px-4 mx-auto">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl p-5 border border-[#FA7066]/50 space-y-5"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#FA7066]">
            Quick Recharge
          </h1>
          <p className="text-sm text-gray-500">Top-up any number in seconds</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">
            📱 Brilliant or Mobile Number
          </label>
          <input
            type="tel"
            pattern="[0-9]{11}"
            placeholder="0963*** or 01***"
            required
            className="w-full h-12 border rounded-lg px-3"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block font-semibold mb-1">💰 Enter Amount</label>
          <input
            type="number"
            min={20}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="৳0"
            required
            className="w-full h-12 border rounded-lg px-3"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(String(a))}
                className="px-3 py-1 text-sm rounded-full border hover:bg-gray-200 active:scale-95"
              >
                ৳{a}
              </button>
            ))}
          </div>
        </div>

        {/* Send Number */}
        <div>
          <label className="block font-semibold mb-1">💳 Send Money To</label>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                readOnly
                value={SEND_NUMBER}
                className="w-full h-12 border rounded-lg px-3 pr-20 font-mono"
              />

              <button
                type="button"
                onClick={copyNumber}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-yellow-400 rounded-lg text-sm"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowInfo(true)}
              className="h-12 w-12 bg-blue-600 text-white rounded-lg"
            >
              i
            </button>
          </div>
        </div>

        {/* Payment Method + Last 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full h-12 border rounded-lg px-3"
              required
            >
              <option value="">Select Method</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">🔢 Last 4 Digits</label>
            <input
              type="tel"
              pattern="[0-9]{4}"
              maxLength={4}
              placeholder="1234"
              required
              className="w-full h-12 border rounded-lg px-3 text-center tracking-widest"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 bg-[#1A3955] text-white rounded-lg font-semibold hover:opacity-90"
        >
          Recharge Now
        </button>
      </form>

      {/* Modal (Info) */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-5 max-w-md w-full">
            <h2 className="text-lg font-bold mb-2">How to Send Money</h2>
            <p className="text-sm text-gray-600">
              Open bKash / Nagad / Rocket → Send Money → enter{" "}
              <span className="font-mono font-semibold">{SEND_NUMBER}</span> →
              enter amount → confirm. Then enter last 4 digits here.
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
