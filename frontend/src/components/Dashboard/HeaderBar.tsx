import React from 'react'
import Link from "next/link";
export default function HeaderBar() {
    return (
        <div className="w-full bg-white h-20 border-b flex items-center justify-between px-5 pr-10">
            <div className={"flex gap-5"}>
                <input type="text" placeholder={"input"} className="border w-48 h-8 px-2" />
                <select name="cars" className={"border px-2 rounded-l"}>
                    <option value="volvo">Car ID</option>
                    <option value="saab">uuID</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
            <Link href="/create"><button className={"border px-6 py-2 rounded-xl hover:bg-[#25a4ce] bg-[#0188b5] text-sm font-medium text-white"}>create</button></Link>
        </div>
    );
}