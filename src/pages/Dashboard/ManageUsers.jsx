import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import MotionButton from "../../components/Button/MotionButton";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (usr) => {
    axiosSecure.patch(`/users/admin/${usr._id}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`${usr.name} is an Admin Now!`);
      }
    });
  };

  const handleMakeInstructor = (usr) => {
    axiosSecure.patch(`/users/instructor/${usr._id}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success(`${usr.name} is an Instructor Now!`);
      }
    });
  };

  return (
    <div className="w-full max-w-5xl p-4">
      <Helmet>
        <title>LinguaVerse | Manage Users</title>
      </Helmet>
      <p className="text-4xl font-medium text-center mb-8">Manage All Users</p>
      <div className="overflow-x-auto my-4 border border-gray-300 rounded">
        <table className="table table-zebra text-base">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, i) => (
              <tr key={usr._id}>
                <th>{i + 1}</th>
                <td>{usr?.name}</td>
                <td>{usr?.email}</td>
                <td>
                  <MotionButton>
                    <button
                      onClick={() => handleMakeAdmin(usr)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white normal-case"
                      disabled={usr?.role === "admin"}
                    >
                      Make Admin
                    </button>
                  </MotionButton>
                </td>
                <td>
                  <MotionButton>
                    <button
                      onClick={() => handleMakeInstructor(usr)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white normal-case"
                      disabled={usr?.role === "instructor" || usr?.role === 'admin'}
                    >
                      Make Instructor
                    </button>
                  </MotionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
