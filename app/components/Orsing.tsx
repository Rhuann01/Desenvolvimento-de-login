interface IOr {
  Or: string;
}

export default function Orsing({ Or }: IOr) {
  return (
    <div className=" overflow-hidden w-full flex justify-center items-center gap-0.5 mt-3">
      <hr className=" w-full border-[#1111111e]" />
      <p className="w-full text-xs text-center text-[#11111142]">
        Or {Or} in with
      </p>
      <hr className=" w-full border-[#1111111e]" />
    </div>
  );
}
