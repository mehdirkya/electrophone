import BrandFilter from "../components/Brandfilter";
export default function Products(){
    return (
        <section className="h-[1500px]">
            <div className="flex items-center gap-2 text-sm font-inter text-[#B0B0B0] h-[100px]">
                <div className="flex items-center gap-2 text-sm font-inter justify-center w-[35%]">
                    <span className="hover:underline cursor-pointer">Home</span>
                    <span>{'>'}</span>
                    <span className="hover:underline cursor-pointer">Catalog</span>
                    <span>{'>'}</span>
                    <span className="text-black font-semibold">Smartphones</span>
                </div>
            </div>
            <div>
                <div className="w-[1119px] h-[1480px]">
                    <div>
                        <BrandFilter />
                    </div>
                    <div>
                        <h1>Selected Products : 85</h1>
                        <div>
                            
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </section>
    );
}