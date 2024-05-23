import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {OfficeService, OfficeReadModel} from "../../client";
import useCustomToast from '../../hooks/useCustomToast';
import AdminTable from "../../components/Admin/AdminTable.tsx";

export const Route = createFileRoute('/admin/offices')({
  component: OfficesAdmin,
})


function OfficesAdmin() {
  const [offices, setOffices] = useState([]);
  const [newOffice, setNewOffice] = useState({ name: '', phone: '', address: '', postal_code: '', city:'', email: '', is_active: true, is_deleted: false });
  const [updatedOffice, setUpdatedOffice] = useState(null);
  const showToast = useCustomToast();

  useEffect(() => {
    OfficeService.getOfficesApiV1OfficesGet({ offset: 0, limit: 100 })
      .then(response => {
        setOffices(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleAddOffice = (data) => {
    OfficeService.createOfficeApiV1OfficesPost({ requestBody: data })
      .then(response => {
        setOffices([...offices, response]);
        showToast('Oficina añadida!', 'Oficina creada correctamente.', 'success');
      })
      .catch(error => {
        console.error('There was an error!', error);
        showToast('Ops! No se pudo crear la oficina.', 'Inténtalo de nuevo más tarde.', 'error');
      });
  };

  const handleDeleteOffice = (id) => {
    OfficeService.deleteOfficeApiV1OfficesIdDelete({ id })
      .then(() => {
        setOffices(offices.filter(office => office.id_ !== id));
        showToast('Oficina eliminada!', 'Oficina eliminada correctamente.', 'success');
      })
      .catch(error => {
        showToast('Ops! No se pudo eliminar la oficina.', 'Intenta de nuevo más tarde.', 'error');
      });
  };

  const handleUpdateOffice = (id, updatedData) => {
    if (updatedData) {
      OfficeService.updateOfficeApiV1OfficesIdPatch({ id, requestBody: updatedData })
        .then(response => {
          setOffices(offices.map(office => (office.id_ === id ? response : office)));
          showToast('Oficina actualizada!', 'Oficina actualizada correctamente.', 'success');
        })
        .catch(error => {
          showToast('Ops! No se pudo actualizar la oficina.', 'Intenta de nuevo más tarde.', 'error');
        });
    }
  };

  const officeModel: OfficeReadModel = {
    name: '',
    phone: '',
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
      <AdminTable table_caption="Offices" headers={Object.keys(officeModel)} key="id_" data={offices} handleDelete={handleDeleteOffice}
                  handleUpdate={handleUpdateOffice} handleAdd={handleAddOffice}></AdminTable>
    </>
  )
}

export default OfficesAdmin
