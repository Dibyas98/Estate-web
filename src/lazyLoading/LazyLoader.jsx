import React, { lazy } from 'react'
export const LazyListing = lazy(() => import("../component/Listing"))
export const LazyListView = lazy(()=> import ('../component/ListView'))
export default function LazyLoader() {
    return (
        <></>
    )
}
