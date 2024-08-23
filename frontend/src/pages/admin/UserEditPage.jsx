import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

function UserEditPage() {
  const navigate = useNavigate();

  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    };

    const result = await updateUser(updatedUser);

    if (result.err) {
      toast.error(result.error);
    } else {
      toast.success("User Updated");
      refetch();
      navigate("/admin/userlist");
    }
  };

  return (
    <div>
      <form
        className="max-w-md md:max-w-xl mx-auto mt-5 mb-20 pb-[86px]"
        onSubmit={submitHandler}
      >
        <div className="breadcrumbs text-sm ">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin/userlist">Manage Users</Link>
            </li>
            <li>Edit {name}</li>
          </ul>
        </div>
        <h1 className="text-3xl my-2 tracking-tight">Edit User</h1>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full rounded"
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded"
          />
        </label>
        <label className="label cursor-pointer w-24 my-5">
          <input
            type="checkbox"
            className="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <span className="label-text">Is Admin</span>
        </label>

        <button type="submit" className="btn btn-wide my-5">
          Update User
        </button>
      </form>
    </div>
  );
}

export default UserEditPage;
