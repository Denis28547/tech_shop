import axios from "axios";
import { Context } from "next-redux-wrapper";
import {
  getAllItems,
  getRunningOperationPromises,
  useGetAllItemsQuery,
} from "../store/services/ItemService";
import { wrapper } from "../store/store";

const TEST = ({ product }: any) => {
  if (!product) return <div>NOOOOOOOOOOOOOOOO</div>;
  console.log(product);
  console.log(product.data);
  const name = product.data[0].name;

  return (
    <div>
      TEST
      <h1>rtk query</h1>
      <p>{name}</p>
    </div>
  );
};

export default TEST;

// export async function getServerSideProps(context: Context) {
//   let data;
//   try {
//     const result = await axios.get(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/item?limit=${4}`
//     );
//     data = result.data;
//   } catch (error) {
//     data = error;
//   }
//   console.log(data);
//   const b = "ss";
//   return {
//     props: {
//       data,
//     },
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    const data = await store.dispatch(getAllItems.initiate(4));
    await Promise.all(getRunningOperationPromises());

    const result = data.data;
    console.log(result);

    return {
      props: {
        product: data,
      },
    };
  }
);
// if (id) {
//   const data = await store.dispatch(getProduct.initiate(id));
//   await Promise.all(getRunningOperationPromises());
//   if ("data" in data) {
//     return {
//       props: {
//         id,
//         product: data.data,
//         revalidate: 10,
//       },
//     };
//   }

//   return {
//     props: {
//       id,
//       product: data,
//       revalidate: 600,
//     },
//   };
