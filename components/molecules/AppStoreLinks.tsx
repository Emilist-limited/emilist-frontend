import AppImage from "../atoms/AppImage";
import MenuLink from "../atoms/MenuLink";

const AppStoreLinks = () => (
  <div className="flex justify-center gap-4">
    <MenuLink href="/">
      <AppImage
        src="/images/appstore.svg"
        alt="Play Store"
        width={169}
        height={49}
        className="h-10 w-auto"
      />
    </MenuLink>
    <MenuLink href="/">
      <AppImage
        src="/images/playStore.png"
        alt="Google Play"
        width={200}
        height={55}
        className="h-10 w-auto"
      />
    </MenuLink>
  </div>
);

export default AppStoreLinks;
