import PublicUserProfileWrapper from "@/components/organisms/PublicUserProfileWrapper";
import MainLayout from "@/components/templates/MainLayout";

interface UserInfoPageProps {
  userId: string;
}

const UserInfoPage = ({ params }: { params: UserInfoPageProps }) => {
  const userId = params?.userId;
  return (
    <MainLayout>
      <PublicUserProfileWrapper userId={userId} />
    </MainLayout>
  );
};

export default UserInfoPage;
