import Image from "next/image";
import check from "../assets/check-solid.svg";

export default function Checkbox({ size, checked, onChange }) {
  return (
    <div
      className={`flex items-center cursor-pointer`}
      onClick={() => onChange(!checked)} // Toggle checked state
    >
      <div
        className={`w-5 h-5 flex items-center justify-center border transition-all rounded-lg duration-150 ${
          checked
            ? "bg-blue-900 border-blue-700"
            : "bg-neutral-900 border-neutral-800"
        }`}
      >
        {checked && (
          <div className="size-4 flex items-center justify-center rounded-lg p-1">
            <Image src={check} alt="" />
          </div>
        )}
      </div>
      <span className="ml-2">{size}</span>{" "}
      {/* Display the size next to the checkbox */}
    </div>
  );
}
