import React, {useEffect, useState} from 'react'
import Sidebar from "@/views/Sidebar";
import CreateDashboard from "@/views/Create";
import httpRequest from "@/requests/HttpRequest";

export default function Create() {

    const [carPropTypes, setCarPropTypes] = useState()

    async function getCarPropTypes(){
        const response:any = await httpRequest.get("/getAllCarPropTypes")
        console.log(response)
        setCarPropTypes(response)
    }

    useEffect(() => {
        getCarPropTypes()
    }, [])

    return (
        <>
            <Sidebar tab={"home"} />
            <CreateDashboard />
        </>
    );
}