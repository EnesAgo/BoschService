import React, {useEffect, useState} from 'react'
import Sidebar from "@/views/Sidebar";
import httpRequest from "@/requests/HttpRequest";
import EditDashboard from "@/views/Edit";
import { useRouter } from 'next/router'

export default function Edit() {
    const nextRouter = useRouter()
    const carID = nextRouter.query.CARID

    return (
        <>

            <Sidebar tab={"home"} />
            <EditDashboard carID={carID} />
        </>
    );
}