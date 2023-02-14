import React, { useContext, useState } from "react";
import { StateContext } from "../Store/Store";
import Label from "../Components/Info/Label";

function ModularBox({ dispatch }) {
  const { toggleInfo, fetchInfo, setFetchInfo } = useContext(StateContext);
  const userIdToDeleteOrUpdate = toggleInfo.userIdToDeleteOrUpdate;
  
  const preFillObject =
    fetchInfo.find((info) => info.login.uuid === userIdToDeleteOrUpdate) || {};

  const isAddUser = !Object.keys(preFillObject).length ? true : false;

  const text=
    toggleInfo.isDelete
      ? "Are you sure you want to delete this user's data?"
      : toggleInfo.isEdit
      ? isAddUser ? "Add User Data" : "Edit User Data"
      : null

  const [formData, setFormData] = useState({
    name: {
      first: isAddUser ? "" : preFillObject.name.first,
      last: isAddUser ? "" : preFillObject.name.last,
    },
    gender: isAddUser ? "" : preFillObject.gender,
    location: {
      country: isAddUser ? "" : preFillObject.location.country,
    },
    email: isAddUser ? "" : preFillObject.email,
    phone: isAddUser ? "" : preFillObject.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [objectKey, nestedKey] = name.split(".");
      setFormData({
        ...formData,
        [objectKey]: { ...formData[objectKey], [nestedKey]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newFetchInfo = fetchInfo.map((info) => {
      if (info.login.uuid === userIdToDeleteOrUpdate) {
        return { ...info, ...formData };
      } else return info;
    });
    setFetchInfo(newFetchInfo);
    dispatch({
      type: "SET_CONFIRM_EDIT_TRUE",
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const genderOption =
      formData.gender === "male"
        ? "men"
        : formData.gender === "female"
        ? "women"
        : Math.random() < 0.5
        ? "men"
        : "women";
    fetchInfo.push({
      ...formData,
      login: { uuid: userIdToDeleteOrUpdate },
      picture: {
        large:
          "https://randomuser.me/api/portraits/" +
          genderOption +
          "/" +
          Math.floor(Math.random() * 100) +
          ".jpg",
      },
    });
    dispatch({
      type: "SET_CONFIRM_EDIT_TRUE",
    });
  };

  return (
    <div className={toggleInfo.isDelete ? "modularBox deleteUser-container" : "modularBox" }>
      {toggleInfo.isDelete && (
        <>
        <p>{text}</p>
          <button
            onClick={() => {
              dispatch({
                type: "SET_CONFIRM_DELETE_TRUE",
              });
            }}
          >
            Yes
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "SET_ISDELETE_FALSE",
              })
            }
          >
            Cancel
          </button>
        </>
      )}
      {toggleInfo.isEdit && (
        <div className="editUserForm-container">
          <h2>{text}</h2>
          <img
            src={
              isAddUser
                ? "https://api.dicebear.com/5.x/lorelei-neutral/svg"
                : preFillObject.picture.large
            }
            alt={isAddUser ? "Avatar" : "Picture of " + formData.name.first}
            title={isAddUser ? "Avatar" : "Picture of " + formData.name.first}
          />
          <form
            onSubmit={isAddUser ? handleAddSubmit : handleEditSubmit}
            className="editUserForm"
          >
            {Label("First Name:","name.first",formData.name.first,"name",formData,setFormData,handleChange)}
            {Label("Last Name:","name.last",formData.name.last,"name",formData,setFormData,handleChange)}
            {Label("Gender:","gender",formData.gender,"radio",formData,setFormData,handleChange)}
            {Label("Country:","",formData.location.country,"",formData,setFormData,handleChange)}
            {Label("Email:","email",formData.email,"email",formData,setFormData,handleChange)}
            {Label("Phone:","phone",formData.phone,"tel",formData,setFormData,handleChange)}
            <div>
              <button type="submit">{isAddUser ? "Add" : "Update"}</button>
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_ISEDIT_FALSE",
                  })
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ModularBox;
