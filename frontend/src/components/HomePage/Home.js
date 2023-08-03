import React, { useEffect } from "react";
import { deleteUser, getAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";

export const Home = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.user.users?.allUsers);
  const msgUser = useSelector((state) => state.user?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJwt = createAxios(user, dispatch, loginSuccess);

  //get all user when logins
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch, axiosJwt);
    }
  }, []);
  //handle delete user
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJwt);
  };
  return (
    <section className="bg-[#eff0ff] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  ">
      <div className="bg-white shadow-md rounded-md overflow-hidden  max-w-lg mx-auto min-w-[500px] ">
        <div className="bg-gray-100 py-2 px-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {`Your role: ${user?.admin ? "Admin" : "User"}`}
          </h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {userList?.map((user, id) => (
            <li key={id} className="flex items-center py-4 px-6">
              <span className="text-gray-700 text-lg font-medium mr-4">
                {id}
              </span>
              <img
                className="w-12 h-12 rounded-full object-cover mr-4"
                src="https://randomuser.me/api/portraits/women/72.jpg"
                alt="User avatar"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 flex justify-between">
                  {user.username}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-blue-500 bg-red hover:bg-[#cf2525]  text-white font-bold py-1 px-4 rounded "
                  >
                    Delete
                  </button>
                </h3>

                <p className="text-gray-600 text-base">1234 points</p>
              </div>
            </li>
          ))}
          <p>{msgUser}</p>
        </ul>
      </div>
    </section>
  );
};
