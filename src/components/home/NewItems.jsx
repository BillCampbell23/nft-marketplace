import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import NftCard, { NftCardSkeleton } from "../UI/NftCard";

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

  const carouselItems = loading
    ? new Array(4).fill(0).map((_, index) => <NftCardSkeleton key={index} />)
    : items.map((item) => <NftCard item={item} key={item.id} />);

  return (
    <section id="section-items" data-aos="fade-up">
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
              items={carouselItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
