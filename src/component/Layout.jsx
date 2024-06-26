import React, { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import PreLoader from "./PreLoader";

export default function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <Suspense fallback={<PreLoader></PreLoader>}>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
}
