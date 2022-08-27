import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import { SingleUserListCall } from "../services/ApiCalls";
import styles from "./styles/UserDetail.module.scss";

const UserDetail = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const { id } = useParams();
  const userID = id;
  const handleSingleUserData = async (id: number) => {
    setLoading(true);
    try {
      const res = await SingleUserListCall(id);
      console.log("response===>", res);
      setUserData(res.data);
      if (res.status === 200) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleSingleUserData(Number(userID));
  }, []);
  return (
    <DashboardLayout>
      {!loading ? (
        <div className={styles.userDetailPage}>
          <div className={styles.userProfile}>
            <img src={userData.image} alt="image" />
            <div className={styles.userName}>
              <h4>{`${userData.firstName} ${userData.lastName}`}</h4>
              <p>{userData.email}</p>
              <button className="btn btn-secondary btn-sm">View posts</button>
            </div>
          </div>
          <div className={styles.userDetail}>
            <UserSingleDetail heading="Age" value={`${userData.age} years`} />
            <UserSingleDetail heading="Gender" value={userData.gender} />
            <UserSingleDetail heading="Phone" value={userData.phone} />
            <UserSingleDetail heading="Birth Date" value={userData.birthDate} />
            <UserSingleDetail
              heading="Blood Group"
              value={userData.bloodGroup}
            />
            <UserSingleDetail heading="Age" value={`${userData.age} years`} />
            <UserSingleDetail
              heading="Department"
              value={userData.company?.department}
            />
            <UserSingleDetail
              heading="University"
              value={userData.university}
            />
            <UserSingleDetail heading="Phone" value={userData.phone} />
            <UserSingleDetail
              heading="Address"
              value={userData.company?.address?.address}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </DashboardLayout>
  );
};

// ==================== Internal components ===============

interface IUser {
  heading: string;
  value: string;
}
function UserSingleDetail({ heading, value }: IUser) {
  return (
    <div className={styles.userDetail_single}>
      <h6 className={styles.heading}>{heading}</h6>
      <span className={styles.detail}>{value}</span>
    </div>
  );
}
export default UserDetail;
