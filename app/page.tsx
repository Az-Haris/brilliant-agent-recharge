import HeroCarousel from "@/components/HeroCarousel";
import RechargeForm from "@/components/RechargeForm";
import RechargeHistory from "@/components/RechargeHistory";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-xl flex-col gap-6 items-center justify-between px-6 dark:bg-black sm:items-start">
        <HeroCarousel />
        <RechargeForm />
        <RechargeHistory />
      </main>
    </div>
  );
}
