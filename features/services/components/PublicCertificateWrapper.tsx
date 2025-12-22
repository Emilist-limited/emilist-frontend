import ShowImage from "@/components/molecules/ShowImage";
import InsuranceValue from "./InsuranceValue";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

import { Certificate } from "../types";
import { convertDateFormat } from "@/lib/helpers";

const PublicCertificateWrapper = ({
  certification,
}: {
  certification: Certificate[];
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Certification</h3>
      <div className="max-w-2xl w-full space-y-10">
        {certification?.length > 0 ? (
          <>
            {certification?.map((certificate, index) => (
              <div className="space-y-2 max-w-sm" key={index}>
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
                  title="Expiry Date:"
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

export default PublicCertificateWrapper;
