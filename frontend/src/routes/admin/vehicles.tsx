import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {VehicleService, VehicleCreateModel, OfficeService} from "../../client";
import useCustomToast from '../../hooks/useCustomToast';
import AdminTable from "../../components/Admin/AdminTable";

export const Route = createFileRoute('/admin/vehicles')({
  component: VehiclesAdmin,
})


function VehiclesAdmin() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({});
  const [updatedVehicle, setUpdatedVehicle] = useState(null);
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

  const handleAddVehicle = (data) => {
    VehicleService.createVehicleApiV1VehiclesPost({ requestBody: data })
      .then(response => {
        setVehicles([...vehicles, response]);
        showToast('Vehiculo añadido!', 'Vehiculo creado correctamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('Ops! No se pudo crear el vehículo.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleDeleteVehicle = (id) => {
    VehicleService.deleteVehicleApiV1VehiclesIdDelete({ id })
      .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id_ !== id));
        showToast('Vehículo eliminado!', 'Vehículo eliminado correctamente.', 'success');
      })
      .catch(error => {
        showToast('Ops! No se pudo eliminar el vehículo.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleUpdateVehicle = (id, updatedData) => {
    if (updatedData) {
      VehicleService.updateVehicleApiV1VehiclesIdPatch({ id, requestBody: updatedData })
        .then(response => {
          setVehicles(vehicles.map(vehicle => (vehicle.id_ === id ? response : vehicle)));
          showToast('Vehículo actualizado!', 'Vehículo actualizado correctamente.', 'success');
        })
        .catch(error => {
          showToast('Ops! No se pudo actualizar el vehículo.', 'Intenta de nuevo más tarde.', 'error');
        });
    }
  };

  const vehicleModel: VehicleCreateModel = {
    model: '',
    version: '',
    color: '',
    brand: 'Seat',
    kms: 0,
    license_plate: '',
    purchase_date: '',
    gearbox: 'Manual',
    body_type: 'Other',
    price_per_day: 0,
    passengers: 0,
    avg_consumption: 0,
    fare: 'Smart',
    is_rented: false,
    image_url: '',
    rent_id: 0,
    office_id: 0
  };

  return (
    <>
      <AdminTable table_caption="Vehicles" headers={Object.keys(vehicleModel)} key="id_" data={vehicles} handleDelete={handleDeleteVehicle}
                  handleUpdate={handleUpdateVehicle} handleAdd={handleAddVehicle}></AdminTable>
    </>
  )
}

export default VehiclesAdmin;
