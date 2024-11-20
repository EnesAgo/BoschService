import React, {useEffect, useState} from 'react'
import httpRequest from "@/requests/HttpRequest";
import {alertError} from "@/functions/alertFunctions";

export default function CarsTable() {
    const [cars, setCars] = useState<any>(undefined)
    const [carsPage, setCarsPage] = useState<any>(1)


    useEffect(() => {

        getCars()

    }, [])


    async function getCars(){
        try{

            const carsRes: any = await httpRequest(`/getAllCars?page=${carsPage.toString()}`)
            console.log(carsRes.CarPropTypes)

            if(carsRes.error){
                console.log(carsRes.error)
                return
            }

            setCars(carsRes.CarPropTypes)


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
                    cars && cars.map((element:any, index:any) => (
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
                                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

        // </div>
    )
}