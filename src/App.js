import React, { useState } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import DataTable from "./tables/DataTable";

const App = () => {
  const data = [
    { id: 1, user: "francisco", email: "fran@gmail.com" },
    { id: 2, user: "ricky", email: "proveer@gmail.com" },
    { id: 3, user: "cami", email: "cami@gmail.com" },
    { id: 4, user: "claudio", email: "oconnor@gmail.com" },
  ];

  const initialState = { id: null, user: "", email: "" };

  const [newData, setNewData] = useState(data);
  const [currentData, setCurrentData] = useState(initialState);
  const [editing, setEditing] = useState(false);

  const handleDelete = (id) => {
    setEditing(false);

    setNewData(newData.filter((user) => user.id !== id));
  };

  const handleEdit = (data) => {
    setEditing(true);

    setCurrentData({ id: data.id, user: data.user, email: data.email });
  };

  return (
    <div className="wrapper">
      <div className="home container pw-1-p">
        <h1 className="home__title p-100-p">CRUD con React</h1>
        <div className="p-100-p p-50-d order-2-p order-1-d mt-2-p mt-0-d">
          {editing ? (
            <>
              <h2 className="home__subtitle">Editar Usuario</h2>
              <EditUserForm
                setEditing={setEditing}
                currentData={currentData}
                newData={newData}
                setNewData={setNewData}
              />
            </>
          ) : (
            <>
              <h2 className="home__subtitle">Agregar Usuario</h2>
              <AddUserForm newData={newData} setNewData={setNewData} />
            </>
          )}
        </div>
        <div className="p-100-p p-50-d order-1-d">
          <h2 className="home__subtitle">Usuarios</h2>
          <DataTable
            newData={newData}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
