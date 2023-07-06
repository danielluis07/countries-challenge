"use client";

import Image from "next/image";

interface BoxProps {
  country: string;
  population: number;
  region: string;
  capital: string[];
  image: string;
}

const Box: React.FC<BoxProps> = ({
  country,
  population,
  region,
  capital,
  image,
}) => {
  return (
    <div className="w-[250px] h-[350px] max-w-[250px] max-h-[350px] bg-white dark:bg-darkblue shadow-md rounded-md overflow-hidden">
      <div>
        <Image src={image} width={250} height={250} alt="img" />
      </div>
      <div className="px-6 pt-6">
        <p className="font-extrabold dark:text-white">{country}</p>
        <div className="flex flex-col gap-y-2 mt-3">
          <p className="dark:text-darkgraylight">
            <span className="font-semibold dark:text-white">Population:</span>{" "}
            {population}
          </p>
          <p className="dark:text-darkgraylight">
            <span className="font-semibold dark:text-white">Region:</span>{" "}
            {region}
          </p>
          <p className="dark:text-darkgraylight">
            <span className="font-semibold dark:text-white">Capital:</span>{" "}
            {capital}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Box;
