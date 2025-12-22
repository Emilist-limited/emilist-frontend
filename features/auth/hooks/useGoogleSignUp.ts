export const useGoogleSignUp = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const googleAuth = async () => {
    window.location.href = `${baseUrl}/auth/google`;
  };

  return {
    googleAuth,
  };
};
