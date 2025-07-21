import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AffiliateDeals = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">🎉 Exclusive Affiliate Deals</h2>

      <Carousel
        showArrows={true}
        infiniteLoop
        autoPlay
        showThumbs={false}
        interval={5000}
        className="rounded-lg shadow-lg"
      >
        {/* Filmora 11 Deal */}
        <div className="p-4 bg-white">
          <a
            href="https://click.linksynergy.com/fs-bin/click?id=rXG5IYUrqkw&offerid=764692.635&subid=0&type=4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://ad.linksynergy.com/fs-bin/show?id=rXG5IYUrqkw&bids=764692.635&subid=0&type=4&gridnum=13"
              alt="Meet Filmora 11, a creative video editing experience all on one platform"
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-center text-gray-600">
              Meet Filmora 11 — a powerful creative video editing platform.
            </p>
          </a>
        </div>

        {/* Filmora Mac Version */}
        <div className="p-4 bg-white">
          <a
            href="https://click.linksynergy.com/link?id=rXG5IYUrqkw&offerid=764692.3716019508538778&type=2&murl=https%3a%2f%2ffilmora.wondershare.com%2fvideo-editor-mac%2f"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://ad.linksynergy.com/fs-bin/show?id=rXG5IYUrqkw&bids=764692.3716019508538778&type=2&subid=0"
              alt="Filmora for Mac"
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-center text-gray-600">
              Get Filmora for Mac – Smooth & creative editing.
            </p>
          </a>
        </div>

        {/* Shenzhen Wondershare Software */}
        <div className="p-4 bg-white">
          <a
            href="https://click.linksynergy.com/fs-bin/click?id=rXG5IYUrqkw&offerid=764692.835&subid=0&type=4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://ad.linksynergy.com/fs-bin/show?id=rXG5IYUrqkw&bids=764692.835&subid=0&type=4&gridnum=0"
              alt="Shenzhen Wondershare Software Co., Ltd"
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-center text-gray-600">
              Explore Wondershare's tools — creativity and productivity combined.
            </p>
          </a>
        </div>

        {/* PDF Solution Powered by AI */}
        <div className="p-4 bg-white">
          <a
            href="https://click.linksynergy.com/fs-bin/click?id=rXG5IYUrqkw&offerid=764692.847&subid=0&type=4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://ad.linksynergy.com/fs-bin/show?id=rXG5IYUrqkw&bids=764692.847&subid=0&type=4&gridnum=13"
              alt="One-stop PDF solution powered by AI"
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-center text-gray-600">
              AI-powered PDF editor – fast, affordable, and easy to use.
            </p>
          </a>
        </div>

        {/* Filmora Logo Branding */}
        <div className="p-4 bg-white">
          <img
            src="https://neveragain.allstatics.com/2020/assets/icon/logo/filmora-horizontal.png"
            alt="Filmora Logo"
            className="mx-auto max-h-24"
          />
          <p className="mt-2 text-sm text-center text-gray-600">
            Trusted by creators worldwide. Try Filmora today.
          </p>
        </div>
      </Carousel>

      {/* Affiliate Disclosure */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links. This means I may earn a commission if you click through and make a purchase, at no additional cost to you.
        </p>
      </div>
    </div>
  );
};

export default AffiliateDeals;
