import React, { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';

const UsersTabRealtime = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const recentTimeThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    useEffect(() => {
        const socket = new WebSocket('ws://your-websocket-url');

        socket.onmessage = (event) => {
            const newUser = JSON.parse(event.data);
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setTotalUsers((prevTotal) => prevTotal + 1);
        };

        return () => {
            socket.close();
        };
    }, []);

    const renderUsers = () => {
        return users.map((user, index) => (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {new Date(user.createdAt) > recentTimeThreshold && <Badge variant="success">New</Badge>}
                </td>
            </tr>
        ));
    };

    return (
        <div>
            <h2>Admin Users List</h2>
            <h4>Total Users: {totalUsers}</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsers()}
                </tbody>
            </Table>
        </div>
    );
};

export default UsersTabRealtime;