import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nftId]);

  useEffect(() => {
    let ignore = false;

    async function fetchItem() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}?nftId=${nftId}`);
        if (!ignore) setItem(data);
      } catch (error) {
        console.error("Failed to load item details", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchItem();
    return () => {
      ignore = true;
    };
  }, [nftId]);

  const person = (heading, id, image, name) => (
    <>
      <h6>{heading}</h6>
      <div className="item_author">
        <div className="author_list_pp">
          {loading ? (
            <Skeleton width="50px" height="50px" borderRadius="50%" />
          ) : (
            <Link to={`/author/${id}`}>
              <img className="lazy" src={image} alt={name} />
              <i className="fa fa-check"></i>
            </Link>
          )}
        </div>
        <div className="author_list_info">
          {loading ? (
            <Skeleton width="100px" height="20px" />
          ) : (
            <Link to={`/author/${id}`}>{name}</Link>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right">
                {loading ? (
                  <Skeleton width="100%" height="600px" />
                ) : (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                )}
              </div>
              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="300px" height="40px" />
                  ) : (
                    <h2>
                      {item.title} #{item.tag}
                    </h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width="30px" height="20px" /> : item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width="30px" height="20px" /> : item.likes}
                    </div>
                  </div>

                  {loading ? (
                    <Skeleton width="100%" height="80px" />
                  ) : (
                    <p>{item.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      {person(
                        "Owner",
                        item?.ownerId,
                        item?.ownerImage,
                        item?.ownerName
                      )}
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      {person(
                        "Creator",
                        item?.creatorId,
                        item?.creatorImage,
                        item?.creatorName
                      )}
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (
                        <Skeleton width="60px" height="20px" />
                      ) : (
                        <span>{item.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
