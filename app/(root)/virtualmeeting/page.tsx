"use client";
import React, { useState } from "react";
import Head from "next/head";

const VirtualMeetingPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("framevr");

  const renderIframe = () => {
    if (selectedOption === "framevr") {
      return (
        <iframe
          src="https://framevr.io/owd-yoi-fkj"
          style={{
            width: "90%",
            height: "90%",
            border: "none",
            borderRadius: "10px",
          }}
          allow="vr; xr; accelerometer; gyroscope; autoplay; encrypted-media"
        ></iframe>
      );
    } else if (selectedOption === "spatial") {
      return (
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
      );
    }
  };

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
      <div style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <p>Choose a virtual meeting space:</p>
          <button onClick={() => setSelectedOption("framevr")}>FrameVR</button>
          <br />
          <button onClick={() => setSelectedOption("spatial")}>Spatial</button>
        </div>
        {renderIframe()}
      </div>
    </>
  );
};

export default VirtualMeetingPage;
