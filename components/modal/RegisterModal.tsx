"use client"
import React, { FormEvent, useEffect, useState } from "react";
import { useRegisterModal, useLoginModal } from "../ClientContext";
import { createUser } from "@/actions/user";

export default function RegisterModal() {
  const loginModal = useLoginModal();
  const { opened, onClose } = useRegisterModal();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState<string>("");

  const resetValues = () => {
    setEmail("");
    setName({ firstName: '', lastName: '' });
    setBio("");
    setPassword("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await createUser({
      email,
      firstName: name.firstName,
      lastName: name.lastName,
      bio,
      password
    })
      .then(user => {
        onClose();
        loginModal.onOpen();

        resetValues();
      })
      .catch(err => {
        alert(err.message)
      });
  }

  function handleClose() {
    resetValues();

    onClose();
  }

  if (opened) {
    return (
      <div className="bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md">
          <header>
            <h2 className="font-bold text-2xl">Create account</h2>
            <p>Already have an account? <button className="text-blue-600 hover:underline" onClick={() => {
              onClose();
              loginModal.onOpen();
            }}>Log in</button></p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="block my-3">
              <label className="text-sm" htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="johndoe@gmail.com" className="border-solid border-[1px] px-3 border-neutral-300 w-[340px] block max-w-full py-[6px] rounded-md mt-1 outline-blue-500" required />
            </div>
            <div className="block my-3">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" id="password" placeholder="*****" className="border-solid border-[1px] px-3 border-neutral-300 w-[340px] block max-w-full py-[6px] rounded-md mt-1 outline-blue-500" required />
            </div>
            <div className="block my-3">
              <label htmlFor="firstName">First name</label>
              <input value={name.firstName} onChange={(e) => setName({ ...name, firstName: e.target.value })} type="text" id="firstName" placeholder="John" className="border-solid border-[1px] px-3 border-neutral-300 w-[340px] block max-w-full py-[6px] rounded-md mt-1 outline-blue-500" required />
            </div>
            <div className="block my-3">
              <label htmlFor="lastName">Last name</label>
              <input value={name.lastName} onChange={(e) => setName({ ...name, lastName: e.target.value })} type="text" id="lastName" placeholder="Smith" className="border-solid border-[1px] px-3 border-neutral-300 w-[340px] block max-w-full py-[6px] rounded-md mt-1 outline-blue-500" required />
            </div>
            <div className="block my-3">
              <label htmlFor="bio">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} id="bio" placeholder="I'm a frontend developer fluent in multiple programming languages..." className="border-solid border-[1px] px-3 border-neutral-300 w-[340px] block max-w-full py-[6px] rounded-md mt-1 outline-blue-500" cols={30} rows={5}></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="py-2 px-4 border-solid border-[1px] border-neutral-300 rounded-md hover:underline" onClick={handleClose}>Close</button>
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:underline hover:bg-blue-600">Create account</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}