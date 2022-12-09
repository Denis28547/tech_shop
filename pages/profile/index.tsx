import { NextPage } from "next";

import { useAppDispatch } from "../../store/hooks";
import { openPopup } from "../../store/reducers/PopupSlice";

const Profile: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      Profile
      <button onClick={() => dispatch(openPopup())}>AAAAAAAAAAAAAAAA</button>
    </div>
  );
};

export default Profile;
