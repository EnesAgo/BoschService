// import FileUpload from "@/components/Dashboard/FileUpload";

import HeaderBar from "@/components/Dashboard/HeaderBar";
import CarsTable from "@/components/Dashboard/CarsTable";

export default function Dashboard() {
    return (
        <div className="gridMain bg-[#F0F0F0] flex flex-col">
            <HeaderBar />
            <div className="w-full h-full flex flex-col gap-6 items-center mt-5">
                <CarsTable />
            </div>
        </div>
    );
}