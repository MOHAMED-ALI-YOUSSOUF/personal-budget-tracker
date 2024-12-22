import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center py-4 my-4">
      <span className="text-center">
        {new Date().getFullYear()} &copy; -{" "}
        <a
          href="https://mohamed-ali-youssouf.com/"
          className="text-whi underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mohamed Ali Youssouf
        </a>{" "}
        <br /> All Rights Reserved
      </span>
    </footer>
  );
};

export default Footer;
