"use client";

import { numberWithCommas } from "@/lib/helpers";
import { useGetInsights } from "../hooks/useGetInsights";

import InsightValue from "./InsightValue";
import InsightCard from "./InsightCard";
import PageLoader from "@/components/atoms/PageLoader";

const InsightReport = () => {
  const { loading, insights } = useGetInsights();

  return (
    <section className="mt-6 pb-10">
      {loading ? (
        <PageLoader height="h-[50vh]" />
      ) : (
        <div className="flex flex-wrap gap-4 w-full">
          <div className=" h-[285px] max-sm:h-[250px] max-w-[450px] w-full shadow-md rounded-lg p-6 py-8 bg-white">
            <h2 className="font-bold text-xl max-sm: mb-6">Overview</h2>
            <div className="grid grid-cols-6 gap-6">
              <InsightValue
                imgUrl="/icons/document-forward.svg"
                title="Reached"
                value={insights?.reached && numberWithCommas(insights?.reached)}
              />
              <InsightValue
                imgUrl="/icons/heart2.svg"
                title="Saved"
                value={insights?.saved && numberWithCommas(insights?.saved)}
              />
              <InsightValue
                imgUrl="/icons/share.svg"
                title="Share"
                value={insights?.shared && numberWithCommas(insights?.shared)}
              />
              <InsightValue
                imgUrl="/icons/mouse-square.svg"
                title="Clicks"
                value={insights?.clicks && numberWithCommas(insights?.clicks)}
              />
              <InsightValue
                imgUrl="/icons/document-upload.svg"
                title="Contacts"
                value={insights?.contact && numberWithCommas(insights?.reached)}
              />
            </div>
          </div>
          <InsightCard
            title="Promotion Duration"
            currentValue={21}
            overallValue={30}
            noOfDaysLeft="7 Days Left"
          />
          <InsightCard
            title="Clicks"
            currentValue={1150}
            overallValue={2000}
            noOfDaysLeft="650 Clicks Left"
          />
        </div>
      )}
    </section>
  );
};

export default InsightReport;
