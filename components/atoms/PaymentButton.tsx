interface PaymentButtonProps {
  onClick?: () => void;
  className?: string;
  title?: string;
}

const PaymentButton = ({
  onClick,
  className = "bg-primary-green hover:bg-green-500",
  title = "Payment",
}: PaymentButtonProps) => {
  return (
    <button
      className={`text-white whitespace-nowrap transition-all duration-300 rounded-lg px-6 h-11 text-center max-sm:text-sm sm:min-w-40 min-w-32 flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PaymentButton;
