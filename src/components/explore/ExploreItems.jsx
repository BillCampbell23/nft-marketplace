import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard, { NftCardSkeleton } from "../UI/NftCard";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const INITIAL_COUNT = 8;
const LOAD_MORE_STEP = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      setLoading(true);
      try {
        // Sorting is done by the API, not in the browser: fetching and ordering
        // every record client-side would not scale past a few hundred items.
        const { data } = await axios.get(
          filter ? `${API_URL}?filter=${filter}` : API_URL
        );
        if (!ignore) setItems(data);
      } catch (error) {
        console.error("Failed to load explore items", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchItems();
    return () => {
      ignore = true;
    };
  }, [filter]);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
    setVisibleCount(INITIAL_COUNT); // a new ordering starts from the first page
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={onFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(INITIAL_COUNT).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCardSkeleton />
            </div>
          ))
        : visibleItems.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item} />
            </div>
          ))}

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
