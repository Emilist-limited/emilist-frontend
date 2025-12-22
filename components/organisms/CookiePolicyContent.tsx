import List from "../atoms/List";
import PolicySection from "../molecules/PolicySection";

const CookiePolicyContent = () => {
  return (
    <div className="space-y-6 ">
      <PolicySection title="1. What are Cookies?" level={2}>
        <p className="mt-2">
          Cookies are small text files stored on your device (e.g., computer,
          tablet, or smartphone) when you visit a website. They enhance your
          experience by remembering preferences, improving website
          functionality, and providing insights into site usage.
        </p>
      </PolicySection>

      <PolicySection title="2. Types of Cookies We Use" level={2}>
        <PolicySection title="2.1. Mandatory Cookies" level={3}>
          <p className="mt-2">
            These cookies are essential for the website’s operation. Without
            them, you cannot use certain services, such as logging in or
            accessing secure areas.
          </p>
          <p className="mt-1">
            <strong>Examples:</strong> Session cookies, authentication cookies.
          </p>
        </PolicySection>

        <PolicySection title="2.2. Performance Cookies" level={3}>
          <p className="mt-2">
            These cookies collect data on how visitors use our website, such as
            which pages are visited most often, to improve site performance.
          </p>
          <p className="mt-1">
            <strong>Examples:</strong> Google Analytics cookies.
          </p>
        </PolicySection>

        <PolicySection title="2.3. Functional Cookies" level={3}>
          <p className="mt-2">
            These cookies enable enhanced features by remembering your choices
            (e.g., username, language, or region) to personalize your experience
            on the EmiList platform.
          </p>
          <p className="mt-1">
            <strong>Examples:</strong> Preference cookies.
          </p>
        </PolicySection>

        <PolicySection title="2.4. Targeting or Advertising Cookies" level={3}>
          <p className="mt-2">
            These cookies deliver advertisements relevant to your interests and
            measure the effectiveness of our advertising campaigns.
          </p>
          <p className="mt-1">
            <strong>Examples:</strong> Cookies set by third-party advertising
            platforms.
          </p>
        </PolicySection>
      </PolicySection>

      <PolicySection title="3. How We Use Cookies" level={2}>
        <p className="mt-2">We use cookies on EmiList to:</p>
        <List
          items={[
            "Ensure our platform functions effectively.",
            "Enhance user experience by remembering preferences and settings.",
            "Analyze site usage to optimize performance.",
            "Deliver personalized content and advertisements based on your interests.",
          ]}
          className="mt-2"
        />
      </PolicySection>

      <PolicySection title="4. Third-Party Cookies" level={2}>
        <p className="mt-2">
          We collaborate with third-party vendors who may set cookies for
          analytics, advertising, or social media integration.
        </p>
        <p className="mt-1">
          <strong>Examples:</strong> Google Analytics, Facebook Pixel, and other
          advertising networks.
        </p>
      </PolicySection>

      <PolicySection title="5. Managing Cookies" level={2}>
        <PolicySection title="5.1. Browser Settings" level={3}>
          <p className="mt-2">
            Most browsers allow you to manage cookies through their settings.
            Note that disabling cookies may affect the functionality of services
            requiring them.
          </p>
        </PolicySection>
        <PolicySection title="5.2. Cookie Management Tools" level={3}>
          <p className="mt-2">
            Use our website’s cookie management tool to set preferences and opt
            in or out of specific cookie types.
          </p>
          {/* <Button
            onClick={() => alert("Open cookie settings")}
            className="mt-4"
          >
            Manage Cookie Preferences
          </Button> */}
        </PolicySection>
      </PolicySection>

      <PolicySection title="6. Changes to This Cookie Policy" level={2}>
        <p className="mt-2">
          We may update this policy periodically to reflect changes in our
          practices or for legal, operational, or regulatory reasons. Please
          review this policy regularly to stay informed.
        </p>
      </PolicySection>

      <PolicySection title="7. Contact Us" level={2}>
        <p className="mt-2">
          For questions or concerns about this Cookie Policy, contact us at:
        </p>
        <p className="mt-2 font-semibold">
          EmiList Artisans Management Marketplace
        </p>
        <p className="mt-1">
          <strong>Email:</strong> msgemilist@gmail.com
        </p>
        <p className="mt-1">
          <strong>Phone:</strong> +1 (510) 331-7003
        </p>
      </PolicySection>
    </div>
  );
};

export default CookiePolicyContent;
