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
    const apiEndpoint = 'http://localhost:3002/users/createUser';
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Solicitud creada:', data);
      return { success: true, data };
    } else {
      console.error('Error al crear la solicitud');
      return { success: false, error: 'Error al crear la solicitud' };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, error: 'Error en la solicitud' };
  }
};