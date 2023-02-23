import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeTheme } from "../../store/reducers/SmallThingsSlice";

type TThemeLCStorage = "light" | "dark" | null;

export const useChangeThemeHook = (): [
  theme: string,
  handleSetTheme: () => void
] => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.smallThings);

  const nextTheme = theme === "light" ? "dark" : "light";

  const handleSetTheme = () => {
    localStorage.setItem("theme", nextTheme);
    dispatch(changeTheme(nextTheme));
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    const lcTheme = localStorage.getItem("theme") as TThemeLCStorage;

    if (lcTheme && lcTheme !== theme) {
      dispatch(changeTheme(lcTheme));
    }
  }, [theme]);

  return [theme, handleSetTheme];
};
