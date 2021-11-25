import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { useContext } from "react";
import { Context } from "../Context";
import { auth } from "../firebase";

function LoginModal() {
  const { openLoginModal, setOpenLoginModal, setUser } = useContext(Context);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        setUser({
          displayName: userAuth.user.displayName,
          email: userAuth.user.email,
          photoURL: userAuth.user.photoURL,
          uid: userAuth.user.uid,
        });
      })
      .catch((error) => alert(error));
    //console.log(user);

    setOpenLoginModal(false);
  };

  return (
    <Transition.Root show={openLoginModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overscroll-y-auto "
        onClose={setOpenLoginModal}
      >
        <div className="flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* trick browser to center the modal contents...-> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
              <div>
                <div className="mt-1 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Log in
                  </Dialog.Title>
                  <UserCircleIcon className="h-12 w-12 mb-4 mx-auto" />

                  <div className="mt-2">
                    <input
                      className="bg-gray-50 focus:ring-black mt-4 focus:border-black text-center focus:ring-0 w-full block sm:text-sm border-gray-300 rounded-md"
                      type="text"
                      placeholder="E-mail (anything@hotmail.com)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    className="bg-gray-50 focus:ring-black mt-4 focus:border-black text-center focus:ring-0 w-full block sm:text-sm border-gray-300 rounded-md"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex justify-center sm:mt-6">
                  <button
                    onClick={(e) => handleLogin(e)}
                    disabled={!email.trim() || !password.trim()}
                    type="button"
                    className="inline-flex justify-center py-2 w-2/5 rounded-md border border-transparent shadow-sm px-4  bg-purpleish hover:bg-hoverPurpleish text-base font-medium text-white   focus:outline-none  sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 "
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default LoginModal;
