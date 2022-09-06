import React, { useContext, useState } from "react";
import { ClientRole, IAgoraRTCRemoteUser } from "agora-rtc-react";
import { AgoraRtcContext } from "./Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "./Agora/Rtm/AgoraRtmContext";
import ButtonLeave from "./Components/ButtonLeave";
import ButtonJoinHost from "./Components/ButtonJoinHost";
import ButtonJoinAudience from "./Components/ButtonJoinAudience";
import MicrophoneAndCameraRemoteUsers from "./Components/MicrophoneAndCameraRemoteUsers";
import ScreenVideoRemoteUsers from "./Components/ScreenVideoRemoteUsers";
import ButtonScreenVideo from "./Components/ButtonScreenVideo";
import ButtonMicrophoneAndCamera from "./Components/ButtonMicrophoneAndCamera";

type Props = {
  channelName: string;
  clientRole: ClientRole;
};

const App = ({ channelName, clientRole }: Props) => {
  const {
    agoraRtcClassInstanceMicrophoneAndCamera,
    agoraRtcClassInstanceScreenVideo,
  } = useContext(AgoraRtcContext);
  const { agoraRtmClassInstance } = useContext(AgoraRtmContext);

  const [
    agoraRtcMicrophoneAndCameraRemoteUsers,
    setAgoraRtcMicrophoneAndCameraRemoteUsers,
  ] = useState<IAgoraRTCRemoteUser[]>([]);
  const [agoraRtcScreenVideoRemoteUsers, setAgoraRtcScreenVideoRemoteUsers] =
    useState<IAgoraRTCRemoteUser[]>([]);
  const [membersCount, setMembersCount] = useState<number>(0);

  const [inCall, setInCall] = useState(false);

  /**
   * User events
   */

  if (inCall === false && clientRole === "host") {
    return (
      <ButtonJoinHost
        channelNameMicrophoneAndCamera={channelName + "-microphoneAndCamera"}
        channelNameScreenVideo={channelName + "screenVideo"}
        setMembersCount={setMembersCount}
        setAgoraRtcMicrophoneAndCameraRemoteUsers={
          setAgoraRtcMicrophoneAndCameraRemoteUsers
        }
        setAgoraRtcScreenVideoRemoteUsers={setAgoraRtcScreenVideoRemoteUsers}
        setInCall={setInCall}
      />
    );
  }

  if (inCall === false && clientRole === "audience") {
    return (
      <ButtonJoinAudience
        channelNameMicrophoneAndCamera={channelName + "-microphoneAndCamera"}
        channelNameScreenVideo={channelName + "screenVideo"}
        setMembersCount={setMembersCount}
        setAgoraRtcMicrophoneAndCameraRemoteUsers={
          setAgoraRtcMicrophoneAndCameraRemoteUsers
        }
        setAgoraRtcScreenVideoRemoteUsers={setAgoraRtcScreenVideoRemoteUsers}
        setInCall={setInCall}
      />
    );
  }

  return (
    <>
      <p>In the channel {membersCount}</p>
      <ButtonLeave setInCall={setInCall} />

      {agoraRtcClassInstanceMicrophoneAndCamera.clientRole === "host" && (
        <>
        <h2>Local tracks</h2>
          <ButtonMicrophoneAndCamera />
          <ButtonScreenVideo />
        </>
      )}

      <h2>Remote tracks</h2>

      <MicrophoneAndCameraRemoteUsers
        users={agoraRtcMicrophoneAndCameraRemoteUsers}
      />
      <ScreenVideoRemoteUsers users={agoraRtcScreenVideoRemoteUsers} />
    </>
  );
};

export default App;
