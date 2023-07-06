"use client";

interface BordersBoxProps {
  name: string;
}

const BordersBox: React.FC<BordersBoxProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center dark:bg-darkblue w-min px-6 py-2 rounded-sm shadow-md">
      <p className="dark:text-white">{name}</p>
    </div>
  );
};

export default BordersBox;
