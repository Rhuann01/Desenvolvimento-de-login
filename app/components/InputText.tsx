import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import type { JSX } from "react";

interface InterfaceProps {
  placeholder: string;
  passeword: boolean;
  onChange: (value: string) => void;
  values: string;
}

const iconMap: Record<string, JSX.Element> = {
  Envelope: <EnvelopeIcon className="w-5 text-[#7b7b7bde] " />,
  lock: <LockClosedIcon className="w-5 text-[#7b7b7bde] " />,
};

export default function InputText({
  placeholder,
  passeword = false,
  onChange,
  values,
}: InterfaceProps) {
  return (
    <div className="flex gap-1 relative">
      <input
      value={values}
        className="bg-[#f6f6f67e] shadow flex w-full text-black  placeholder:text-[#7b7b7bde] placeholder:text-sm placeholder:items-center items-center pr-2 pl-8 py-2.5 rounded-xl "
        type={passeword ? "password" : "text"}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className=" absolute left-2 bottom-3">
        {passeword ? iconMap["lock"] : iconMap["Envelope"]}
      </div>
    </div>
  );
}
