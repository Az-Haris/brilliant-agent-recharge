const HeaderBalanceSkeleton = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between bg-white rounded-b-2xl border border-[#FA7066]/30 shadow-sm p-4">
        {/* Left: avatar + text skeletons */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Your Name</p>
            <h1 className="text-xl font-bold text-[#FA7066]">৳ 1,250</h1>
          </div>
        </div>

        {/* Right: dimmed Quick Recharge button */}
        <button
          disabled
          className="bg-[#FA7066] text-white px-4 py-2 rounded-lg shadow-sm cursor-not-allowed text-sm"
        >
          Quick Recharge
        </button>
      </div>

      {/* Login overlay */}
      <div className="absolute inset-0 rounded-b-2xl bg-white/60 backdrop-blur-[0.1px] flex items-center justify-center">
        <button className="bg-[#FA7066] text-white text-sm font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-[#e65c4f] active:scale-95 transition-all">
          Login
        </button>
      </div>
    </div>
  );
};

export default HeaderBalanceSkeleton;
