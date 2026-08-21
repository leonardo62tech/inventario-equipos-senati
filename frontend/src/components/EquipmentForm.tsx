import type { ChangeEvent, FormEvent, JSX } from "react";
import { EQUIPMENT_STATUSES, type EquipmentFormValues } from "../types/equipment";

interface EquipmentFormProps {
  values: EquipmentFormValues;
  editingId: number | null;
  isSaving: boolean;
  onChange: (values: EquipmentFormValues) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const statusLabels: Record<(typeof EQUIPMENT_STATUSES)[number], string> = {
  OPERATIVO: "Operativo",
  MANTENIMIENTO: "En mantenimiento",
  FUERA_DE_SERVICIO: "Fuera de servicio"
};

export const EquipmentForm = ({
  values,
  editingId,
  isSaving,
  onChange,
  onSubmit,
  onCancel
}: EquipmentFormProps): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    onChange({ ...values, [name]: value } as EquipmentFormValues);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="form-card" aria-labelledby="equipment-form-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{editingId === null ? "Nuevo registro" : "Edicion"}</p>
          <h2 id="equipment-form-title">{editingId === null ? "Registrar equipo" : "Actualizar equipo"}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="equipment-form">
        <label>
          Nombre <span aria-hidden="true">*</span>
          <input name="name" value={values.name} onChange={handleChange} minLength={2} maxLength={120} required placeholder="Laptop Latitude 5440" />
        </label>
        <label>
          Marca <span aria-hidden="true">*</span>
          <input name="brand" value={values.brand} onChange={handleChange} minLength={2} maxLength={80} required placeholder="Dell" />
        </label>
        <label>
          Numero de serie <span aria-hidden="true">*</span>
          <input name="serialNumber" value={values.serialNumber} onChange={handleChange} minLength={3} maxLength={100} required placeholder="DL-5440-001" />
        </label>
        <label>
          Estado <span aria-hidden="true">*</span>
          <select name="status" value={values.status} onChange={handleChange}>
            {EQUIPMENT_STATUSES.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
          </select>
        </label>
        <label>
          Ubicacion <span aria-hidden="true">*</span>
          <input name="location" value={values.location} onChange={handleChange} minLength={2} maxLength={120} required placeholder="Laboratorio 101" />
        </label>
        <label>
          Fecha de compra
          <input name="purchaseDate" type="date" value={values.purchaseDate} onChange={handleChange} />
        </label>
        <label className="full-width">
          Observaciones
          <textarea name="notes" value={values.notes} onChange={handleChange} maxLength={2000} rows={3} placeholder="Informacion adicional del equipo" />
        </label>
        <div className="form-actions full-width">
          {editingId !== null && <button type="button" className="secondary-button" onClick={onCancel} disabled={isSaving}>Cancelar</button>}
          <button type="submit" className="primary-button" disabled={isSaving}>
            {isSaving ? "Guardando..." : editingId === null ? "Registrar equipo" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </section>
  );
};
