import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store"; // Your store file path

export const useAppDispatch = () => useDispatch<AppDispatch>();
