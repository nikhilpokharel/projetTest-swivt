/** @format */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemsView from "./itemsView";
import Pagination from "./pagination";

export default function SearchResult() {
  const params = useParams();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  //pagitaion
  const [initialPage, setInitialPage] = useState(1);
  const [pageLimit] = useState(10);

  //pagination here
  const lastPostIndex = initialPage * pageLimit;
  const firstPostIndex = lastPostIndex - pageLimit;
  const paginatedPost = result.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    const searchUserRepo = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user/repos/${params.id}`);
        setResult(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setResult([]);
      }
    };
    searchUserRepo();
    return () => {
      setResult([]);
    };
  }, [params.id]);

  const paginate = (pageno) => {
    window.scrollTo(0, 0);
    setInitialPage(pageno);
  };

  if (loading) {
    return (
      <div className='_loader'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {result && result.length ? (
        <>
          <p>Total found results: {result.length}</p>
          <ItemsView result={paginatedPost} />
          <Pagination
            totalPosts={result.length}
            limitedPosts={pageLimit}
            paginate={paginate}
            currentPage={initialPage}
          />
        </>
      ) : (
        <div className='card p-5 text-center'>Nothing found !!!</div>
      )}
    </div>
  );
}
