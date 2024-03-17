import React from "react";

const SortOption = ({ handleSortOption }) => {
    return (
        <div className="text-base font-semibold text-[#121212]">
            <select
                className="border border-opacity-5 rounded-xl px-3 py-2"
                onChange={handleSortOption}
            >
                <option value="">options</option>
                <option value="price">price</option>
                <option value="sold">sold</option>
                <option value="review">review</option>
            </select>
        </div>
    );
};

export default SortOption;
