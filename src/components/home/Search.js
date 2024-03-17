import { Button } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ handleSearchInput, handleSearchSubmit }) => {
    return (
        <div className="mb-10 flex flex-col justify-center items-center border p-5 h-[40vh] bg-[#d2dfdd] rounded-2xl">
            <h1 className="text-[#121212] text-6xl font-extrabold text-center mb-16">
                Shop Your <span className="text-[#5f726e]">Favorite</span>{" "}
                Products
            </h1>
            <form
                onSubmit={handleSearchSubmit}
                className="w-[80%] mx-auto flex justify-between items-center rounded-lg bg-[#f5f5f5] "
            >
                <input
                    className="p-3 outline-none flex-grow-[1] rounded-lg placeholder:text-gray-400 font-medium"
                    type="text"
                    placeholder="search product"
                    required
                    onChange={handleSearchInput}
                />
                <br />
                <div className="px-4 rounded-full cursor-pointer bg-[#f3f4f6]">
                    <FiSearch size={20} />
                </div>
            </form>
        </div>
    );
};

export default Search;

// import { Button } from "@mui/material";
// import React from "react";

// const Search = ({ handleSearchInput, handleSearchSubmit }) => {
//     return (
//         <div className="mb-10 border p-5 bg-indigo-400 rounded-md">
//             <form
//                 onSubmit={handleSearchSubmit}
//                 className="flex border border-[#1c1c1c] rounded-md bg-[#f5f5f5] "
//             >
//                 <input
//                     className="w-2/4 p-2 mb-4 bg-red-200 outline-none"
//                     type="text"
//                     placeholder="search product"
//                     required
//                     onChange={handleSearchInput}
//                 />
//                 <br />
//                 <Button variant="contained" color="success" type="submit">
//                     search
//                 </Button>
//             </form>
//         </div>
//     );
// };

// export default Search;
