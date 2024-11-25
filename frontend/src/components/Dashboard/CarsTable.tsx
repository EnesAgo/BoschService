import React, {useEffect, useState} from 'react'
import httpRequest from "@/requests/HttpRequest";
import {alertError} from "@/functions/alertFunctions";
import Link from "next/link";
import humanReadableNumber from "@/functions/humanReadableNumber";

export default function CarsTable() {
    const [cars, setCars] = useState<any>(undefined)
    const [carsPage, setCarsPage] = useState<any>(1)
    const [totalCars, setTotalCars] = useState<any>()

    const limit = 15;


    useEffect(() => {

        getCars()

    }, [carsPage])


    async function getCars(){
        try{

            const carsRes: any = await httpRequest(`/getAllCars?page=${carsPage.toString()}`)
            console.log(carsRes)

            if(carsRes.error){
                console.log(carsRes.error)
                return
            }

            setTotalCars(humanReadableNumber(carsRes.total))

            setCars(carsRes)


        } catch (e) {
            alertError('Error Occurred');
            console.log(`error: ${e}`)
        }
    }


    return (
        // <div>


        <div className="w-[85%] relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left bg-[#f5f5f5] rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-white">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Car ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Finished
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>

                </tr>
                </thead>
                <tbody>

                {
                    cars && cars?.CarPropTypes?.map((element:any, index:any) => (
                        <tr key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {element.carID}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(element.startDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {element.finished.toString()}
                            </td>
                            <td className="px-6 py-4">
                                €{element.bill}
                            </td>
                            <td className="px-6 py-4">
                                <Link href={`/edit/${element.carID}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className="flex w-full min-h-8 items-center justify-between px-12 py-4 border-t-4 bg-gray-200">
                <h5 className="text-sm text-gray-500" >Showing data {humanReadableNumber((limit*(carsPage-1))+1)} to {(limit*(carsPage-1)+limit)<cars?.total ? humanReadableNumber(limit*(carsPage-1)+limit) : humanReadableNumber(cars?.total)} of {totalCars} entries </h5>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if(carsPage > 1) {
                                setCarsPage((prev: any) => prev-1)
                            }
                        }}
                        className="w-6 h-6 bg-[#f5f5f5] border-[#eee] border rounded font-Poppints font-bold text-xl text-[#404B52] leading-3"
                    >{'<'}</button>

                    <p className="w-6 h-6 bg-[#5932EA] rounded font-Poppints font-bold text-xs text-[#fff] leading-3 flex items-center justify-center">{carsPage}</p>

                    <button
                        onClick={() => {
                            if(carsPage < cars.total/limit) {
                                setCarsPage((prev: any) => prev+1)
                            }
                        }}
                        className="w-6 h-6 bg-[#f5f5f5] border-[#eee] border rounded font-Poppints font-bold text-xl text-[#404B52] leading-3"
                    >{'>'}</button>

                </div>
            </div>
        </div>

        // </div>
    )
}