import React, { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
const AddUserForm = ({ newData, setNewData }) => {
  const initialFormState = { id: null, user: "", email: "" };
  const [data, setData] = useState(initialFormState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!data.user || !data.email) return;
        data.id = newData.length + 1;
        setNewData([...newData, data]);
        // handleAdd(data);
        setData(initialFormState);
      }}
      className="form"
    >
      <div className="form__input">
        <i className="form__icon">
          <FaUser />
        </i>
        <label>Usuario</label>
        <input
          type="text"
          name="user"
          value={data.user}
          onChange={handleInputChange}
        />
      </div>
      <div className="form__input">
        <i className="form__icon">
          <FaEnvelope />
        </i>
        <label>Correo</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
        />
      </div>
      <button className="form__button">Agregar</button>
    </form>
  );
};

export default AddUserForm;
