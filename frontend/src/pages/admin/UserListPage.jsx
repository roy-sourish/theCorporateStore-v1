import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Badge from "../../components/Badge";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";

function UserListPage() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User Deleted");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <div>
      <div className=" xl:max-w-screen-xl lg:max-w-screen-lg sm:max-w-screen-sm mx-auto mt-14  pb-[300px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight  p-5">
            Manage Users
          </h2>
        </div>
        {loadingDelete && (
          <span className="loading loading-ring loading-lg"></span>
        )}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Badge
            flag={false}
            lableTextFalse={error?.data?.message || error?.error}
          />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra table-xs sm:table-md">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <th></th>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            height="20"
                            width="17.5"
                          >
                            <path
                              fill="#63E6BE"
                              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="15"
                            viewBox="0 0 384 512"
                          >
                            <path
                              fill="#ff0000"
                              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                            />
                          </svg>
                        )}
                      </td>

                      <td>
                        <>
                          <Link
                            to={`/admin/user/${user._id}/edit`}
                            className="btn btn-xs btn-warning mx-3"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => deleteHandler(user._id)}
                          >
                            Delete
                          </button>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserListPage;
