import React, { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import PreLoader from "./PreLoader";

export default function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <section className="px-3 w-full flex justify-center">
        <div className="w-full xl:w-2/3 ">
          <Suspense fallback={<PreLoader></PreLoader>}>
            <Outlet></Outlet>
          </Suspense>
        </div>
      </section>
    </>
  );
}
