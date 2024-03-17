import React from "react";

const Ordering = ({ handleOrder }) => {
    return (
        <div className="text-base font-semibold text-[#121212]">
            <select
                className="border border-opacity-5 rounded-xl px-3 py-2"
                onChange={handleOrder}
            >
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
        </div>
    );
};

export default Ordering;

// import React from "react";

// const Ordering = ({ handleOrder }) => {
//     return (
//         <div>
//             <select className="border border-2 p-2" onChange={handleOrder}>
//                 <option value="asc">asc</option>
//                 <option value="desc">desc</option>
//             </select>
//         </div>
//     );
// };

// export default Ordering;
