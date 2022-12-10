import { NextPage } from "next";

import { useAppDispatch } from "../../store/hooks";
import { setFailedText } from "../../store/reducers/PopupSlice";

const Profile: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      Profile
      <button onClick={() => dispatch(setFailedText("sss"))}>
        AAAAAAAAAAAAAAAA
      </button>
    </div>
  );
};

export default Profile;
