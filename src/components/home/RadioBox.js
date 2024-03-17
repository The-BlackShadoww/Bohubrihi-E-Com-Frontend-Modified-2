const RadioBox = ({ prices, handleFilters }) => {
    const handleChange = (e) => {
        handleFilters(e.target.value);
    };

    return prices.map((price) => (
        <div key={price.id} className="">
            <input
                onChange={handleChange}
                value={price.id}
                name="price_filter"
                type="radio"
                className="mr-2"
            />
            <label className="font-semibold text-black/70">{price.name}</label>
        </div>
    ));
};

export default RadioBox;
