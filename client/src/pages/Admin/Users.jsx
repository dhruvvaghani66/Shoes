import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users data
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-users`
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Users</h1>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      {/* You can add actions like Edit or Delete here */}
                      <button className="btn btn-warning btn-sm">Edit</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
