import {createFileRoute, redirect} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {RentService, RentCreateModel, RentReadModel, RentUpdateModel} from "../../client";
import useCustomToast from '../../hooks/useCustomToast';
import AdminTable from "../../components/Admin/AdminTable.tsx";
import {isLoggedIn} from "../../hooks/useAuth.ts";

export const Route = createFileRoute('/admin/rents')({
    component: RentsAdmin,
    beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      });
    }
}
})

function RentsAdmin() {
  const [rents, setRents] = useState<RentReadModel[]>([]);
  const showToast = useCustomToast();

  useEffect(() => {
    RentService.getRentsApiV1RentsGet({ offset: 0, limit: 100 })
      .then((response: RentReadModel[]) => {
        setRents(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleAddRent = (data: RentCreateModel) => {
      RentService.createRentApiV1RentsPost({ requestBody: data })
      .then((response: RentReadModel) => {
          setRents(prevRents => [...prevRents, response]);
          showToast('¡Reserva creada!', 'Reserva creada exitosamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('¡Ops! No se pudo crear la reserva.', 'Intenta de nuevo más tarde.', 'error');
      });
    };

  const handleDeleteRent = (id: number) => {
    RentService.deleteRentApiV1RentsIdDelete({ id })
      .then(() => {
        setRents(rents.filter(rent => rent.id_ !== id));
        showToast('¡Alquiler eliminado!', 'Reserva eliminada exitosamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('¡Ops! No se pudo eliminar la reserva.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleUpdateRent = (id: number, updatedData: RentUpdateModel) => {
      if (updatedData) {
        RentService.updateRentApiV1RentsIdPatch({ id, requestBody: updatedData })
          .then((response: RentReadModel) => {
            setRents(rents.map(rent => (rent.id_ === id ? response : rent)));
            showToast('¡Reserva actualizada!', 'Reserva actualizada exitosamente.', 'success');
          })
          .catch(error => {
            console.error('There was an error!', error);
            showToast('¡Ops! No se pudo actualizar la reserva.', 'Intenta de nuevo más tarde.', 'error');
          });
      }
    };

  const rentModel: RentCreateModel = {
      vehicle_id: 1,
      user_id: 1,
      office_id: 1,
      pickup_date: new Date().toISOString(),
      return_date: new Date().toISOString(),
      amount: 1,
      total_days: 1
    };

  return (
    <>
      <AdminTable table_caption="Reservas" headers={Object.keys(rentModel)} key="id_" data={rents} handleDelete={handleDeleteRent}
                  handleUpdate={handleUpdateRent} handleAdd={handleAddRent}></AdminTable>
    </>
  )
}

export default RentsAdmin
