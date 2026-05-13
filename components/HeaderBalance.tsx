import Image from "next/image";

const HeaderBalance = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between bg-white rounded-b-2xl border border-[#FA7066]/30 shadow-sm p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/brilliant.webp"
            alt="Balance Icon"
            width={40}
            height={40}
            className="rounded-full border border-[#FA7066] shadow-md"
          />
          <div className="">
            <p className="text-sm text-gray-500">Your Name</p>
            <h1 className="text-xl font-bold text-[#FA7066]">৳ 1,250</h1>
          </div>
        </div>

        <button className="bg-[#FA7066] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#e65c4f] transition-colors">
          Quick Recharge
        </button>
      </div>
    </div>
  );
};

export default HeaderBalance;
