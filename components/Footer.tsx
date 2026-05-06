import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#1A3955] text-white py-8 rounded-t-xl relative">
      <div className="container mx-auto px-4 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-lg">
          <Zap className="h-5 w-5 fill-current" /> Brilliant Recharge
        </div>
        <p className="text-sm text-primary-foreground/80">
          © 2026 Brilliant Recharge Agent. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
