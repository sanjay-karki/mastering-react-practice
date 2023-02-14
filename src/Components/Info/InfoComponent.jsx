import React, { lazy, Suspense, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import Loading from "../Loading";
import ModularBox from "../ModularBox";
import { StateContext } from "../../Store/Store";
import { DispatchContext } from "../../Store/Store";

const Table = lazy(() => shortDelay(import("./TableWithPagination")));

function Info() {
  const { toggleInfo, fetchInfo, error, setFetchInfo } =
    useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const {userIdToDeleteOrUpdate, isEdit, isDelete, confirmDelete, confirmEdit} = toggleInfo;

  useEffect(() => {
    if (!userIdToDeleteOrUpdate) return;

    if (userIdToDeleteOrUpdate && confirmDelete) {
      setFetchInfo(
        fetchInfo.filter(
          (info) => info.login.uuid !== userIdToDeleteOrUpdate
        )
      );
      dispatch({
        type: "SET_CONFIRM_DELETE_FALSE",
      });
    }
    if (userIdToDeleteOrUpdate && confirmEdit) {
      dispatch({
        type: "SET_CONFIRM_EDIT_FALSE",
      });
    }
  }, [
    userIdToDeleteOrUpdate,
    confirmDelete,
    confirmEdit,
  ]);

  if (error) {
    return <div>Something's not right. Error: {error.message}</div>;
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch({
      type: "SET_ISDELETE_TRUE",
      payload: id,
    });
  };
  const handleEdit = (e, id) => {
    e.preventDefault();
    dispatch({
      type: "SET_ISEDIT_TRUE",
      payload: id,
    });
  };

  return (
    <div
      className={
        isDelete || isEdit
          ? "userinfo-container inactive-container"
          : "userinfo-container"
      }
    >
      {(isDelete || isEdit) &&
        createPortal(<ModularBox dispatch={dispatch} />, document.body)}
      <Suspense fallback={<Loading />}>
        <Table
          fetchInfo={fetchInfo}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </Suspense>
    </div>
  );
}

export default Info;

// just for practice
async function shortDelay(promise) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return promise;
}