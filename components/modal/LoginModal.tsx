"use client"
import React, { FormEvent, useState } from "react";
import { useLoginModal, useRegisterModal } from "../ClientContext";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const { opened, onClose } = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
    })

    if (res?.error) {
      console.log(res?.error);
    } else {
      console.log(res?.status)
    }

    onClose();
  }

  function handleClose() {
    setEmail("");
    setPassword("");

    onClose();
  }

  if (opened) {
    return (
      <div className="bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md">
          <header>
            <h2 className="font-bold text-2xl">Log in</h2>
            <p>Don't have an account? <button className="text-blue-600 hover:underline" onClick={() => {
              onClose();
              registerModal.onOpen();
            }}>Create one</button></p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="block my-3">
              <label className="text-sm" htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="johndoe@gmail.com" className="border-solid border-[1px] px-3 border-neutral-300 w-full py-[6px] rounded-md mt-1 outline-blue-500" required />
            </div>
            <div className="block my-3">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" placeholder="*****" className="border-solid border-[1px] px-3 border-neutral-300 w-full py-[6px] rounded-md mt-1 outline-blue-500" required />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="py-2 px-4 border-solid border-[1px] border-neutral-300 rounded-md hover:underline" onClick={handleClose}>Close</button>
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:underline hover:bg-blue-600">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}