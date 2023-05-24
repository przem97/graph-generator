import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../reducers";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector