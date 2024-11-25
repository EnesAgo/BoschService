import React, {useEffect, useState} from "react";
import HeaderBar from "@/components/Dashboard/HeaderBar";
import httpRequest from "@/requests/HttpRequest";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import {useRouter} from "next/router";
import Link from "next/link";

export default function EditDashboard({carID}: any) {

    const router = useRouter()


    const [inputs, setInputs] = useState<any>([])
    const [userCreds, setUserCreds] = useState<any>(undefined)
    const [currentCarData, setCurrentCarData] = useState<any>(undefined)
    const [isFinished, setIsFinished] = useState<any>(false)

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
            setIsFinished(currentCar.finished)
            setCurrentCarData(currentCar)

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

        const editCarData = {
            startDate: e.target.elements.namedItem("startDate").value,
            bill: e.target.elements.namedItem("bill").value,
            finished: e.target.elements.namedItem("finished").value,
        }

        console.log(editCarData)


        try{
            const putCar: any = await httpRequest.put(`/updateCar?carID=${currentCarData.carID}`, editCarData);


            if(putCar.error){
                alertError(`error: ${putCar.error}`)
                console.log(putCar.error)
                return
            }

            for (const input of inputs) {
                try{

                    const inpRes: any = await httpRequest.put(`/updateCarProp?carPropUUID=${input.carPropUUID}`,
                        {Title: e.target.elements.namedItem(input.carPropTypeTitle).value});

                    console.log(inpRes)


                    if(inpRes.error) {
                        alertError(`error: ${inpRes.error}`)
                        console.log(inpRes.error)
                        return
                    }


                } catch (inpError) {
                    alertError(`error: inpError`)
                    console.log(inpError)
                    return
                }
            }

            alertSuccess("Car Successfully Updated")


        }
        catch (e){
            console.log(e)
            alertError(`An Error Occurred`)

        }

    }



    async function deleteCar(){
        try{
            const deleteCar: any = await httpRequest.delete(`/deleteCar/${currentCarData.carUUID}`)

            console.log(deleteCar)

            alertSuccess("Patient Successfully deleted")
            setTimeout(() => {router.push("/")}, 1500)
            return
        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
            return
        }
    }



    return (
        <div className="gridMain bg-[#F0F0F0] flex flex-col">
            <HeaderBar />
            <div className="w-full h-full flex flex-col gap-6 items-center mt-5">
                <form className={"w-[70%] flex flex-col gap-14 relative items-center mt-10 bg-white py-24 shadow rounded-2xl"} onSubmit={submitForm}>

                    <h1 className={"absolute top-7 font-bold text-xl font-Poppins"}>Edit Car</h1>


                    <section className="flex w-[90%] flex-wrap items-center justify-center gap-14">


                            <label className={"mx-4"}>
                                <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                     font-Poppints">Car ID</p>
                                <input className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} type={"text"} placeholder={"car ID"} defaultValue={currentCarData && currentCarData.carID} name={"carID"} required disabled />
                            </label>

                        <label className={"mx-4"}>
                            <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                         font-Poppints">Finished</p>
                            <select className={`border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 !pr-2 rounded-xl`}
                                    value={isFinished}
                                    name={"finished"}
                                    onChange={(e:any) => setIsFinished(e.target.value)}
                                    required
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </label>

                            <label className={"mx-4"}>
                                <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                         font-Poppints">Start Date</p>
                                <input className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 pr-2 rounded-xl"} type={"date"} placeholder={"Start Date"} defaultValue={currentCarData && new Date(currentCarData.startDate).toISOString().slice(0, 10)} name={"startDate"} required />
                            </label>

                            <label className={"mx-4 relative"}>
                                <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                             font-Poppints">Bill in €</p>
                                <p className={"absolute top-[52px] left-[10px]"}>€</p>
                                <input className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-7 pr-2 rounded-xl"} type={"number"} placeholder={"Bill in €"} defaultValue={currentCarData && currentCarData.bill} name={"bill"} required />
                            </label>


                            {
                                inputs && inputs.map((e:any, i:any) => (
                                <label className={"mx-4"} key={i}>
                                <p className="!text-base pl-[1px] ml-0.5 py-2 cursor-text
                 font-Poppints">{e.carPropTypeTitle}</p>
                                <input className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} type={"text"} placeholder={e.carPropTypeTitle} defaultValue={e.Title} name={e.carPropTypeTitle} required />
                    </label>

                                ))
                            }





                        </section>


                    <button
                        className="hover:bg-[#605ace] w-[80%] rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        type={"submit"}
                    >
                        Update
                    </button>

                    <div className={"w-[80%] flex justify-between"}>
                        <button
                            className=" hover:bg-[#fc0505] min-w-[40%]  rounded-md bg-[#ff3f3f] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            type={"button"}
                            onClick={deleteCar}
                        >
                            Delete
                        </button>
                        <Link className={"min-w-[40%]"} target={"_blank"} href={`/edit/${carID}/print`}>
                            <button
                                className="hover:bg-green-500 w-full rounded-md bg-green-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                type={"button"}
                            >
                                Print
                            </button>
                        </Link>
                    </div>



                </form>
            </div>
        </div>
    );
}