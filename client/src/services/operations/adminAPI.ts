import { toast } from "react-hot-toast"; 
import { apiConnector } from "@/services/apiConnector";
import { adminEndpoints } from "@/services/apis";

// Define the expected shape of the API response
interface ApiResponse {
    data: {
        success: boolean;
        message?: string;
        users?: any[]; // Adjust the type based on your backend response
    };
}

// getUsers function (Regular function)
export const getUsers = async () => {
    const toastId = toast.loading("Loading users...");

    try {
        // Make the API call to fetch users
        const response: ApiResponse = await apiConnector({
            method: "GET", // Assuming your API uses GET for fetching users
            url: adminEndpoints.GET_USERS_API, // Define this in your endpoints file
        });

        console.log("GET USERS API response...", response);

        if (!response.data.success) {
            throw new Error(response.data.message || "Failed to fetch users");
        }

        // Handle the fetched users
        const users = response.data.users;
        toast.success("Users fetched successfully");

        return users; // Return the fetched users
    } catch (error: any) {
        console.error("GET USERS API ERROR", error);
        toast.error(error.response?.data?.message || "Failed to fetch users");
        return []; // Return an empty array if fetching fails
    } finally {
        toast.dismiss(toastId);
    }
};
