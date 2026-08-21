import type { JSX } from "react";
import type { Equipment, EquipmentStatus } from "../types/equipment";

interface EquipmentTableProps {
  equipments: Equipment[];
  isLoading: boolean;
  deletingId: number | null;
  onEdit: (equipment: Equipment) => void;
  onDelete: (equipment: Equipment) => void;
}

const statusLabels: Record<EquipmentStatus, string> = {
  OPERATIVO: "Operativo",
  MANTENIMIENTO: "En mantenimiento",
  FUERA_DE_SERVICIO: "Fuera de servicio"
};

const formatDate = (date: string | null): string => {
  if (!date) return "-";
  return new Intl.DateTimeFormat("es-PE", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));
};

export const EquipmentTable = ({
  equipments,
  isLoading,
  deletingId,
  onEdit,
  onDelete
}: EquipmentTableProps): JSX.Element => {
  if (isLoading) {
    return <div className="empty-state" role="status">Cargando equipos...</div>;
  }

  if (equipments.length === 0) {
    return <div className="empty-state">No hay equipos registrados. Usa el formulario para crear el primero.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Serie</th>
            <th>Estado</th>
            <th>Ubicacion</th>
            <th>Compra</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td>
                <strong>{equipment.name}</strong>
                <span className="table-subtitle">{equipment.brand}</span>
              </td>
              <td className="serial-number">{equipment.serialNumber}</td>
              <td><span className={`status status-${equipment.status.toLowerCase()}`}>{statusLabels[equipment.status]}</span></td>
              <td>{equipment.location}</td>
              <td>{formatDate(equipment.purchaseDate)}</td>
              <td className="row-actions">
                <button type="button" className="icon-button edit" onClick={() => onEdit(equipment)} aria-label={`Editar ${equipment.name}`}>Editar</button>
                <button type="button" className="icon-button delete" onClick={() => onDelete(equipment)} disabled={deletingId === equipment.id} aria-label={`Eliminar ${equipment.name}`}>
                  {deletingId === equipment.id ? "Eliminando..." : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
