import Bikes from "../assets/images/Bikes.png";
import Mobiles from "../assets/images/Mobiles.png";
import Pets from "../assets/images/Pets.png";
import Properties from "../assets/images/Properties.png";
import Cars from "../assets/images/cars.png";
import Furnitures from "../assets/images/Furnitures.png";
import Services from "../assets/images/Services.png";

const categories = [
  { name: "Cars", img: Cars },
  { name: "Bikes", img: Bikes },
  { name: "Properties", img: Properties },
  { name: "Mobiles", img: Mobiles },
  { name: "Services", img: Services },
  { name: "Furniture", img: Furnitures },
  { name: "Pets", img: Pets },
];

export default function CategoryIcon({ selectedCategory, onSelectCategory }) {
  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className="flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 w-32"
              >
                <div className={`w-23 h-23 rounded-2xl flex items-center justify-center overflow-hidden transition border-2 ${isActive ? "border-[#3a77ff] bg-blue-50" : "border-transparent bg-gray-100"}`}>
                  {cat.img ? (
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>
                <p className={`text-sm text-center leading-tight font-medium ${isActive ? "text-[#3a77ff]" : "text-gray-700"}`}>
                  {cat.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}