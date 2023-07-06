"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import brazil from "../../../public/images/brazil.png";
import { BsArrowLeft } from "react-icons/bs";
import BordersBox from "@/app/components/BordersBox";
import Link from "next/link";

type Params = {
  params: {
    name: string;
  };
};

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface NativeName {
  common: string;
  official: string;
}

interface SingleCountry {
  name: {
    common: string;
    nativeName: NativeName[];
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: Currency[];
  languages: string;
  borders?: string[];
}

const Page = ({ params: { name } }: Params) => {
  const [data, setData] = useState<SingleCountry[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [name]);

  console.log(data);

  const convertNum = (num: number) => {
    const formattedNumber = num.toLocaleString("en-US");

    return formattedNumber;
  };

  if (data == null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main className="mt-12 max-w-[1440px] mx-auto px-8 desktop:px-0">
      <div
        onClick={() => router.back()}
        className="flex items-center justify-center gap-3 dark:bg-darkblue w-min px-6 py-2 rounded-sm shadow-md cursor-pointer">
        <BsArrowLeft />
        <p className="dark:text-white">Back</p>
      </div>
      {data?.map((country) => {
        const bord = country.borders || null;
        const pop = country.population;
        return (
          <div
            key={country.name.common}
            className="flex flex-col desktop:flex-row desktop:items-center gap-x-28">
            <div className="w-full desktop:w-[600px] mt-20">
              <Image
                src={country.flags.png}
                alt={country.flags.alt}
                width={600}
                height={400}
                className="w-full"
              />
            </div>
            <div className="flex flex-col mt-10 desktop:w-2/5">
              <p className="dark:text-white mb-6 font-extrabold text-2xl">
                {country.name.common}
              </p>
              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-10 desktop:flex-row desktop:justify-between">
                  <div className="flex flex-col gap-y-3">
                    <p className="font-semibold dark:text-white">
                      Native Name:{" "}
                      <span className="dark:text-darkgraylight">
                        {Object.values(country.name.nativeName)
                          .map(({ common }) => common)
                          .join(", ")}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white">
                      Population:{" "}
                      <span className="dark:text-darkgraylight">
                        {convertNum(pop)}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white">
                      Region:{" "}
                      <span className="dark:text-darkgraylight">
                        {country.region}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white">
                      Sub Region:{" "}
                      <span className="dark:text-darkgraylight">
                        {country.subregion}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white">
                      Capital:{" "}
                      <span className="dark:text-darkgraylight">
                        {country.capital}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <p className="font-semibold dark:text-white">
                      Top Level Domain:{" "}
                      <span className="dark:text-darkgraylight">
                        {country.tld.map((domain) => domain)}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white">
                      Currencies:{" "}
                      <span className="dark:text-darkgraylight">
                        {Object.values(country.currencies)
                          .map(({ name }) => name)
                          .join(", ")}
                      </span>
                    </p>
                    <p className="font-semibold dark:text-white">
                      Languages:{" "}
                      <span className="dark:text-darkgraylight">
                        {Object.values(country.languages).join(", ")}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold dark:text-white">
                    Border Countries
                  </p>
                  {bord !== null ? (
                    <div
                      className={`${
                        bord!.length > 7
                          ? "grid grid-cols-5 gap-4"
                          : "flex gap-4"
                      } mt-8`}>
                      {country.borders!.map((countries) => (
                        <Link href={`/country/${countries}`}>
                          <div key={countries}>
                            <BordersBox name={countries} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="font-semibold dark:text-darkgraylight mt-3">
                      This country has no neighbors
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Page;
