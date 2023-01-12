import { NextPage } from "next";

import { useAppDispatch } from "../../store/hooks";
import { openPopupFailure } from "../../store/reducers/PopupSlice";

const Profile: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      Profile
      <button onClick={() => dispatch(openPopupFailure("sss"))}>
        AAAAAAAAAAAAAAAA
      </button>
    </div>
  );
};

export default Profile;
