import axios from "axios";
import { useState } from "react";

export default function TableList({
  handleOpen,
  searchTerm,
  tableData,
  setTableData,
}) {
  const [error, setError] = useState(null);

  /* Filtro de busca navbar*/

  const filteredData = tableData.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* Lógica de deletação de usuário*/

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deseja deletar este colaborador ?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/clients/${id}`);
        setTableData((prevData) =>
          prevData.filter((client) => client.id !== id)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="overflow-x-auto mt-10 mx-5 rounded-box border border-base-content/5 bg-base-100">
        <table className="table ">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ocupação</th>
              <th>Nota</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="hover">
            {filteredData.map((client) => (
              <tr key={client.id}>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 px-11 ${
                      client.isactive
                        ? `btn-primary`
                        : `btn-outline btn-primary `
                    }`}
                  >
                    {client.isactive ? "Disponível" : "Indisponível"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen("edit", client)}
                    className="btn btn-secondary"
                  >
                    Atualizar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-accent"
                    onClick={() => handleDelete(client.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
