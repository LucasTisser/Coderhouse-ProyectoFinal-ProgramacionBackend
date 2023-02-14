export const htmlNewUserTemplate = (user, date) => {
  return `
    <h2>¡Nuevo usuario Creado!</h2>
    <p>Se ha creado un nuevo usuario a través de la API</p>
    <ul>
        <li><strong>UUID:</strong> ${user._id}</li>
        <li><strong>username:</strong> ${user.username}</li>
        <li><strong>direccion:</strong> ${user.direccion}</li>
        <li><strong>edad:</strong> ${user.edad}</li>
        <li><strong>numero telefonico:</strong> ${user.numeroTelefono}</li>
        <li><strong>FECHA:</strong> ${date}</li>
    </ul>
    `;
};
