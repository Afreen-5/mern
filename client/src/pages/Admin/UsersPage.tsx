import { useEffect, useState } from "react"
import { getUserByRole } from "../../services/user.service";

const UserPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async() => {
        const response = await getUserByRole();
        console.log(response, "Users fetched from API");
        setUsers(response);
    }

    useEffect( () => {
        fetchUsers();
    }, [])

    return (
        <>
            <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-stone-700 to-stone-500 rounded-lg p-4 max-w-2xl w-full overflow-y-auto">
                <table className="w-full">
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b" >
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserPage;