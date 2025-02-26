import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsers } from "@/services/operations/adminAPI";

const UserManagement = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching

            try {
                const fetchedUsers = await getUsers();
                if (fetchedUsers?.length === 0) {
                    setError("No users are not found.");
                } else {
                    setUsers(fetchedUsers || []);
                }
            } catch (err) {
                setError("Failed to fetch users. Try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">User Management</h1>

                {loading && <p>Loading users...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && users.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <Card key={user.id} className="shadow-md rounded-lg">
                                <CardHeader className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={user.image || "/default-avatar.png"} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle>{user.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                    <p className="mt-2 text-sm font-medium">Role: {user.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    !loading && <p className="text-gray-500">No users available.</p>
                )}
            </div>
        </DashboardLayout>
    );
};

export default UserManagement;
