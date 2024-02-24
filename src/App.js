import { Fragment, useEffect, useRef, useState } from "react";
import Pill from "./components/Pill";
import "./App.css";

//https://dummyjson.com/users/search?q=

//First Create The Input Box and Search drop-down
//The create the Pill Component
//Write the logic for Select User and Remove User

function App() {
  const [search, setSearch] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());

  const inputRef = useRef(null);

  const fetchUsers = async () => {
    const res = await fetch(`https://dummyjson.com/users/search?q=${search}`);
    const data = await res.json();
    setSuggestionList(data.users);
  };

  const handleSelectedUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
    setSearch("");
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUsersSet);
    // console.log(selectedUsersSet);
    // console.log(updatedEmails);
    updatedEmails.delete(user.email);
    setSelectedUsersSet(updatedEmails);
  };

  // console.log(suggestionList.length);

  useEffect(() => {
    fetchUsers();
    inputRef.current.focus();
  }, [search]);

  return (
    <div className="m-2 p-2 relative">
      <div className="flex gap-1 m-1 p-1">
        {selectedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Name..."
          className="w-[420px] border border-black p-2 m-2 rounded-md outline-none"
          value={search}
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul
          className={
            suggestionList.length === 0
              ? "hidden"
              : "-mt-2 border border-black mx-2 w-72 rounded-lg outline-none h-72 overflow-y-auto absolute"
          }
        >
          {suggestionList.map((user) => {
            return !selectedUsersSet.has(user.email) ? (
              <li
                onClick={() => handleSelectedUser(user)}
                key={user.email}
                className="flex gap-2 m-0.5 p-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
              >
                <img
                  src={user.image}
                  alt={user.email}
                  className="w-8 border border-black rounded-full"
                />
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </li>
            ) : (
              <Fragment key={user.email}></Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
