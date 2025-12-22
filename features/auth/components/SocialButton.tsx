import { Icon } from "@/components/atoms/Icon";

interface SocialButtonProps {
  provider: "Google" | "Facebook";
  onClick?: any;
}

export const SocialButton = ({ provider, onClick }: SocialButtonProps) => (
  <button
    className="flex-c justify-center w-full border-1 rounded-lg py-2 border-[#1A201B] font-semibold"
    onClick={onClick}
  >
    Continue with {provider}
    <Icon
      src={`/images/${provider.toLowerCase()}.svg`}
      alt={`${provider} icon`}
    />
  </button>
);
