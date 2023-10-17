import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="card bg-accent border-secondary border-4 shadow-xl flex items-center justify-center p-10 my-20 mx-auto lg:max-w-6xl">
      <div>
        {" "}
        <h1
          style={{ fontFamily: "rockwell" }}
          className="text-center text-xl text-primary font-extrabold"
        >
          Terms and Conditions
        </h1>
        <h2 className="text-md text-primary font-bold">1. Introduction</h2>
        <p>
          Welcome to "Maker's Mosaic." These terms and conditions outline the
          rules and regulations for the use of our website. By accessing this
          website, we assume you accept these terms and conditions. Do not
          continue to use "Maker's Mosaic" if you do not agree to take all of
          the terms and conditions stated on this page.
        </p>
        <h2 className="text-md text-primary font-bold">2. Cookies</h2>
        <p>
          We employ the use of cookies. By accessing "Maker's Mosaic," you
          agreed to use cookies in agreement with our Privacy Policy.
        </p>
        <h2 className="text-md text-primary font-bold">3. License</h2>
        <p>
          Unless otherwise stated, "Maker's Mosaic" and/or its licensors own the
          intellectual property rights for all material on "Maker's Mosaic." All
          intellectual property rights are reserved. You may access this from
          "Maker's Mosaic" for your personal use subject to restrictions set in
          these terms and conditions.
        </p>
        <h2 className="text-md text-primary font-bold">4. Restrictions</h2>
        <p>
          You are specifically restricted from all of the following:
          <ul>
            <li>
              Publishing any material from "Maker's Mosaic" in any other media.
            </li>
            <li>
              Selling, sublicensing, and/or otherwise commercializing any
              website material.
            </li>
            <li>
              Using "Maker's Mosaic" in any way that is or may be damaging to
              this website.
            </li>
          </ul>
        </p>
        <h2 className="text-md text-primary font-bold">5. No Warranties</h2>
        <p>
          This website is provided "as is," with all faults, and "Maker's
          Mosaic" expresses no representations or warranties of any kind related
          to this website or the materials contained on this website. Also,
          nothing contained on this website shall be interpreted as advising
          you.
        </p>
        <h2 className="text-md text-primary font-bold">
          6. Variation of Terms
        </h2>
        <p>
          "Maker's Mosaic" is permitted to revise these terms at any time as it
          sees fit, and by using this website, you are expected to review these
          terms regularly.
        </p>
        <h2 className="text-md text-primary font-bold">7. Entire Agreement</h2>
        <p>
          These terms constitute the entire agreement between "Maker's Mosaic"
          and you in relation to your use of this website and supersede all
          prior agreements and understandings.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
