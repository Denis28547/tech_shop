import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsAuthModalOpen } from "../../store/reducers/SmallThingsSlice";
import { useChangeThemeHook } from "./ChangeThemeHook";

import Auth from "../Auth/Auth";
import Modal from "../Modal";

const AuthModalComponents = () => {
  const dispatch = useAppDispatch();
  const { isAuthModalOpen } = useAppSelector((state) => state.smallThings);

  const modalHandler = () => dispatch(setIsAuthModalOpen(!isAuthModalOpen));

  return (
    <Modal
      active={isAuthModalOpen}
      setActive={modalHandler}
      putChildrenInContainer={true}
    >
      <Auth modalActive={isAuthModalOpen} modalHandler={modalHandler} />
    </Modal>
  );
};

export default AuthModalComponents;
