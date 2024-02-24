import React from "react";

const Pill = ({ image, text, onClick }) => {
  return (
    <span className="flex items-center gap-1 p-[6px] border border-black w-fit rounded-l-full rounded-r-full bg-gray-200">
      <img
        className="w-6 border border-black rounded-full"
        src={image}
        alt={text}
      />
      <span className="text-sm">{text}</span>
      <span
        className="border border-black rounded-full w-6 text-center text-white bg-black hover:cursor-pointer"
        onClick={onClick}
      >
        X
      </span>
    </span>
  );
};

export default Pill;
