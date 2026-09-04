import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const responsive = {
  0: { items: 1 },
  576: { items: 2 },
  768: { items: 3 },
  1200: { items: 4 },
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      try {
        const { data } = await axios.get(API_URL);
        if (!ignore) setItems(data);
      } catch (error) {
        console.error("Failed to load new items", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchItems();
    return () => {
      ignore = true;
    };
  }, []);

  const skeletonItems = new Array(4).fill(0).map((_, index) => (
    <div className="nft__item" key={index}>
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="nft__item_wrap">
        <Skeleton width="100%" height="250px" />
      </div>
      <div className="nft__item_info">
        <Skeleton width="120px" height="20px" />
        <br />
        <Skeleton width="60px" height="20px" />
      </div>
    </div>
  ));

  const newItems = items.map((item) => (
    <div className="nft__item" key={item.id}>
      <div className="author_list_pp">
        <Link
          to="/author"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator"
        >
          <img className="lazy" src={item.authorImage} alt={item.title} />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <Countdown expiryDate={item.expiryDate} />

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to="/item-details">
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <section id="section-items">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <AliceCarousel
              mouseTracking
              infinite
              disableDotsControls
              responsive={responsive}
              items={loading ? skeletonItems : newItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
