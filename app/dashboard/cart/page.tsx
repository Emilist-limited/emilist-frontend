import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import CartWrapper from "@/features/cart/components/CartWrapper";

const CartPage = () => {
  return (
    <main className="relative">
      <DashboardNavbar />
      <div className="sm:py-28 py-20">
        <CartWrapper />
      </div>
    </main>
  );
};

export default CartPage;
