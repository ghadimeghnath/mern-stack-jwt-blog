import React from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import CardsCtn from "../components/CardsCtn";

function Client() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-7xl px-6 py-6">
        <Nav title="blogus" />
        <Header />
        <CardsCtn />
      </div>
    </div>
  );
}

export default Client;
