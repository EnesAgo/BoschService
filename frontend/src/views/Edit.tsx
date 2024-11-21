import React, {useEffect, useState} from "react";
import HeaderBar from "@/components/Dashboard/HeaderBar";
import httpRequest from "@/requests/HttpRequest";
import {alertError, alertSuccess} from "@/functions/alertFunctions";

export default function EditDashboard({carID}: any) {

    const [inputs, setInputs] = useState<any>([])
    const [userCreds, setUserCreds] = useState<any>(undefined)

    useEffect(() => {
        if(localStorage.jwt){
            setUserCreds(JSON.parse(localStorage.jwt))
        }
        getInputs()
    }, [carID])

    async function getInputs(){
        if(!carID) return
        try{

            const currentCar:any = await httpRequest.get(`/getOneCar?carID=${carID}`)
            if(currentCar.error){
                console.log(`error:`)
                console.log(currentCar.error)
                alertError('Error Occurred');
                return
            }
            console.log(currentCar)

            const carProps:any = await httpRequest.get(`/getAllCarProps?carUUID=${currentCar.carUUID}`)

            if(carProps.error){
                console.log(`error:`)
                console.log(currentCar.error)
                alertError('Error Occurred');
                return
            }
            console.log(carProps)
            setInputs(carProps.CarPropTypes)


        } catch (e) {
            console.log(`error:`)
            console.log(e)
            alertError('Error Occurred');
            return
        }
    }


    async function submitForm(e:any) {
        e.preventDefault()
        // console.log(userCreds)



    }

    return (
        <div className="gridMain bg-[#F0F0F0] flex flex-col">
            <HeaderBar />
            <div className="w-full h-full flex flex-col gap-6 items-center mt-5">
                <form className={"w-[70%] flex flex-col gap-14 relative items-center mt-10 bg-white py-24 shadow rounded-2xl"} onSubmit={submitForm}>

                    <h1 className={"absolute top-7 font-bold text-xl font-Poppins"}>Edit Car</h1>


                    <section className="flex w-[90%] flex-wrap items-center justify-center gap-14">


                            {
                                inputs && inputs.map((e:any, i:any) => (
                                <label className={"mx-4"} key={i}>
                                <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                 font-Poppints">{e.carPropTypeTitle}</p>
                                <input className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} type={"text"} placeholder={e.carPropTypeTitle} defaultValue={e.Title} name={e.Title} required />
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