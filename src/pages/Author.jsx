import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchAuthor() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}?author=${authorId}`);
        if (!ignore) {
          setAuthor(data);
          setFollowing(false); // a different author starts unfollowed
        }
      } catch (error) {
        console.error("Failed to load author", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchAuthor();
    return () => {
      ignore = true;
    };
  }, [authorId]);

  // Following is client-only for this build — there is no endpoint to persist it,
  // so the count moves by one and resets on refresh.
  const followerCount = (author?.followers || 0) + (following ? 1 : 0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12" data-aos="fade-up">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author.authorImage} alt={author.authorName} />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div className="profile_username">
                              <Skeleton width="200px" height="40px" />
                            </div>
                          ) : (
                            <>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width="120px" height="20px" />
                        ) : (
                          `${followerCount} followers`
                        )}
                      </div>
                      {!loading && (
                        <button
                          className="btn-main"
                          onClick={() => setFollowing((f) => !f)}
                        >
                          {following ? "Unfollow" : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
