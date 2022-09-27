import React, { useState, useEffect } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";

const EditUserForm = ({ setEditing, currentData, newData, setNewData }) => {
  const [data, setData] = useState(currentData);
  useEffect(() => {
    setData(currentData);
  }, [currentData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setEditing(false);

        setNewData(newData.map((item) => (item.id === data.id ? data : item)));
        // handleUpdate(data.id, data);
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

      <button className="form__button">Actualizar</button>
      <span onClick={() => setEditing(false)} className="form__cancel">
        Cancelar y volver atras.
      </span>
    </form>
  );
};

export default EditUserForm;
