import React, { lazy } from 'react'
export const LazyListing = lazy(() => import("../component/Listing"))
export default function LazyLoader() {
    return (
        <></>
    )
}
