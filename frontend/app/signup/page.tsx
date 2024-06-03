"use client";
// import { Button } from "@/components/Button";
// import InputBox from "@/components/InputBox";
import Link from "next/link";
import React, { useRef } from "react";
import { BACKEND_URL } from "../lib/Constants";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    try {
      const res = await fetch(BACKEND_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: data.current.name,
          username: data.current.email,
          password: data.current.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", res);
      if (!res.ok) {
        alert(res.statusText);
        return;
      }
      const response = await res.json();
      alert("User Registered!");
      console.log({ response });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          autoComplete="off"
          name="name"
          labelText="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
