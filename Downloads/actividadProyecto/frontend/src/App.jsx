// useEffect permite ejecutar una acción cuando carga el componente.
// useState permite manejar información dinámica dentro del componente.
import { useEffect, useState } from 'react';

// URL de la API.
const API_URL = 'http://localhost:3000/api/clientes';

function App() {
  // Estado donde se guardará la lista de clientes.
  const [clientes, setClientes] = useState([]);

  // Estado para manejar los datos del formulario.
  const [formulario, setFormulario] = useState({
    nombre: '',
    documento: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  // Estado para mostrar mensajes al usuario.
  const [mensaje, setMensaje] = useState('');

  /**
   * Función para obtener clientes desde la API.
   */
  const obtenerClientes = async () => {
    try {
      // fetch hace una solicitud HTTP.
      const respuesta = await fetch(API_URL);

      // Se convierte la respuesta a JSON.
      const datos = await respuesta.json();

      // Se actualiza el estado con los datos recibidos.
      setClientes(datos);
    } catch (error) {
      console.error(error);
      setMensaje('Error al cargar los clientes');
    }
  };

  /**
   * useEffect se ejecuta cuando carga el componente.
   */
  useEffect(() => {
    obtenerClientes();
  }, []);

  /**
   * Esta función se ejecuta cada vez que el usuario escribe
   * en un input del formulario.
   */
  const manejarCambio = (event) => {
    // event.target representa el input que cambió.
    const { name, value } = event.target;

    // Se actualiza el formulario conservando los datos anteriores.
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  /**
   * Esta función se ejecuta al enviar el formulario.
   * Envía los datos al backend usando POST.
   */
  const registrarCliente = async (event) => {
    // Evita que el formulario recargue la página.
    event.preventDefault();

    try {
      // Se envía una solicitud POST a la API.
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        // Se convierte el objeto formulario a texto JSON.
        body: JSON.stringify(formulario)
      });

      // Se lee la respuesta de la API.
      const resultado = await respuesta.json();

      // Si la respuesta no fue exitosa, se muestra el mensaje de error.
      if (!respuesta.ok) {
        setMensaje(resultado.message || 'Error al registrar cliente');
        return;
      }

      // Si todo sale bien, se muestra mensaje de éxito.
      setMensaje('Cliente registrado correctamente');

      // Se limpia el formulario.
      setFormulario({
        nombre: '',
        documento: '',
        direccion: '',
        telefono: '',
        correo: ''
      });

      // Se actualiza la tabla consultando nuevamente la API.
      obtenerClientes();
    } catch (error) {
      console.error(error);
      setMensaje('Error de conexión con la API');
    }
  };

  /**
   * Esta función elimina un cliente.
   * Recibe el ID del cliente y hace una solicitud DELETE.
   */
  const eliminarCliente = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(resultado.message || 'Error al eliminar cliente');
        return;
      }

      setMensaje('Cliente eliminado correctamente');

      // Se vuelve a consultar la lista para actualizar la tabla.
      obtenerClientes();
    } catch (error) {
      console.error(error);
      setMensaje('Error al eliminar cliente');
    }
  };

  return (
    <main style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Gestión de Clientes</h1>

      <p>
        Este módulo permite administrar de manera rápida y segura la información de sus clientes. Registre, consulte, actualice y elimine 
        los datos personales de cada cliente para garantizar un registro organizado.
      </p>

      <section>
        <h2>Registrar cliente</h2>

        <form onSubmit={registrarCliente}>
          <div>
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <br />

          <div>
            <label>Documento:</label>
            <br />
            <input
              type="text"
              name="documento"
              value={formulario.documento}
              onChange={manejarCambio}
              required
            />
          </div>

          <br />

          <div>
            <label>Dirección:</label>
            <br />
            <input
              type="text"
              name="direccion"
              value={formulario.direccion}
              onChange={manejarCambio}
              required
            />
          </div>

          <br />

          <div>
            <label>Teléfono:</label>
            <br />
             <input
              type="text"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              required
              />
          </div>

          <br />

           <div>
            <label>Correo:</label>
            <br />
             <input
              type="text"
              name="correo"
              value={formulario.correo}
              onChange={manejarCambio}
              required
              />
          </div>

          <br />

          <button type="submit">Registrar cliente</button>
        </form>

        {mensaje && (
          <p>
            <strong>{mensaje}</strong>
          </p>
        )}
      </section>

      <hr />

      <section>
        <h2>Listado de clientes</h2>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.documento}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td>
                  <button onClick={() => eliminarCliente(cliente.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clientes.length === 0 && (
          <p>No hay clientes registrados.</p>
        )}
      </section>
    </main>
  );
}

export default App;