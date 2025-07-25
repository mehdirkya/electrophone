export default function Randomcomp({text1,text2,img}) {
  return (
    <div className="flex items-center gap-5">
      {/* Icône cercle */}
      <div className="h-[56px] w-[56px] bg-[#F0F0F0] flex items-center justify-center rounded ">
        <img src={img} alt="" className="w-[24px] h-[24px]" />
      </div>
      {/* Texte à droite */}
      <div className="flex flex-col">
        <h1 className="text-[13px] text-[#717171] font-Inter font-medium">{text1}</h1>
        <p className="text-[13px] text-black font-Inter font-medium">{text2}</p>
      </div>
    </div>
  );
}
