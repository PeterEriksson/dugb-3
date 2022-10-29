import { useContext, useEffect, useState } from "react";
/* import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; */
import List from "../components/List";
import NewListModal from "../components/NewListModal";
import { Context } from "../Context";
import ListPublishedExample from "../components/ListPublishedExample";
/* import ModalTest from "../components/ModalTest";  deleted...*/
import { db } from "../firebase";
import FlipMove from "react-flip-move";
import LoadingSpinnerNotific from "../components/LoadingSpinnerNotific";
import Head from "next/head";

function lists() {
  const [openNewListModal, setOpenNewListModal] = useState(false);

  /* Make use of FlipMove and NOT read from firebase every time (only when firebase lists db is changed) */
  const [__lists, __setLists] = useState([]);
  const {
    lists,
    elementIdToScrollTo,
    setElementIdToScrollTo,
    setLoadingNotific,
    loadingNotific,
  } = useContext(Context);
  useEffect(() => {
    __setLists(lists);
  }, [lists]);

  useEffect(() => {
    if (elementIdToScrollTo == "") return;
    setLoadingNotific(true);
    setTimeout(() => {
      document.getElementById(elementIdToScrollTo).scrollIntoView({
        behavior: "smooth",
      });
      setElementIdToScrollTo("");
      setLoadingNotific(false);
    }, 1400);
  }, []);

  return (
    <div className=" border-l border-r border-grayish flex flex-col    h-screen xs:h-auto">
      <Head>
        <title>Lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mt-3 font-bold text-2xl text-center">Lists</h1>
      <p className="font-light px-3 text-center pb-4">
        Who is best at what? Customize your own lists and rank your friends. Hot
        tip: it's probably not Norman. Hot tip 2: it's probably not Martin.
      </p>
      <div className="border-b border-grayish " />

      <button
        onClick={() => setOpenNewListModal((prev) => !prev)}
        className="flex mx-auto mt-3 transition duration-100 hover:scale-105 bg-blueish w-28 h-10 p-4 rounded-full justify-center items-center"
      >
        <p className="text-white font-normal text-md">Create list</p>
      </button>
      {loadingNotific && <LoadingSpinnerNotific />}
      <NewListModal
        openNewListModal={openNewListModal}
        setOpenNewListModal={setOpenNewListModal}
      />

      {/* LISTS FEED */}
      <FlipMove>
        {__lists.map((item) => (
          <ListPublishedExample key={item.listId} item={item} />
        ))}
      </FlipMove>
    </div>
  );
}

export default lists;
