export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:3002/users/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener users:', error);
    return [];
  }
};

export const createUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:3002/users/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, message: responseData.message };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    return { success: false, error: 'Error al enviar la solicitud' };
  }
};
