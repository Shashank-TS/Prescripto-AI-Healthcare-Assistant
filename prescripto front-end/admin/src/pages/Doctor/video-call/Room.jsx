import React, { useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// install package
// npm i @zegocloud/zego-uikit-prebuilt --save

const Room = () => {
  const { id } = useParams();
  const meetingContainerRef = useRef(null);

  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  useEffect(() => {
    const myMeeting = async () => {
      // generate Kit Token
      const appID = 664550163;
      const serverSecret = "a4cc21bf1cef83e27db77aea4fffebb4";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        randomID(5),
        "your_name_here"
      );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url: `http://localhost:5174/video-call/room/${id}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    };
    myMeeting();
  }, [id]);
  return (
    <div
      className="myCallContainer"
      ref={meetingContainerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default Room;
