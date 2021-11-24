import { Dialog, Transition } from "@headlessui/react";
import firebase from "firebase";
import { Fragment, useState } from "react";
import { useContext } from "react";
import { Context } from "../Context";
import { db } from "../firebase";
import List from "./List";

function NewListModal() {
  const {
    openNewListModal,
    setOpenNewListModal,
    _profiles,
    lists,
    setLists,
    user,
    userGuest,
  } = useContext(Context);
  const [newListHeader, setNewListHeader] = useState("");
  const [newListSubHeader, setNewListSubHeader] = useState("");
  const [newListExplanation, setNewListExplanation] = useState("");

  const handlePublishNewList = (e) => {
    e.preventDefault(e);

    db.collection("lists").add({
      header: newListHeader,
      subheader: newListSubHeader,
      ranking: _profiles,
      listExplanation: newListExplanation,
      createdBy: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    /* setLists((prev) => [
      ...prev,
      {
        header: newListHeader,
        subheader: newListSubHeader,
        ranking: _profiles,
        listExplanation: newListExplanation,
      },
    ]); */

    setOpenNewListModal(false);
    setNewListHeader("");
    setNewListSubHeader("");
    setNewListExplanation("");
  };

  return (
    <Transition.Root show={openNewListModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overscroll-y-auto "
        onClose={setOpenNewListModal}
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
                    New list
                  </Dialog.Title>

                  <div className="mt-2">
                    <input
                      className="border-none focus:ring-0 w-full text-center"
                      type="text"
                      placeholder="Header"
                      value={newListHeader}
                      onChange={(e) => setNewListHeader(e.target.value)}
                    />
                  </div>
                  <input
                    className="border-none focus:ring-0 w-full text-center"
                    type="text"
                    placeholder="Subheader"
                    value={newListSubHeader}
                    onChange={(e) => setNewListSubHeader(e.target.value)}
                  />

                  <List />

                  <textarea
                    value={newListExplanation}
                    onChange={(e) => setNewListExplanation(e.target.value)}
                    name=""
                    id=""
                    cols=""
                    rows=""
                    className="w-full text-base text-center focus:ring-transparent font-light border-none outline-none resize-none"
                    type="text"
                    placeholder="Explain your list. Drag n drop to reorder players. Swing hard"
                  />
                </div>

                <div className="mt-5 flex justify-center sm:mt-6">
                  <button
                    disabled={
                      !newListHeader.trim() ||
                      !newListSubHeader.trim() ||
                      !newListExplanation.trim() ||
                      userGuest
                    }
                    type="button"
                    onClick={(e) => handlePublishNewList(e)}
                    className="inline-flex justify-center py-2 w-2/5 rounded-md border border-transparent shadow-sm px-4  bg-blueish text-base font-medium text-white hover:bg-hoverBluish  focus:outline-none  sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 "
                  >
                    Publish
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

export default NewListModal;
