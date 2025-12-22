import InsuranceValue from "./InsuranceValue";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";
import ShowImage from "@/components/molecules/ShowImage";

import { Certificate } from "../types";
import { convertDateFormat } from "@/lib/helpers";

const CertificateInfo = ({
  certification,
}: {
  certification: Certificate[];
}) => {
  return (
    <div className="space-y-4">
      <h5 className="font-semibold max-sm:text-sm"> Certificate</h5>
      <div className="flex flex-col gap-6">
        {certification?.length > 0 ? (
          <>
            {certification?.map((certificate, index) => (
              <div className="space-y-4" key={index}>
                {certificate?.certificate && (
                  <ShowImage
                    alt="certificate"
                    src={
                      typeof certificate?.certificate === "string"
                        ? certificate?.certificate
                        : ""
                    }
                    extraStyle="max-w-sm w-full h-[190px]"
                    size={280}
                  />
                )}
                <InsuranceValue
                  title="Issuing Org:"
                  value={certificate?.issuingOrganisation || "N/A"}
                  isMembership
                />
                <InsuranceValue
                  title="Verification No:"
                  value={certificate?.verificationNumber || "N/A"}
                  isMembership
                />
                <InsuranceValue
                  title="Issuing Date:"
                  value={
                    certificate?.issuingDate
                      ? convertDateFormat(certificate?.issuingDate)
                      : "N/A"
                  }
                  isMembership
                />
                <InsuranceValue
                  title="Expiry Date::"
                  value={
                    certificate?.isCertificateExpire
                      ? "Doesn't expire"
                      : certificate?.expiringDate
                      ? convertDateFormat(certificate?.expiringDate)
                      : "N/A"
                  }
                  isMembership
                />
              </div>
            ))}
          </>
        ) : (
          <NoMoreMessage message="No certificate provided" />
        )}
      </div>
    </div>
  );
};

export default CertificateInfo;
