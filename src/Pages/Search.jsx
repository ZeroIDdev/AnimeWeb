/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import TopAnime from "../components/TopAnime";
import Fav from "../components/Fav";
import useAuthContext from "../hooks/useAuthContext";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard";
import Card from "../components/Card";
import Skelton from "../components/Skelton";
import { debounce } from "lodash";
import useScroll from "../hooks/useScroll";
import { api } from "../utils";
const Search = () => {
  const [max, setMax] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(2);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  let search = searchParams.get("q");
  const [result, setResult] = useState([]);
  const array = "123456789111".split("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/search/${search}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      if (json.data.length > 0) {
        console.log(json.data);
        setResult(json.data);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(async (searchTerm) => {
    console.log("Making API request with query:", searchTerm);
    await fetchData();
  }, 500);

  useEffect(() => {
    const searchTerm = search || "naruto"; // Default value if search is null or undefined
    setResult([]);
    setPage(1);
    setLoading(true);
    debouncedSearch(searchTerm);
  }, [search]);

  return (
    <div className="">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl mt-5">Search</h1>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`grid grid-cols-3 gap-5 lg:gap-12 sm:grid-cols-4 md:grid-cols-5 auto-cols-fr grid-flow-row`}
          >
            {result.map((e, index) => (
              <Card data={e} key={index} />
            ))}
            {loading &&
              array.map((e, i) => {
                return <SkeletonCard key={i}/>
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
