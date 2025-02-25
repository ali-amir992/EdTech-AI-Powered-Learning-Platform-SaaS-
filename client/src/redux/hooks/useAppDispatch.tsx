import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store"; // Your store file path

export const useAppDispatch = () => useDispatch<AppDispatch>();
