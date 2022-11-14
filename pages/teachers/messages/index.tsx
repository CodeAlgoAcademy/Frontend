import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GeneralNav, Sidebar } from "../../../components";
import ChatRoom from "../../../components/Teachers/messages/Chats/ChatRoom";
import MessagesLists from "../../../components/Teachers/messages/MessagesLists/MessagesLists";

const index = () => {
  return (
    <>
      <GeneralNav />
      <div className="flex items-stretch mb-auto">
        <div className="sidebar min-w-[270px]">
          <Sidebar />
        </div>

        <div className={styles.container}>
          <p className="text-xl">Messages</p>

          <div className={styles.containerBody}>
            <div className="space-y-10">
              <ul className={styles.informationBox}>
                <li className={styles.boxList}>
                  <p>All Messages</p>
                  <p className="text-center">22</p>
                </li>
                <li className={styles.boxList}>
                  <p>Important Messages</p>
                  <p className={styles.important}>4</p>
                </li>
                <li className={styles.boxList}>
                  <p>Unread Messages</p>
                  <p className="text-center">15</p>
                </li>
                <li className={styles.boxList}>
                  <p>Drafts</p>
                  <p className="text-center">3</p>
                </li>
              </ul>

              <div className={styles.searchBox}>
                <div className={styles.inputContainer}>
                  <AiOutlineSearch size={20} />
                  <input
                    className={styles.searchBoxInput}
                    placeholder="Search messages"
                  />
                </div>
                <div>
                  <MessagesLists />
                </div>
              </div>
            </div>

            <div className={styles.chatroom}>
              <ChatRoom />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

const styles = {
  container: "bg-gray-200 px-5 md:px-10 py-5 h-screen w-full",
  containerBody: "hidden md:flex justify-start p-5 space-x-32",
  informationBox: "bg-white p-5 text-xs font-light w-60 rounded-lg shadow-lg",
  boxList: "flex justify-between p-2 items-center",
  important:
    "bg-red-500 rounded-full p-[3px] text-[9px] w-4 h-4 flex justify-center items-center text-white font-semibold",
  searchBox: "bg-white rounded-lg pb-1 text-slate-800 shadow-lg",
  inputContainer: "bg-gray-300 flex p-2 rounded-t-lg items-center px-2",
  searchBoxInput:
    "outline-none bg-transparent pl-2 p-1 text-sm placeholder:text-slate-700",
  chatroom: "w-[528px] bg-slate-50 rounded-xl shadow pt-3",
};
