import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "@/components/chat/Chat";
import { IUser } from "@/types/User"; // Adjust the import path as needed

const ChatPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<{ success: boolean; users: IUser[] }>(
                    "http://localhost:5000/api/v1/user"
                );

                if (response.data.success && Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    console.error("Unexpected API response structure:", response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for User List */}
            <div className="w-1/4 bg-white border-r border-gray-200 p-6 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chats</h2>
                <div className="space-y-2">
                    {users.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user._id)}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                                selectedUser === user._id
                                    ? "bg-primary text-white"
                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                            }`}
                        >
                            <span className="font-medium">{user.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <Chat receiverId={selectedUser} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">
                            Select a user to start chatting
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;