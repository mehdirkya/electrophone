import BrandFilter from "../components/Brandfilter";
import Productcard from "../components/Productcard";
export default function Products(){
    return (
        <section className="h-full">
            <div className="flex items-center gap-2 text-sm font-inter text-[#B0B0B0] h-[100px]">
                <div className="flex items-center gap-2 text-sm font-inter justify-center w-[28%]">
                    <span className="hover:underline cursor-pointer">Home</span>
                    <span>{'>'}</span>
                    <span className="hover:underline cursor-pointer">Catalog</span>
                    <span>{'>'}</span>
                    <span className="text-black font-semibold">Smartphones</span>
                </div>
            </div>
            
            <div className="w-[full] h-[1560px] flex justify-center ">
                <div>
                    <BrandFilter />
                </div>
                <div className="w-[1119px] h-[1480px] flex gap-20 justify-center">
                    
                    <div className="flex flex-col gap-6">
                        <h1>Selected Products : 85</h1>
                        <div className="grid grid-cols-3 gap-6">
                            <Productcard />
                            <Productcard />
                            <Productcard />
                            <Productcard />
                            <Productcard />
                            <Productcard />
                            <Productcard />
                            <Productcard />
                            <Productcard />
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="flex gap-2 border border-gray-300 text-sm font-medium rounded-lg h-[36px] items-center px-4">
                                <button>&lt;</button>
                                <button className="bg-black text-white px-3 py-1 rounded">1</button>
                                <button className="hover:underline">2</button>
                                <button className="hover:underline">3</button>
                                <span>....</span>
                                <button className="hover:underline">12</button>
                                <button>&gt;</button>
                            </div>
                        </div>
                    </div>       
                </div>
                
            </div>
            
        </section>
    );
}