"use client";

import InputText from "@/app/components/InputText";
import ButtonSend from "@/app/components/ButtonSend";
import Orsing from "@/app/components/Orsing";
import Providers from "@/app/components/Providers";
import { useState } from "react";
import Link from "next/link";
import Fluter from "@/app/components/Fluter";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [key, setKey] = useState(0);
  const [mess, setMess] = useState("");
  const [red, setRed] = useState(true);

  async function handleLogin() {
    if (!email || !password) {
      setMess("Os inputs estão vazios");
      setKey(key + 1);
      return;
    }

    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      setMess(data.message);
      setKey(key + 1);
      setRed(data.red);

      if (data.tokenExist) {
        router.push("/feed");
      }
    } catch (error) {
      console.error("Deu ruim pae", error);
    }
  }

  return (
    <div className="w-screen h-screen bg-[url('/fundo.webp')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
      {mess && <Fluter red={red} key={key} message={mess} />}
      <div className="w-110 shadow-2xs flex flex-col gap-2 px-6 py-7 bg-fundo-gradiente rounded-2xl border-2 border-[#ffffff1d]">
        <div className="flex flex-col justify-center items-center text-center mb-5">
          <h1 className="text-2xl font-bold">Sign in with email</h1>
          <p className="text-[#44444482] text-md font-light">
            Make new doc to bring your words, data, and teams together, For free
          </p>
        </div>
        <div className="space-y-3">
          <InputText
            values={email}
            placeholder="Email"
            passeword={false}
            onChange={setEmail}
          />
          <InputText
            values={password}
            placeholder="Password"
            passeword={true}
            onChange={setSenha}
          />
        </div>
        <p className="text-[#44444482] my-0.5 select-none font-semibold text-md cursor-pointer text-sm w-full text-right">
          Forgot password?
        </p>
        <ButtonSend text="Get Started" onClick={handleLogin} />
        <Orsing Or="sign" />
        <div className="flex w-full gap-2 py-1 px-2">
          <Providers
            provider="Google"
            icon="/Google.svg"
            onClick={() => {
              console.log("Google");
            }}
          />
          <Providers
            provider="GitHub"
            icon="/GitHub.svg"
            onClick={() => {
              console.log("GitHub");
            }}
          />
          <Providers
            provider="Apple"
            icon="/Apple.svg"
            onClick={() => {
              console.log("Apple");
            }}
          />
        </div>
        <p className="flex justify-center items-center text-sm text-[#44444482] gap-0.5">
          Don´t have on accont?
          <Link href={"/register"} className=" font-bold text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
