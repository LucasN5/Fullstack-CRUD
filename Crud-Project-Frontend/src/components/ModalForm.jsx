import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  OnSubmit,
  clientData,
}) {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  /* Lógica de criação de usuário */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        job,
        rate: Number(rate),
        isactive: status,
      };
      await OnSubmit(clientData);
    } catch (err) {
      console.error("Error adding client", err);
    }
    onClose();
  };

  /* Lógica para atualização de usuário*/

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isActive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [mode, clientData]);

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Editar Funcionário" : "Detalhes Funcionário"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input validator my-4 w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                required
                placeholder="Nome Colaborador"
                pattern="[A-Za-z][A-Za-z\-\s]*"
                maxLength="30"
                title="Somente letras"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="validator-hint hidden">
              Preencha o campo novamente
            </div>

            <label className="input validator my-4 w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <div className="validator-hint hidden">
              Adicione um email válido
            </div>

            <label className="input validator my-4 w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#727888 "
                  d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"
                />
              </svg>
              <input
                type="input"
                required
                placeholder="Trabalho"
                pattern="[A-Za-z][A-Za-z0-9\-\s]*"
                maxLength="30"
                title="Somente letras"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            <div className="validator-hint hidden">
              Preencha o campo novamente
            </div>

            <div className="flex my-4 gap-5">
              <div>
                <label className="input validator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[1em] opacity-50"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#727888"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                  </svg>
                  <input
                    type="number"
                    required
                    placeholder="Nota"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    maxLength="3"
                    title="Somente número"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </label>
                <div className="validator-hint hidden">
                  Preencha o campo apenas com números
                </div>
              </div>

              <select
                value={status ? "Active" : "Inactive"}
                className="select"
                onChange={handleStatusChange}
              >
                <option value={"Active"}>Disponível</option>
                <option value={"Inactive"}>Indisponível</option>
              </select>
            </div>

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>

            <button type="submit" className="btn btn-success" onClick={onClose}>
              {mode === "edit" ? "Salvar Alterações" : "Adicionar Funcionário"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
