import React, { useEffect, useState } from 'react';
import { getAdminUsers } from './userApiConfig';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchedUsers = async () => {
            try {
                const data = await getAdminUsers();
                setUsers(data);
            } catch (error) {
                console.log("Failed to retrieve users from API");
            }
        };

        fetchedUsers();
    }, []);

    return (
        <div>
            <h2>Admin Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
