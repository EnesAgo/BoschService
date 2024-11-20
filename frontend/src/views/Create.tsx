import React, {useEffect, useState} from "react";
import HeaderBar from "@/components/Dashboard/HeaderBar";
import httpRequest from "@/requests/HttpRequest";
import {alertError, alertSuccess} from "@/functions/alertFunctions";

export default function CreateDashboard({carProps}: any) {

    const [inputs, setInputs] = useState<any>([])
    const [userCreds, setUserCreds] = useState<any>(undefined)

    useEffect(() => {
        if(localStorage.jwt){
            setUserCreds(JSON.parse(localStorage.jwt))
        }

        if(carProps.CarPropTypes) setInputs(carProps.CarPropTypes)
    }, [carProps])


    async function submitForm(e:any) {
        e.preventDefault()
        // console.log(userCreds)

        let carID = "";

        inputs.forEach((inputEl:any) => {
            // console.log(e.target[inputEl.Title])
            if(inputEl.Title == "carID") carID=e.target[inputEl.Title].value
        })

        // console.log(carID)

        const createCarData = {
            carID: carID,
            userUUID: userCreds.uuID,
        }

        try{

            const newCarRes:any = await httpRequest.post("/createCar", createCarData)
            if(newCarRes.error){
                console.log(`error: ${newCarRes.error}`)
                alertError('Error Occurred');
                return
            }
            console.log(newCarRes.carUUID)



            for (const inputEl of inputs) {

                const carPropData = {
                    Title: e.target[inputEl.Title].value,
                    carUUID: newCarRes.carUUID,
                    carPropTypeTitle:inputEl.Title
                }

                try{

                    const carPropRes:any = await httpRequest.post("/createCarProp", carPropData)
                    if(carPropRes.error){
                        console.log(`error: ${carPropRes.error}`)
                        alertError('Error Occurred');
                        return
                    }
                    console.log(carPropRes)

                } catch (e) {
                    console.log(`error: ${e}`)
                    alertError('Error Occurred');
                    return
                }
            }

            alertSuccess("Car Successfully created")

            inputs.forEach((inputEl:any) => {
                e.target[inputEl.Title].value = ''
            })


        } catch (e) {
            alertError('Error Occurred');
            console.log(`error: ${e}`)
        }

    }

    return (
        <div className="gridMain bg-[#F0F0F0] flex flex-col">
            <HeaderBar />
            <div className="w-full h-full flex flex-col gap-6 items-center mt-5">
                <form className={"w-[70%] flex flex-col gap-14 relative items-center mt-10 bg-white py-24 shadow rounded-2xl"} onSubmit={submitForm}>

                    <h1 className={"absolute top-7 font-bold text-xl font-Poppins"}>Create New Car Registration</h1>


                    <section className="flex w-[90%] flex-wrap items-center justify-center gap-14">


                            {
                                inputs && inputs.map((e:any, i:any) => (
                                <label className={"mx-4"} key={i}>
                                <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                 font-Poppints">{e.Title}</p>
                                <input className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} type={"text"} placeholder={e.Title} name={e.Title} required />
                    </label>

                                ))
                            }





                        </section>


                    <button
                        className="hover:bg-[#605ace] w-[80%] rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        type={"submit"}
                    >
                        Submit
                    </button>



                </form>
            </div>
        </div>
    );
}