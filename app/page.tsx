"use client";

import { HiSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "./components/Box";
import Link from "next/link";

interface AllCountries {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}

export default function Home() {
  const [data, setData] = useState<AllCountries[] | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<AllCountries[] | null>(
    []
  );

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data?.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData!);
    } else {
      setFilteredResults(data);
    }
  };

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
    <main className="mt-12 pb-12 max-w-[1440px] mx-auto px-5 desktop:px-0">
      <div className="flex flex-col gap-y-10 desktop:flex-row justify-normal desktop:justify-between desktop:px-[122px]">
        <div className="relative shadow-lg desktop:w-[400px]">
          <HiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-xl text-darkgraylight dark:text-white" />
          <input
            className="py-4 outline-none w-full rounded-md pl-20 dark:bg-darkblue dark:placeholder:text-white"
            type="text"
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search for a country..."
          />
        </div>
        <div className="w-[250px] shadow-lg">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="outline-none w-full py-4 px-4 rounded-md dark:bg-darkblue dark:placeholder:text-white">
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="mt-20 flex justify-center items-center h-full">
        <div className="grid grid-cols-1 desktop:grid-cols-4 gap-16">
          {searchInput.length > 1 ? (
            filteredResults?.map((item) => {
              return (
                <div className="w-min h-min" key={item.name.common}>
                  <Link href={`/country/${item.name.common}`}>
                    <Box
                      country={item.name.common}
                      // @ts-expect-error
                      population={convertNum(item.population)}
                      region={item.region}
                      capital={item.capital}
                      image={item.flags.png}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <>
              {data
                ?.filter((item) =>
                  selectedRegion ? item.region === selectedRegion : true
                )
                .map((item) => {
                  return (
                    <div className="w-min h-min" key={item.name.common}>
                      <Link href={`/country/${item.name.common}`}>
                        <Box
                          country={item.name.common}
                          // @ts-expect-error
                          population={convertNum(item.population)}
                          region={item.region}
                          capital={item.capital}
                          image={item.flags.png}
                        />
                      </Link>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
