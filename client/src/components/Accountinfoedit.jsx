import Input from "./Input";
export default function Accountinfoedit(){
    return(
    <div className="w-full max-w-3xl flex flex-col gap-10 border border-gray-300 rounded-2xl justify-center items-center">
            <div className="flex  h-[460px]  gap-5 w-[600px] ">
                {/* Left column: Labels */}
                <div className="flex flex-col justify-around w-fit h-full">
                    <div className="flex gap-6 items-center">
                         <h1 className="font-inter font-semibold text-[20px] w-[100px]">Country :</h1>
                        <p className="font-inter font-normal text-[18px]" id="country">{country}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                         <h1 className="font-inter font-semibold text-[20px] w-[100px]">Address :</h1>
                        <p className="font-inter font-normal text-[18px]" id="country">{country}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                         <h1 className="font-inter font-semibold text-[20px] w-[100px]">City :</h1>
                        <p className="font-inter font-normal text-[18px]" id="country">{country}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                         <h1 className="font-inter font-semibold text-[20px] w-[100px]">State :</h1>
                        <p className="font-inter font-normal text-[18px]" id="country">{country}</p>
                    </div>
                    <div className="flex gap-6 items-center">
                         <h1 className="font-inter font-semibold text-[20px] w-[100px]">Zip code :</h1>
                        <p className="font-inter font-normal text-[18px]" id="country">{country}</p>
                    </div>
                </div>  
            </div>
        </div>
    );
}