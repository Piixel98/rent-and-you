import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {UserService, UserReadModel} from "../../client";
import useCustomToast from '../../hooks/useCustomToast';
import AdminTable from "../../components/Admin/AdminTable.tsx";

export const Route = createFileRoute('/admin/users')({
  component: UsersAdmin,
})


function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', phone: '', address: '', postal_code: '', city:'', email: ''});
  const [updatedUser, setUpdatedUser] = useState(null);
  const showToast = useCustomToast();

  useEffect(() => {
    UserService.getUsersApiV1UsersGet({ offset: 0, limit: 100 })
      .then(response => {
        setUsers(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleAddUser = (data) => {
    UserService.createUserApiV1UsersPost({ requestBody: data })
      .then(response => {
        setUsers([...users, response]);
        showToast('Usuario añadido!', 'Usuario creado correctamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('Ops! No se pudo crear el usuario.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleDeleteUser = (id) => {
    UserService.deleteUserApiV1UsersIdDelete({ id })
      .then(() => {
        setUsers(users.filter(user => user.id_ !== id));
        showToast('Usuario eliminado!', 'Usuario eliminado correctamente.', 'success');
      })
      .catch(error => {
        showToast('Ops! No se pudo eliminar el usuario.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleUpdateUser = (id, updatedData) => {
    if (updatedData) {
      UserService.updateUserApiV1UsersIdPatch({ id, requestBody: updatedData })
        .then(response => {
          setUsers(users.map(user => (user.id_ === id ? response : user)));
          showToast('Usuario actualizado!', 'Usuario actualizado correctamente.', 'success');
        })
        .catch(error => {
          showToast('Ops! No se pudo actualizar el usuario.', 'Intenta de nuevo más tarde.', 'error');
        });
    }
  };

  const userModel: UserReadModel = {
    document_type: '',
    document_id: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    postal_code: '',
    email: '',
    id_: 0,
    city: '',
    is_active: false,
    is_deleted: false,
    created_at: '',
    updated_at: '',
    rents: [],
  };

  return (
    <>
      <AdminTable table_caption="Users" headers={Object.keys(userModel)} key="id_" data={users} handleDelete={handleDeleteUser}
                  handleUpdate={handleUpdateUser} handleAdd={handleAddUser}></AdminTable>
    </>
  )
}

export default UsersAdmin