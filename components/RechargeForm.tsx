"use client";

import Image from "next/image";
import { useState } from "react";

const SEND_NUMBER = "01784410162";
const WHATSAPP_NUMBER = "1784410162";

export default function RechargeForm() {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [number, setNumber] = useState("");
  const [last4Digit, setLast4Digit] = useState("");
  const [loading, setLoading] = useState(false);

  const copyNumber = async () => {
    await navigator.clipboard.writeText(SEND_NUMBER);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `*Brilliant Recharge Request*

📱 *Number:* ${number}
💰 *Amount:* ৳${amount}
💳 *Method:* ${method}
🔢 *Last 4 Digit:* ${last4Digit}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    await fetch("/api/recharge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, amount, method, last4Digit }),
    });

    setLoading(false);
    // Reset form
    setNumber("");
    setAmount("");
    setMethod("");
    setLast4Digit("");
  };

  return (
    <>
      <section className="relative w-full px-3">
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-[#FA7066]/30 shadow-sm p-4 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-0">
            <h1 className="text-2xl font-bold text-[#FA7066]">
              Agent Recharge
            </h1>
            <div>
              <Image
                src="/brilliant.webp"
                alt="Brilliant Logo"
                width={50}
                height={50}
                className="rounded-xl border border-[#FA7066] shadow-lg"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="ml-1 text-sm font-medium text-gray-700">
              Brilliant / Mobile Number
            </label>

            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              pattern="^(01[3-9]\d{8}|09\d{9})$"
              placeholder="09XXX / 01XXX"
              maxLength={11}
              required
              className="w-full mt-1 h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-[#FA7066]"
            />
          </div>

          {/* Amount */}
          <div>
            <div className="flex items-center justify-between">
              <label className="ml-1 text-sm font-medium text-gray-700">
                Recharge Amount
              </label>

              <span className="text-xs text-gray-400">Minimum ৳20</span>
            </div>

            <input
              type="number"
              min={20}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="৳ Enter amount"
              required
              className="w-full mt-1 h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-[#FA7066]"
            />
          </div>

          {/* Send Money */}
          <div>
            <div className="flex items-center justify-between">
              <label className="ml-1 text-sm font-medium text-gray-700">
                Send Money To
              </label>

              <button
                type="button"
                onClick={() => setShowInfo(true)}
                className="text-xs text-[#FA7066] font-medium cursor-pointer"
              >
                How?
              </button>
            </div>

            <div className="flex gap-2 mt-1">
              <input
                readOnly
                value={SEND_NUMBER}
                className="flex-1 h-11 rounded-xl border border-gray-300 px-3 text-sm bg-gray-50"
              />

              <button
                type="button"
                onClick={copyNumber}
                className={`px-4 rounded-xl text-sm font-medium transition cursor-pointer
                  ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-[#1A3955] text-white"
                  }`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Method + Last 4 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="ml-1 text-sm font-medium text-gray-700">
                Payment Method
              </label>

              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                required
                className="w-full mt-1 h-11 rounded-xl border border-gray-300 px-3 text-sm outline-none focus:border-[#FA7066]"
              >
                <option value="" disabled>
                  bKash/Nagad/Rocket
                </option>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
              </select>
            </div>

            <div>
              <label className="ml-1 text-sm font-medium text-gray-700">
                Last 4 Digit
              </label>

              <input
                type="tel"
                value={last4Digit}
                onChange={(e) => setLast4Digit(e.target.value)}
                pattern="[0-9]{4}"
                maxLength={4}
                placeholder="1234"
                required
                className="w-full mt-1 h-11 rounded-xl border border-gray-300 px-3 text-sm tracking-widest outline-none focus:border-[#FA7066]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#1A3955] text-white font-semibold active:scale-[0.99] transition cursor-pointer"
          >
            {loading ? "Processing..." : "Recharge Now"}
          </button>
        </form>
      </section>

      {/* Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 animate-slide-up">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

            <h2 className="text-lg font-bold">How to Send Money</h2>

            <p className="text-sm text-gray-600 mt-2 leading-6">
              Open your mobile banking app and send money to:
            </p>

            <div className="mt-3 bg-gray-100 rounded-xl p-3 text-center text-lg font-bold">
              {SEND_NUMBER}
            </div>

            <p className="text-sm text-gray-600 mt-4 leading-6">
              After payment, enter the last 4 digits of the phone number used
              for the transaction.
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="w-full h-11 rounded-xl bg-[#1A3955] text-white mt-5 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
