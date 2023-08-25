export default function Notifications({ expired }) {
   return (
      <div className="min-h-[100px] w-60 bg-slate-300">
         <ul className="px-2 text-lg">
            {expired.map((item) => (
               <li className="font-normal"> {item.name} about to expire</li>
            ))}
         </ul>
      </div>
   );
}
