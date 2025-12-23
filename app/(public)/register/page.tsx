"use client";

import InputText from "@/app/components/InputText";
import ButtonSend from "@/app/components/ButtonSend";
import Orsing from "@/app/components/Orsing";
import Providers from "@/app/components/Providers";
import { useState } from "react";
import Link from "next/link";
import { verifyPass } from "@/utils/verifyPass";
import Fluter from "@/app/components/Fluter";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [mess, setMess] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0);

  async function handleLogin() {
    const emailVerify = /@gmail.com/.test(email);

    if (!email || !password) {
      setMess("Todas as areas devem ser preenchidas");
      setKey(key + 1);
      console.log("chamou");
      return;
    }

    if (!emailVerify) {
      setMess("email incompleto");
      setKey(key + 1);
      return;
    }

    const erro = verifyPass(password);
    if (erro) {
      setMess(erro);
      setKey(key + 1);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      setMess(data.message);
      setKey(key + 1);

      if (data.exist) {
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Deu ruim", error);
    }
  }

  return (
    <div className="w-screen h-screen bg-[url('/fundo.webp')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
      {mess && <Fluter key={key} message={mess} red={true} />}
      <div className="w-110 shadow-2xs flex flex-col gap-2 px-6 py-7 bg-fundo-gradiente rounded-2xl border-2 border-[#ffffff1d]">
        <div className="flex flex-col justify-center items-center text-center mb-5">
          <h1 className="text-2xl font-bold">Register in with email</h1>
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
        <Link
          href="/login"
          className="text-[#11111182] my-0.5 select-none font-semibold text-md cursor-pointer text-sm w-full text-right"
        >
          Already have an account?
        </Link>
        <ButtonSend text="Get Started" onClick={handleLogin} />
        <Orsing Or="register" />
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
          Already have an account?
          <Link href={"/login"} className=" font-bold text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
