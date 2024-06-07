/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { api } from "../utils";

const AnimeEps = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const [streamServer, setStreamServer] = useState(0);
  const [mp4, setMp4] = useState([]);
  const [mkv, setMkv] = useState([]);
  const { slug, eps } = useParams();
  const [frameLoad, setFrameLoad] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tt = queryParams.get("tt");
  const newArray = Array.from({ length: tt }, (_, i) => i);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/anime/${slug}/episodes/${eps}`);
        const json = await response.json();

        if (response.ok) {
          setUrl(json.data.stream_url);
          setData(json.data);
          setMp4(json.data.download_urls.mp4);
          setMkv(json.data.download_urls.mkv);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug, eps, streamServer]);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="">
        {data ? (
          <div className="relative ">
            {!frameLoad && (
              <div className="absolute aspect-video h-full w-full bg-base-200 skeleton border-none rounded-none"></div>
            )}
            <iframe
              src={url}
              frameBorder="0"
              className="w-full aspect-video "
              allow="autoplay; fullscreen"
              allowFullScreen
              autoPlay
              onLoad={() => setFrameLoad(true)}
            ></iframe>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
        {data && (
          <div className="w-full p-6 ml-6 order-1">
            <h1 className="text-2xl">{data.episode}</h1>
          </div>
        )}
        <div className=" col-span-1 col-start-1 row-span-3 row-start-2">
          <h1 className="w-full px-5 text-base pt-4 lg:ml-7">episodes : </h1>
          <div className="flex gap-2 px-5 md:px-8 lg:px-12 overflow-x-auto h-auto lg:max-h-96 w-full no-scrollbar pt-3 lg:overflow-y-auto max-w-[40rem] pb-7 mb-14">
            {newArray.map((e, i) => {
              console.log(i);
              return (
                <div
                  key={i}
                  className={`bg-base-100  font-medium aspect-square text-center flex items-center justify-center rounded-lg w-full`}
                >
                  <Link
                    className=""
                    to={`/anime/eps/${slug}/${i + 1}?tt=${tt}`}
                    onClick={() => setFrameLoad(false)}
                  >
                    <h1>{i + 1}</h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {data && (
        <div className="self-start mx-6">
          <h1>Download Episode:</h1>
          <div className="flex gap-2 md:flex-row flex-col">
            <div>
            <h2 className="mt-6 mb-2 ">Mp4 : </h2>
            {mp4.map((e, i) => {
              return (
                <div
                  key={i}
                  className="w-full rounded-sm my-2 bg-base-200 p-6 "
                >
                  {e.resolution} :
                  <div className="w-11/12 h-auto p-6 flex flex-wrap gap-2">
                    {e.urls.map((j, k) => {
                      return (
                        <div
                          key={j}
                          className="bg-aksen p-1 border rounded border-black px-6 h-auto flex btn btn-active text-white"
                        >
                          <Link
                            to={j.url}
                            aria-label="Download"
                            target="_blank"
                          >
                            <p>{j.provider}</p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            </div>
            <div>
            <h2 className="mt-6 mb-2 ">MKV : </h2>
            {mp4.map((e, i) => {
              return (
                <div
                  key={i}
                  className="w-full rounded-sm my-2 bg-base-200 p-6 "
                >
                  {e.resolution} :
                  <div className="w-11/12 h-auto p-6 flex flex-wrap gap-2">
                    {e.urls.map((j, k) => {
                      return (
                        <div
                          key={j}
                          className="bg-aksen p-1 border rounded border-black px-6 h-auto flex btn btn-active text-white"
                        >
                          <Link
                            to={j.url}
                            aria-label="Download"
                            target="_blank"
                          >
                            <p>{j.provider}</p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      )}

      {/* <div className="grid grid-cols-3 gap-2 p-5 grid-flow-row auto-cols-fr bg-base-100 m-3 gap-y-3 w-11/12">
        <h1 className=" col-span-3 ">Stream Server:</h1>
        {data &&
          data.videoPlayer.map((e, i) => {
            return (
              <div
                key={e.url}
                className="bg-aksen p-1 border rounded border-black w-full h-auto flex btn btn-active text-white"
                onClick={() => {
                  setStreamServer(i);
                  setFrameLoad(false);
                }}
              >
                <p>
                  {e.server} {e.quality}
                </p>
              </div>
            );
          })} */}
      {/* <h1 className=" col-span-3">Download Link</h1>
        {data &&
          data.download_urls.mkv.map((e) => {
            return (
              <div
                key={e.url}
                className="bg-aksen p-1 border rounded border-black w-full h-auto flex btn btn-active text-white"
              >
                <Link to={e.url} aria-label="Download" target="_blank">
                  <p>
                    {e.server} {e.quality}
                  </p>
                </Link>
              </div>
            );
          })} */}
      {/* </div> */}
    </div>
  );
};

export default AnimeEps;
