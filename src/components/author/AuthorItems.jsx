import React from "react";
import NftCard, { NftCardSkeleton } from "../UI/NftCard";

const AuthorItems = ({ author, loading }) => {
  // The collection entries carry no author fields of their own — every NFT here
  // belongs to the author whose page this is, so borrow their id and avatar.
  const items = (author?.nftCollection || []).map((nft) => ({
    ...nft,
    authorId: author.authorId,
    authorImage: author.authorImage,
  }));

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <NftCardSkeleton />
                </div>
              ))
            : items.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <NftCard item={item} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
