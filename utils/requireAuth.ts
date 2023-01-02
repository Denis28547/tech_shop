import { getSession } from "next-auth/react";

export const requireAuth = async (
  context: any,
  destination: string,
  callback: any
) => {
  const session = await getSession(context);

  if (!session)
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };

  return callback({ session });
};
