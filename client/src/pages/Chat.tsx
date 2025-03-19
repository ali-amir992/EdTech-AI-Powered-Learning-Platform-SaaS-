import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "@/components/chat/Chat";
import { IUser } from "@/types/User"; // Adjust the import path as needed

const ChatPage = () => {
    // Define the type for the `users` state as an array of `IUser`
    const [users, setUsers] = useState<IUser[]>([]);

    // Define the type for the `selectedUser` state as a string (user ID) or null
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch users from the API
                const response = await axios.get<{ success: boolean; users: IUser[] }>(
                    "http://localhost:5000/api/v1/user"
                );

                // Check if the response contains the `users` array
                if (response.data.success && Array.isArray(response.data.users)) {
                    setUsers(response.data.users); // Set the `users` state
                } else {
                    console.error("Unexpected API response structure:", response.data);
                    setUsers([]); // Fallback to an empty array
                }

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Chats</h2>
            {/* Map through the users and render buttons */}
            {users.map((user) => (

                <button className="bg-red-700 px-2 mx-3 text-white" key={user._id} 
                onClick={() => setSelectedUser(user._id)}>
                    {user.name}
                </button>
            ))}

            {/* Render the Chat component if a user is selected */}
            {selectedUser && <Chat receiverId={selectedUser} />}
        </div>
    );
};

export default ChatPage;