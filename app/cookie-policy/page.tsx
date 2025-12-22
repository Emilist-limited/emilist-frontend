import Head from "next/head";

import MainLayout from "@/components/templates/MainLayout";
import CookiePolicyContent from "@/components/organisms/CookiePolicyContent";

const CookiePolicy = () => {
  return (
    <>
      <Head>
        <title>EmiList Cookie Policy</title>
        <meta
          name="description"
          content="Cookie Policy for EmiList Artisans Management Marketplace"
        />
      </Head>
      <MainLayout>
        <div className="pt-10 padding-ctn">
          <h1 className="text-3xl md:text-4xl font-bold">
            Cookie Policy for EmiList Artisans Management Marketplace
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Revised: October 10, 2022
          </p>
          <section className="mt-8">
            <p className="text-base">
              EmiList is committed to protecting your personal data. We ensure a
              secure, transparent browsing experience on our marketplace,
              connecting customers with skilled artisans. This policy explains
              what cookies are, how we use them, and how you can manage your
              preferences.
            </p>
          </section>
          <CookiePolicyContent />
          <div className="mt-10">
            <p>
              By using the EmiList platform, you consent to the use of cookies
              in accordance with this Cookie Policy.
            </p>
          </div>
        </div>
      </MainLayout>
      ;
    </>
  );
};

export default CookiePolicy;
