import Image from "next/image";

export default function ThemeCard({
  title,
  desc,
  img,
  buttonColor = "bg-pink-500",
}: {
  title: string;
  desc: string;
  img: string;
  buttonColor?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 shadow-sm bg-white overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
        <button
          className={`mt-4 inline-flex items-center gap-2 text-white text-sm px-3 py-1.5 rounded-full ${buttonColor} hover:opacity-95`}
        >
          Keşfet
        </button>
      </div>
    </div>
  );
}
