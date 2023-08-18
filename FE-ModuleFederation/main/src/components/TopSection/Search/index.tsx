import React from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const searh = (event: any) => {
    event.preventDefault();
    const name = event.target.elements.name;
    navigate("/shop?name=" + name.value);
    name.value = "";
  };

  return (
    <div className="hero__search__form">
      <form action="#" onSubmit={searh}>
        <input
          type="text"
          placeholder="What are you looking for?"
          name="name"
        />
        <button type="submit" className="site-btn">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default Search;
