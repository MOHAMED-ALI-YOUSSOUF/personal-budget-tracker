import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center py-4 ">
      <span className="text-center text-sm">
        {new Date().getFullYear()} &copy; -{" "}
        <a
          href="https://mohamed-ali-youssouf.com/"
          className=" underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mohamed Ali Youssouf
        </a>
        <br /> All Rights Reserved
      </span>
    </footer>
  );
};

export default Footer;
