import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import Skeleton from "./Skeleton";

// Shared by New Items on the home page and by Explore Items — the two sections
// render the same card from the same shape of data.
const NftCard = ({ item }) => (
  <div className="nft__item">
    <div className="author_list_pp">
      <Link
        to={`/author/${item.authorId}`}
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
            {/* Placeholder share targets from the starter design: they have no
                destination yet, so they are buttons rather than empty anchors. */}
            <button type="button" aria-label="Share on Facebook">
              <i className="fa fa-facebook fa-lg"></i>
            </button>
            <button type="button" aria-label="Share on Twitter">
              <i className="fa fa-twitter fa-lg"></i>
            </button>
            <button type="button" aria-label="Share by email">
              <i className="fa fa-envelope fa-lg"></i>
            </button>
          </div>
        </div>
      </div>

      <Link to={`/item-details/${item.nftId}`}>
        <img
          src={item.nftImage}
          className="lazy nft__item_preview"
          alt={item.title}
        />
      </Link>
    </div>

    <div className="nft__item_info">
      <Link to={`/item-details/${item.nftId}`}>
        <h4>{item.title}</h4>
      </Link>
      <div className="nft__item_price">{item.price} ETH</div>
      <div className="nft__item_like">
        <i className="fa fa-heart"></i>
        <span>{item.likes}</span>
      </div>
    </div>
  </div>
);

export const NftCardSkeleton = () => (
  <div className="nft__item">
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
);

export default NftCard;
