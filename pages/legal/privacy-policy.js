import Navbar from "../../components/Navbar";
import Head from "next/head";

const privacy = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Navbar />
      <div className="container">
        <h2 style={{ fontSize: "2rem", color: "black" }}>Privacy Policy:</h2>
        <p>
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} ("
          <strong>{process.env.NEXT_PUBLIC_DOMAIN_NAME}</strong>") operates
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} and may operate other websites.
          It is
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} policy to respect your privacy
          regarding any information we may collect while operating our websites.
        </p>
        <h3>Website Visitors</h3>
        <p>
          Like most website operators, {process.env.NEXT_PUBLIC_DOMAIN_NAME}{" "}
          collects non-personally-identifying information of the sort that web
          browsers and servers typically make available, such as the browser
          type, language preference, referring site, and the date and time of
          each visitor request. {process.env.NEXT_PUBLIC_DOMAIN_NAME} purpose in
          collecting non-personally identifying information is to better
          understand how {process.env.NEXT_PUBLIC_DOMAIN_NAME}
          visitors use its website. From time to time,{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} may release
          non-personally-identifying information in the aggregate, e.g., by
          publishing a report on trends in the usage of its website.
        </p>
        <p>
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} also collects potentially
          personally-identifying information like Internet Protocol (IP)
          addresses for logged in users and for users leaving comments on{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} blogs/sites.
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} only discloses logged in user
          and commenter IP addresses under the same circumstances that it uses
          and discloses personally-identifying information as described below,
          except that commenter IP addresses and email addresses are visible and
          disclosed to the administrators of the blog/site where the comment was
          left.
        </p>
        <h3>Gathering of Personally-Identifying Information</h3>
        <p>
          Certain visitors to {process.env.NEXT_PUBLIC_DOMAIN_NAME} websites
          choose to interact with
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} in ways that require{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} to gather personally-identifying
          information. The amount and type of information that{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} gathers depends on the nature of
          the interaction. For example, we ask visitors who sign up at{" "}
          <a href={`https://www.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`}>
            {process.env.NEXT_PUBLIC_DOMAIN_NAME}
          </a>{" "}
          to provide a username and email address. Those who engage in
          transactions with
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} are asked to provide additional
          information, including as necessary the personal and financial
          information required to process those transactions. In each case,{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} collects such information only
          insofar as is necessary or appropriate to fulfill the purpose of the
          visitor's interaction with
          {process.env.NEXT_PUBLIC_DOMAIN_NAME}.{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} does not disclose
          personally-identifying information other than as described below. And
          visitors can always refuse to supply personally-identifying
          information, with the caveat that it may prevent them from engaging in
          certain website-related activities.
        </p>
        <h3>Aggregated Statistics</h3>
        <p>
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} may collect statistics about the
          behavior of visitors to its websites.{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} may display this information
          publicly or provide it to others. However,{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} does not disclose
          personally-identifying information other than as described below.
        </p>
        <h3>Protection of Certain Personally-Identifying Information</h3>
        <p>
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} discloses potentially
          personally-identifying and personally-identifying information only to
          those of its employees, contractors and affiliated organizations that
          (i) need to know that information in order to process it on{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} behalf or to provide services
          available at {process.env.NEXT_PUBLIC_DOMAIN_NAME} websites, and (ii)
          that have agreed not to disclose it to others. Some of those
          employees, contractors and affiliated organizations may be located
          outside of your home country; by using{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} websites, you consent to the
          transfer of such information to them.{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} will not rent or sell
          potentially personally-identifying and personally-identifying
          information to anyone. Other than to its employees, contractors and
          affiliated organizations, as described above,{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} discloses potentially
          personally-identifying and personally-identifying information only in
          response to a subpoena, court order or other governmental request, or
          when {process.env.NEXT_PUBLIC_DOMAIN_NAME}
          believes in good faith that disclosure is reasonably necessary to
          protect the property or rights of{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME}, third parties or the public at
          large. If you are a registered user of an
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} website and have supplied your
          email address,
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} may occasionally send you an
          email to tell you about new features, solicit your feedback, or just
          keep you up to date with what's going on with{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} and our products. If you send us
          a request (for example via email or via one of our feedback
          mechanisms), we reserve the right to publish it in order to help us
          clarify or respond to your request or to help us support other users.
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} takes all measures reasonably
          necessary to protect against the unauthorized access, use, alteration
          or destruction of potentially personally-identifying and
          personally-identifying information.
        </p>
        <h3>Cookies</h3>
        <p>
          A cookie is a string of information that a website stores on a
          visitor's computer, and that the visitor's browser provides to the
          website each time the visitor returns.{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} uses cookies to help{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} identify and track visitors,
          their usage of
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} website, and their website
          access preferences.
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} visitors who do not wish to have
          cookies placed on their computers should set their browsers to refuse
          cookies before using {process.env.NEXT_PUBLIC_DOMAIN_NAME} websites,
          with the drawback that certain features of{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} websites may not function
          properly without the aid of cookies.
        </p>
        <h3>Business Transfers</h3>
        <p>
          If {process.env.NEXT_PUBLIC_DOMAIN_NAME}, or substantially all of its
          assets, were acquired, or in the unlikely event that{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} goes out of business or enters
          bankruptcy, user information would be one of the assets that is
          transferred or acquired by a third party. You acknowledge that such
          transfers may occur, and that any acquirer of
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} may continue to use your
          personal information as set forth in this policy.
        </p>
        <h3>Ads</h3>
        <p>
          Ads appearing on any of our websites may be delivered to users by
          advertising partners, who may set cookies. These cookies allow the ad
          server to recognize your computer each time they send you an online
          advertisement to compile information about you or others who use your
          computer. This information allows ad networks to, among other things,
          deliver targeted advertisements that they believe will be of most
          interest to you. This Privacy Policy covers the use of cookies by
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} and does not cover the use of
          cookies by any advertisers.
        </p>
        <h3>Privacy Policy Changes</h3>
        <p>
          Although most changes are likely to be minor,{" "}
          {process.env.NEXT_PUBLIC_DOMAIN_NAME} may change its Privacy Policy
          from time to time, and in {process.env.NEXT_PUBLIC_DOMAIN_NAME}
          sole discretion. {process.env.NEXT_PUBLIC_DOMAIN_NAME} encourages
          visitors to frequently check this page for any changes to its Privacy
          Policy. If you have a{process.env.NEXT_PUBLIC_DOMAIN_NAME} account,
          you might also receive an alert informing you of these changes. Your
          continued use of this site after any change in this Privacy Policy
          will constitute your acceptance of such change.
        </p>
      </div>
    </>
  );
};

export default privacy;
