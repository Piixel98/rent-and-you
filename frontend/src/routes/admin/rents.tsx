import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {RentService, RentCreateModel} from "../../client";
import useCustomToast from '../../hooks/useCustomToast';
import AdminTable from "../../components/Admin/AdminTable.tsx";

export const Route = createFileRoute('/admin/rents')({
  component: RentsAdmin,
})

function RentsAdmin() {
  const [rents, setRents] = useState([]);
  const [newRent, setNewRent] = useState({ /* initial rent properties */ });
  const showToast = useCustomToast();

  useEffect(() => {
    RentService.getRentsApiV1RentsGet({ offset: 0, limit: 100 })
      .then(response => {
        setRents(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleAddRent = () => {
  RentService.createRentApiV1RentsPost({ requestBody: newRent })
    .then(response => {
      setRents([...rents, response]);
      setNewRent({
        vehicle_id: 0,
        user_id: 0,
        office_id: 0,
        pickup_date: '',
        return_date: '',
        ammount: 0
      });
      showToast('¡Alquiler añadido!', 'Alquiler creado exitosamente.', 'success');
    })
    .catch(error => {
      console.error('Hubo un error!', error);
      showToast('¡Ops! No se pudo crear el alquiler.', 'Intenta de nuevo más tarde.', 'error');
    });
};

  const handleDeleteRent = (id) => {
    RentService.deleteRentApiV1RentsIdDelete({ id })
      .then(() => {
        setRents(rents.filter(rent => rent.id_ !== id));
        showToast('¡Alquiler eliminado!', 'Alquiler eliminado exitosamente.', 'success');
      })
      .catch(error => {
        showToast('¡Ops! No se pudo eliminar el alquiler.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleUpdateRent = (id, updatedData) => {
      if (updatedData) {
        RentService.updateRentApiV1RentsIdPatch({ id, requestBody: updatedData })
          .then(response => {
            setRents(rents.map(rent => (rent.id_ === id ? response : rent)));
            showToast('¡Alquiler actualizado!!', 'Alquiler actualizado exitosamente.', 'success');
          })
          .catch(error => {
            showToast('¡Ops! No se pudo actualizar el alquiler.', 'Intenta de nuevo más tarde.', 'error');
          });
      }
    };

  const rentModel: RentCreateModel = {
      vehicle_id: 0,
      user_id: 0,
      office_id: 0,
      pickup_date: '',
      return_date: '',
      ammount: 0
    };

  return (
    <>
      <AdminTable table_caption="Rents" headers={Object.keys(rentModel)} key="id_" data={rents} handleDelete={handleDeleteRent}
                  handleUpdate={handleUpdateRent} handleAdd={handleAddRent}></AdminTable>
    </>
  )
}

export default RentsAdmin
