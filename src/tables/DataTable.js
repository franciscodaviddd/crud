import React from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const DataTable = ({ newData, handleEdit, handleDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Accion</th>
      </tr>
    </thead>
    <tbody>
      {newData.map((item) => (
        <tr key={item.id}>
          <td>{item.user}</td>
          <td>{item.email}</td>
          <td>
            <button
              onClick={() => {
                handleEdit(item);
              }}
              className="button muted-button"
            >
              <i className="table__icon">
                <FaRegEdit />
              </i>
              Editar
            </button>
            -
            <button
              onClick={() => handleDelete(item.id)}
              className="button muted-button"
            >
              <i className="table__icon">
                <FaRegTrashAlt />
              </i>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
