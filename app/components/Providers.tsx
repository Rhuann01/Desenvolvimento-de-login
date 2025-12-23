import Image from "next/image";

interface providers {
  provider: string;
  icon: string;
  onClick: () => void;
}

export default function Providers({ provider, icon, onClick }: providers) {
  return (
    <div className="w-full flex justify-center items-center bg-neutral-50 shadow select-none py-2 px-3 rounded-lg cursor-pointer">
      <Image src={icon} alt={provider} width={6} height={6} className="w-6" />
    </div>
  );
}
