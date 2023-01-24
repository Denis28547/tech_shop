import { useDeleteItemMutation } from "../../store/services/ItemService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeModal } from "../../store/reducers/DeleteItemModalSlice";

import Modal from "../Modal";
import CustomButton from "../CustomButton";

import styles from "../../styles/profile/DeletionItemModal.module.scss";

export const DeletionItemModal = () => {
  const dispatch = useAppDispatch();
  const [deleteItem, { isLoading }] = useDeleteItemMutation();
  const { isModalOpen, toDeleteItemId } = useAppSelector(
    (state) => state.modal
  );
  const modalHandler = () => dispatch(closeModal());

  const deleteItemAndCloseModal = async () => {
    await deleteItem(toDeleteItemId);
    modalHandler();
  };

  return (
    <Modal
      active={isModalOpen}
      setActive={modalHandler}
      putChildrenInContainer={true}
    >
      <div className={styles.deletion_window_wrapper}>
        <h2>Are you sure you want to delete this item ?</h2>
        <p>you will not be able to recover it after deleting</p>

        <div className={styles.buttons_container}>
          <CustomButton
            text={"No"}
            loading={false}
            height={50}
            width={"100%"}
            margin={"10px 0 0 0"}
            buttonType="grey"
            fontSize="1.1rem"
            fontWeight={600}
            onClick={() => modalHandler()}
          />
          <CustomButton
            text={"Yes"}
            loading={isLoading}
            height={50}
            width={"100%"}
            margin={"10px 0 0 0"}
            buttonType="blue"
            fontSize="1.1rem"
            fontWeight={600}
            onClick={deleteItemAndCloseModal}
          />
        </div>
      </div>
    </Modal>
  );
};
