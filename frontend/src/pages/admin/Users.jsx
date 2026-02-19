import { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { userService } from '../../services/userService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState('ALL');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAllUsers();
            if (roleFilter !== 'ALL') {
                setUsers(data.filter(u => u.role === roleFilter));
            } else {
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const handleToggleStatus = async (user) => {
        const newStatus = user.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        try {
            await userService.updateUserStatus(user.id, newStatus);
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role', render: (row) => <span className="font-medium text-gray-600 dark:text-gray-300">{row.role}</span> },
        { header: 'Joined Date', accessor: 'joinedDate' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Action',
            accessor: 'id',
            render: (row) => (
                <button
                    onClick={() => handleToggleStatus(row)}
                    className={`text-xs px-3 py-1 rounded border ${row.status === 'ACTIVE'
                            ? 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20'
                            : 'border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20'
                        }`}
                >
                    {row.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                </button>
            )
        }
    ];

    return (
        <div>
            <PageHeader
                title="Users Management"
                description="View and manage all registered users"
            />

            <div className="mb-6 flex gap-2">
                {['ALL', 'VENDOR', 'PUBLISHER', 'EMPLOYEE'].map(role => (
                    <button
                        key={role}
                        onClick={() => setRoleFilter(role)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${roleFilter === role
                                ? 'bg-rose-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                    >
                        {role === 'ALL' ? 'All Users' : role}
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />
        </div>
    );
};

export default Users;
