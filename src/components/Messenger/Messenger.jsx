import React, { useContext, useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { app } from "../../FireBase/firebase.init";
import { FireBaseContext } from "../../context/FireBaseContext";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
export default function Messenger() {
  const [searchFriend, setSearchFriend] = useState("");
  const [sendMessageData, setSendMessageData] = useState("");
  const [allFriends, setAllFriends] = useState(null);
  const { user } = useContext(FireBaseContext);
  const [friendId, setFriendId] = useState("");
  const [xChat, setXChat] = useState(null);
  const [showChat, setShowChat] = useState([]);

  useEffect(() => {
    if (user?.emailVerified) {
      const db = getDatabase(app);
      const friendsRef = ref(db, `/friends${user?.uid}`);
      onValue(friendsRef, (snapFriends) => {
        setAllFriends(snapFriends.val());
      });
    }
  }, [user]);
  console.log(allFriends);
  function addFriend() {
    const db = getDatabase(app);
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      for (let key in userData) {
        console.log(userData[key]);
        if (userData[key].userEmail === searchFriend) {
          set(ref(db, `/friends${user?.uid}/${userData[key]?.userId}`), {
            userId: userData[key]?.userId,
            userName: userData[key]?.userName,
            userEmail: userData[key]?.userEmail,
          });
          set(ref(db, `/friends${userData[key]?.userId}/${user?.uid}`), {
            userId: user.displayName,
            userName: userData[key]?.userName,
            userEmail: userData[key]?.userEmail,
          });
          set(ref(db, `/chat${userData[key]?.userId}/`), {
            create: user?.displayName,
            message: [{ chatName: user?.displayName, mss: "Add succesfull" }],
          });
        }
      }
    });
  }
  function handelFriendClick(clickId) {
    setFriendId(clickId);
    console.log(clickId);
    const db = getDatabase(app);
    const chatRef = ref(db, `/chat${clickId}/`);
    onValue(chatRef, (chat) => {
      setXChat(chat.val().message);
      setShowChat([...chat.val().message]);
    });
  }
  function sendMessage(e) {
    e.preventDefault();

    const db = getDatabase(app);

    set(ref(db, `/chat${friendId}`), {
      message: [
        ...xChat,
        { chatName: user?.displayName, mss: sendMessageData },
      ],
    });
    setShowChat((pre) => [
      ...pre,
      { chatName: user?.displayName, mss: sendMessageData },
    ]);
  }
  console.log(showChat);
  return (
    <>
      <section className="h-[80vh] mt-4 flex gap-4 max-w-[1000px] mx-auto ">
        {/* friends */}
        <div className="text-xl w-72 ">
          <h1>Friends</h1>
          {allFriends &&
            Object?.keys(allFriends)?.map((item) => {
              return (
                <h1
                  onClick={() => handelFriendClick(allFriends[item]?.userId)}
                  key={allFriends[item]?.userId}
                  className="cursor-pointer bg-slate-300 text-center my-3"
                >
                  {allFriends[item]?.userName}
                </h1>
              );
            })}
        </div>
        {/* chats */}
        <div className="w-full relative">
          <div className="flex">
            <input
              className="border-2"
              value={searchFriend}
              onChange={(e) => setSearchFriend(e.target.value)}
              type="text"
              placeholder="search friend"
            />
            <button className="bg-orange-300" onClick={addFriend}>
              Add Friend
            </button>
          </div>
          {xChat?.map((item, i) =>
            item.chatName === user.displayName ? (
              <div className="text-right">{item.mss}</div>
            ) : (
              <div key={i + i}>{item.mss}</div>
            )
          )}
          {/* <div>asdf</div>
          <div className="text-right">asdf</div> */}

          <form className="mb-4 w-full gap-4 flex items-center absolute bottom-0">
            <input
              value={sendMessageData}
              onChange={(e) => setSendMessageData(e.target.value)}
              className=" border-2 flex-grow"
              placeholder="Write Your Message..."
              type="text"
            />
            <button
              onClick={sendMessage}
              className="bg-white w-24 flex-shrink-0"
            >
              Log in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
