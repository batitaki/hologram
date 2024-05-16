import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../../../services/usersAPI';

const CreativeDetail = () => {
  const { userId } = useParams(); // Obtener el ID del usuario de los parámetros de la ruta
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUserById(userId);
        setUser(userData);
        console.log(userData)
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      }
    };

    getUserDetails();
  }, [userId]);

  useEffect(() => {
  }, [user]); // Observar cambios en user

  console.log(user)

  return (
    <div>
      {/* Renderizar los detalles del usuario */}
      {user && (
        <div>
          <h2>{user.Username}</h2>
          <p>Email: {user.Email}</p>
          <img src={user.Image} alt={user.Username} />
          {/* Otros detalles del usuario */}
        </div>
      )}
    </div>
  );
};

export default CreativeDetail;

