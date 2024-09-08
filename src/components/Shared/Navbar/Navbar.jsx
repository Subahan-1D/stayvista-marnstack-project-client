import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import HostModal from "../../Modal/HostRequestModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // for is modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = async () => {
    setIsModalOpen(false);
  };

  // continue a click or database host yes
  const modalHandler = async () => {
    console.log("i want to be a host");
    // new request admin 
       try {
         const currentUser = {
           email: user?.email,
           role: "guest",
           status: "Requested",
         };
         const { data } = await axiosSecure.put(`/user`, currentUser);
         console.log(data);
         if (data.modifiedCount > 0) {
           toast.success("Success! Please wait for admin confirmation");
         } else {
           toast.success("Please!, Wait for admin approval👊");
         }
       } catch (err) {
         console.log(err);
         toast.error(err.message);
       } finally {
         closeModal();
       }
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <div className="flex">
                <img
                  className="w-12 h-12 rounded-lg mr-2"
                  // className='hidden md:block'
                  src="https://i.ibb.co.com/Gx8J8HM/images.jpg"
                  alt="logo"
                  width="100"
                  height="100"
                />

                <h1 className="text-3xl mt-2 text-red-700">
                  Grandview{" "}
                  <span className="text-blue-700"> Mansion Hotels</span>
                </h1>
              </div>
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Become A Host btn */}
                <div className="hidden md:block">
                  {/* {!user && ( */}
                  <button
                    // disabled={!user}
                    onClick={() => setIsModalOpen(true)}
                    className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                  >
                    Request to be a host
                  </button>
                  {/* )} */}
                </div>
                {/* Modal */}
                <HostModal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  modalHandler={modalHandler}
                ></HostModal>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block  px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block  px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
