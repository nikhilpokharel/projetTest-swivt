/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const splitId = params.id.split("____&____");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios({
          url: `/repo/info`,
          params: { name: splitId[0], repo: splitId[1] },
        });
        setDetails(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setDetails("");
      }
    };

    fetchDetails();
    return () => {
      setDetails("");
    };
  }, [params.id]);

  if (loading)
    return (
      <div className='_loader'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );

  return (
    <div className='details_page'>
      {details ? (
        <>
          <div className='_user_info'>
            <img
              src={details.avatar}
              className='rounded mx-auto w-10 d-block img-thumbnail'
              alt='users avatar'
            />
            <p className='text-center my-2'>
              Username: <strong>{details.username}</strong>{" "}
              <a href={details.userUrl} rel='noreferrer' target='_blank'>
                ( View in github )
              </a>
            </p>
          </div>
          <div className='_details_info'>
            <ul className='list-group'>
              <li className='list-group-item'>
                Project Name: <strong>{details.repoName}</strong>{" "}
                <a href={details.repoUrl} rel='noreferrer' target='_blank'>
                  ( View in github )
                </a>
              </li>
              <li className='list-group-item'>
                Project Branch: <strong>{details.branch}</strong>
              </li>
              <li className='list-group-item'>
                Project Issue: <strong>{details.issueNo}</strong>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className='p-5'>Nothing Found !!!</div>
      )}
    </div>
  );
}
