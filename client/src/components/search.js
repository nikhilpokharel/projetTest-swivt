/** @format */
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search({ hasClass }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchRepo = (e) => {
    e.preventDefault();
    if (!query) return;
    return navigate(`/search/${query}`);
  };

  return (
    <div className={`form-search ${hasClass ? "_main" : ""}`}>
      <form onSubmit={searchRepo} className='d-flex w-100'>
        <input
          type='text'
          value={query}
          placeholder='Search for repositories'
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className='form-control rounded-0'
        />
        <button className='btn btn-secondary rounded-0'>Search</button>
      </form>
    </div>
  );
}
