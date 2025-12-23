interface btn {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: btn) {
  return (
    <div>
      <button
        className="bg-[#111] flex w-full text-white justify-center cursor-pointer  items-center px-3 py-3 rounded-xl "
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
