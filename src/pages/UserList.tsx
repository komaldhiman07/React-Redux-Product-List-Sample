import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddUserForm from "../components/AddUser/AddUser";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import SidebarLayout from "../components/Layouts/SidebarLayout";
import { IUser, IUserData } from "../interfaces";
import { UserListCall, UserSearch } from "../services/ApiCalls";
import styles from "./styles/UserList.module.scss";
const UserList = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [editUser, setEditUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleUserList = async (skip: number, limit: number) => {
    try {
      const res = await UserListCall(skip, limit);
      console.log("response===>", res);
      setUserList(res.data.users);
      setTotalPages(Math.ceil(res.data.total / res.data.limit));
      if (res.status === 200) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePagination = (index: number) => {
    let pageNumber = index + 1;
    setActivePage(pageNumber);
  };
  const handleToggleAddUser = () => {
    setOpenSidebar(!openSidebar);
  };
  const handleAddUser = () => {
    setEditUser(null);
    handleToggleAddUser();
  };
  const handleEditUser = (values: IUser) => {
    setEditUser(values);
    handleToggleAddUser();
  };
  const callSearchApi = async () => {
    try {
      console.log(searchValue);
      const res = await UserSearch(searchValue);
      setSearchedUsers(res.data.users);
    } catch (err) {}
  };
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    if (searchValue) {
      const timerFunction = setTimeout(() => {
        callSearchApi();
      }, 1000);
      return () => clearTimeout(timerFunction);
    } else {
      setSearchedUsers([]);
    }
  }, [searchValue]);
  const updateUserList = (user: IUserData) => {
    const usersCopy = userList;
    const userIndex = usersCopy.findIndex((item: IUser) => item.id == user.id);
    if (userIndex !== -1) {
      usersCopy[userIndex] = {
        ...userList[userIndex],
        ...user,
      };
    } else {
      usersCopy.push(user);
    }
    setUserList([...usersCopy]);
  };
  useEffect(() => {
    setLoading(true);
    handleUserList((activePage - 1) * 20, 20);
  }, [activePage]);
  return (
    <DashboardLayout>
      <div className={styles.userListPage}>
        <div className="listingHeader">
          <h1>All Users</h1>
          <div className="searchField">
            <input
              className="form-control"
              placeholder="search user"
              value={searchValue}
              onChange={handleSearch}
              type="text"
            />
            {searchedUsers.length ? (
              <div className="searchList">
                <ul>
                  {searchedUsers.map((userSingle: IUser) => (
                    <Link to={`/user/${userSingle.id}`} key={userSingle.id}>
                      <li>
                        <h5>{`${userSingle.firstName} ${userSingle.lastName}`}</h5>
                        <span>{userSingle.email}</span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Button onClick={handleAddUser}>Add User +</Button>
        </div>
        <div>
          <div className={styles.userList}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>University</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  userList.length &&
                  userList.map((user: any) => (
                    <tr key={user.id}>
                      <td>
                        <div className={styles.userName}>
                          <span className={styles.userImg}>
                            <img src={user.image} alt="" />
                          </span>
                          <span>{`${user.firstName} ${user.lastName}`}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.university}</td>
                      <td>
                        <Link to={`/user/${user.id}`}>
                          <button className="btn btn-primary">
                            Check Profile
                          </button>
                        </Link>
                        <button
                          className="btn btn-secondary ms-3"
                          onClick={() => {
                            handleEditUser(user);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={100}>Loading...</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {!loading ? (
            <ul className={styles.pagination}>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={index + 1 === activePage ? "active" : ""}
                  onClick={() => {
                    handlePagination(index);
                  }}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <SidebarLayout
          title={editUser ? "Edit user" : "Add user"}
          show={openSidebar}
          handleToggle={handleToggleAddUser}
        >
          <AddUserForm
            updateUserList={updateUserList}
            userEdit={editUser}
            toggleSidebar={handleToggleAddUser}
          />
        </SidebarLayout>
      </div>
    </DashboardLayout>
  );
};

export default UserList;
