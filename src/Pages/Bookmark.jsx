import { useState } from "react";

const Bookmark = () => {
const [bookmark,setBookmark] = useState([])


  return (
    <section className="flex justify-center items-center">
      <div className="max-w-[90rem]">
        <h1 className=" font-bold text-2xl mt-5">Anime yang Tersimpan</h1>
        {
            bookmark.length>0?bookmark.map((e,i)=>{
                console.log(bookmark);
                return <h1 key={i}>e</h1>
            }):null
        }
      </div>
    </section>
  );
};

export default Bookmark;
