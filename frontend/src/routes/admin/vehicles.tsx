import {createFileRoute, redirect} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {VehicleService, VehicleReadModel, VehicleCreateModel, VehicleUpdateModel} from "../../client";
import useCustomToast from '../../hooks/useCustomToast';
import AdminTable from "../../components/Admin/AdminTable.tsx";
import {isLoggedIn} from "../../hooks/useAuth.ts";

export const Route = createFileRoute('/admin/vehicles')({
  component: VehiclesAdmin,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: '/',
      });
    }
  }
})

function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState<VehicleReadModel[]>([]);
  const showToast = useCustomToast();

  useEffect(() => {
    VehicleService.getVehiclesApiV1VehiclesGet({ offset: 0, limit: 100 })
      .then(response => {
        setVehicles(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleAddVehicle = (data: VehicleCreateModel) => {
    VehicleService.createVehicleApiV1VehiclesPost({ requestBody: data })
      .then(response => {
        setVehicles([...vehicles, response]);
        showToast('Vehículo añadido!', 'Vehículo creado correctamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('Ops! No se pudo crear el vehículo.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleDeleteVehicle = (id: number) => {
    VehicleService.deleteVehicleApiV1VehiclesIdDelete({ id })
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id_ !== id));
        showToast('Vehículo eliminado!', 'Vehículo eliminado correctamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('Ops! No se pudo eliminar el vehículo.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleUpdateVehicle = (id: number, updatedData: VehicleUpdateModel) => {
    if (updatedData) {
      VehicleService.updateVehicleApiV1VehiclesIdPatch({ id, requestBody: updatedData })
        .then(response => {
          setVehicles(vehicles.map(vehicle => (vehicle.id_ === id ? response : vehicle)));
          showToast('Vehículo actualizado!', 'Vehículo actualizado correctamente.', 'success');
        })
        .catch(error => {
          console.error('There was an error!', error);
          showToast('Ops! No se pudo actualizar el vehículo.', 'Intenta de nuevo más tarde.', 'error');
        });
    }
  };

  const vehicleModel: VehicleCreateModel = {
    office_id: 0,
    brand: 'Seat',
    model: '',
    license_plate:'',
    passengers: 0,
    avg_consumption: 0,
    price_per_day: 0,
    fare: 'Smart',
    gearbox: 'Manual',
    body_type: 'SUV',
    version:'',
    kms:0,
    color:'',
    image_url: '',
    purchase_date: '2021-01-01',
  };

  return (
    <>
      <AdminTable table_caption="Vehículos" headers={Object.keys(vehicleModel)} key="id_" data={vehicles} handleDelete={handleDeleteVehicle}
                  handleUpdate={handleUpdateVehicle} handleAdd={handleAddVehicle}></AdminTable>
    </>
  )
}

export default VehiclesAdmin
