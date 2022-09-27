import React, { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import ClassRoomsPost from "../services/ClassRoomsPost";
import Modal from "../components/Modal";
import Toolbar from "../layout/Toolbar";
import ClassRoomsPut from "../services/ClassRoomsPut";
import ClassRoomsDelete from "../services/ClassRoomsDelete";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { timeOrder } from "../helpers/timeOrder";
import { ActionContext } from "../context/context";
const ClassRooms = () => {
  const { dispatch } = useContext(ActionContext);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [update, setUpdate] = useState(false);
  const { data, error, loading } = useAxios(
    "http://localhost/apirest/salones",
    update
  );

  const [modalFor, setModalFor] = useState("");

  const handleAcction = (data, service) => {
    dispatch({ type: "update-data", payload: data });
    setModalFor(service);
    openModal();
    console.log(data);
  };
  useEffect(() => {
    setUpdate(true);
  }, [closeModal]);

  return (
    <>
      <Toolbar name="Salon" total={data.total} />
      <div className="table">
        <div className="table__header cr">
          <div className="table__title">Id</div>
          <div className="table__title">Nombre</div>
          <div className="table__title">Cursos</div>
          <div className="table__title">stados</div>
          <div className="table__title">Registrado</div>
          <div className="table__title">F° de Act.</div>
          <div className="table__title">Acciones</div>
        </div>
        {loading && <p>loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading &&
          !error &&
          data.map((items, i) => (
            <div className="table__content cr" key={i}>
              <div className="table__item">{items.id}</div>
              <div className="table__item">{items.nombre}</div>
              <div className="table__item">{items.curso}</div>

              <div className="table__item">{items.estado}</div>
              <div className="table__item">
                {timeOrder(items.fechaDeRegistro)}
              </div>
              <div className="table__item">
                {timeOrder(items.fechaDeActualizacion)}
              </div>
              <div className="table__item">
                <button
                  className="table__btns"
                  onClick={() => handleAcction(items, "put")}
                >
                  <i className="table__icon">
                    <FaRegEdit />
                  </i>
                  Editar
                </button>
                -
                <button
                  className="table__btns"
                  onClick={() => handleAcction(items, "delete")}
                >
                  <i className="table__icon">
                    <FaRegTrashAlt />
                  </i>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {modalFor === "Salon" && <ClassRoomsPost closeModal={closeModal} />}
        {modalFor === "put" && <ClassRoomsPut closeModal={closeModal} />}
        {modalFor === "delete" && <ClassRoomsDelete closeModal={closeModal} />}
      </Modal>
    </>
  );
};

export default ClassRooms;
import React, { useState, Fragment, useEffect, useContext } from "react";
import AddUserForm from "../forms/AddUserForm";
import EditUserForm from "../forms/EditUserForm";
import { timeOrder } from "../helpers/timeOrder";
import useAxios from "../hooks/useAxios";
import { useModal } from "../hooks/useModal";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../components/Modal";
import ClassRoomsPut from "../services/ClassRoomsPut";
import ClassRoomsDelete from "../services/ClassRoomsDelete";
import { ActionContext } from "../context/context";

const ClassRooms = () => {
  const { dispatch } = useContext(ActionContext);

  const { data, error, loading } = useAxios("http://localhost/apirest/salones");
  const initialFormState = { id: null, name: "", username: "" };
  const [modalFor, setModalFor] = useState("");
  // Setting state
  const [users, setUsers] = useState([]);
  const [isOpen, openModal, closeModal] = useModal(false);

  const [currentUser, setCurrentUser] = useState(initialFormState);
  // CRUD operations
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePut = (id, formData) => {
    console.log(formData.map((i) => i.nombre));
    // setUsers(updatedUser.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (val) => {
    setModalFor("put");
    dispatch({ type: "update-data", payload: val });
    openModal();
    // console.log("hola");
    // setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };
  useEffect(() => {
    setUsers([...data]);
  }, [data]);

  return (
    <>
      <div className="table">
        <div className="table__header cr">
          <div className="table__title">Id</div>
          <div className="table__title">Nombre</div>
          <div className="table__title">Cursos</div>
          <div className="table__title">stados</div>
          <div className="table__title">Registrado</div>
          <div className="table__title">F° de Act.</div>
          <div className="table__title">Acciones</div>
        </div>
        {loading && <p>loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading &&
          !error &&
          users.map((items, i) => (
            <div className="table__content cr" key={i}>
              <div className="table__item">{items.id}</div>
              <div className="table__item">{items.nombre}</div>
              <div className="table__item">{items.curso}</div>

              <div className="table__item">{items.estado}</div>
              <div className="table__item">
                {timeOrder(items.fechaDeRegistro)}
              </div>
              <div className="table__item">
                {timeOrder(items.fechaDeActualizacion)}
              </div>
              <div className="table__item">
                <button className="table__btns" onClick={() => editRow(items)}>
                  <i className="table__icon">
                    <FaRegEdit />
                  </i>
                  Editar
                </button>
                -
                <button className="table__btns" onClick={() => handleDelete()}>
                  <i className="table__icon">
                    <FaRegTrashAlt />
                  </i>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {modalFor === "put" && (
          <ClassRoomsPut closeModal={closeModal} handlePut={handlePut} />
        )}
        {modalFor === "delete" && <ClassRoomsDelete closeModal={closeModal} />}
      </Modal>
    </>
  );
};

export default ClassRooms;
import React, { useState, Fragment } from "react";
import AddUserForm from "../forms/AddUserForm";
import EditUserForm from "../forms/EditUserForm";
import UserTable from "../tables/UserTable";

const App = () => {
  // Data
  const data = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Craig", username: "siliconeidolon" },
    { id: 3, name: "Ben", username: "benisphere" },
  ];

  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [users, setUsers] = useState(data);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);

    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    console.log(users.map((user) => (user.id === id ? updatedUser : user)));
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
if (response.data.status === 300) {
  window.localStorage.removeItem(
    "users",
    JSON.stringify(response.data.result[0])
  );
  window.localStorage.removeItem("session", true);
  window.localStorage.removeItem(
    "token",
    response.data.result[0].token
  );
  window.location = "/";
} else {
  setStatus(false);
}

import { useState, useEffect } from "react";
import axios from "axios";
const useCreate = (dataUrl, dataForm) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (url, data) => {
      setLoading(true);
      try {
        const response = await axios({
          method: "post",
          url: url,
          data: data,
          responseType: "json",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        if (isMounted) {
          setData(response.data.result);
          setStatus(response.data.status);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setLoading(false);
      }
    };
    if (dataForm !== undefined) {
      fetchData(dataUrl, dataForm);
    }

    return () => {
      isMounted = false;
    };
  }, [dataUrl, dataForm]);

  return { data, status, error, loading };
};
export default useCreate;
 let formData = new FormData();
    formData.append("nombre", val.nombre);
    formData.append("curso", val.curso);
    formData.append("estado", val.estado);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdateRowData({ ...updateRowData, [name]: value });
    };const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateRowData({ ...updateRowData, [name]: value });
  };