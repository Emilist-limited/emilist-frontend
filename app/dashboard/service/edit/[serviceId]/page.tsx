import RegisterServiceLayout from "@/components/templates/RegisterServiceLayout";
import EditServiceWrapper from "@/features/services/components/EditServiceWrapper";

const page = ({ params }: { params: { serviceId: string } }) => {
  const serviceId = params.serviceId;
  return (
    <RegisterServiceLayout>
      <EditServiceWrapper serviceId={serviceId} />
    </RegisterServiceLayout>
  );
};

export default page;
