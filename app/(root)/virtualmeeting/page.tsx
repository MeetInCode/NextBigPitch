"use client";
import React, { useEffect } from "react";
import Head from "next/head";

const VirtualMeetingPage: React.FC = () => {
  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      setTimeout(() => {
        const altL = new KeyboardEvent("keydown", {
          key: "l",
          code: "KeyL",
          altKey: true,
          bubbles: true,
        });
        iframe.contentWindow?.document.dispatchEvent(altL);
      }, 20000); // 20 seconds
    }
  }, []);

  return (
    <>
      <Head>
        <title>Virtual Meeting Space</title>
        <meta
          name="description"
          content="Join our virtual meeting space for an immersive experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <iframe
          src="https://www.spatial.io/s/celebrated_tapir771s-Hi-Fi-Place-67863431e3dd2286841be03c"
          style={{
            width: "90%",
            height: "90%",
            border: "none",
            borderRadius: "10px",
          }}
          allow="vr; xr; accelerometer; gyroscope; autoplay; encrypted-media"
        ></iframe>
      </div>
    </>
  );
};

export default VirtualMeetingPage;
