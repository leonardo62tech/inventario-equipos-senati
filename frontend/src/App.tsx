import { useCallback, useEffect, useMemo, useState, type JSX } from "react";
import { EquipmentForm } from "./components/EquipmentForm";
import { EquipmentTable } from "./components/EquipmentTable";
import { ApiError, equipmentApi } from "./services/api";
import {
  emptyEquipmentForm,
  toEquipmentInput,
  toFormValues,
  type Equipment,
  type EquipmentFormValues
} from "./types/equipment";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) return error.message;
  return "Ocurrio un error inesperado. Intenta nuevamente.";
};

export const App = (): JSX.Element => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [formValues, setFormValues] = useState<EquipmentFormValues>(emptyEquipmentForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const totalOperational = useMemo(
    () => equipments.filter((equipment) => equipment.status === "OPERATIVO").length,
    [equipments]
  );

  const loadEquipments = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      setEquipments(await equipmentApi.list());
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEquipments();
  }, [loadEquipments]);

  const resetForm = (): void => {
    setEditingId(null);
    setFormValues(emptyEquipmentForm());
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSaving(true);
    setError(null);
    setNotice(null);

    try {
      const input = toEquipmentInput(formValues);
      if (editingId === null) {
        const created = await equipmentApi.create(input);
        setEquipments((current) => [created, ...current]);
        setNotice("Equipo registrado correctamente.");
      } else {
        const updated = await equipmentApi.update(editingId, input);
        setEquipments((current) => current.map((equipment) => equipment.id === updated.id ? updated : equipment));
        setNotice("Equipo actualizado correctamente.");
      }
      resetForm();
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (equipment: Equipment): void => {
    setEditingId(equipment.id);
    setFormValues(toFormValues(equipment));
    setError(null);
    setNotice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (equipment: Equipment): Promise<void> => {
    const confirmed = window.confirm(`¿Eliminar el equipo "${equipment.name}"? Esta accion no se puede deshacer.`);
    if (!confirmed) return;

    setDeletingId(equipment.id);
    setError(null);
    setNotice(null);

    try {
      await equipmentApi.remove(equipment.id);
      setEquipments((current) => current.filter((item) => item.id !== equipment.id));
      if (editingId === equipment.id) resetForm();
      setNotice("Equipo eliminado correctamente.");
    } catch (requestError: unknown) {
      setError(getErrorMessage(requestError));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Laboratorio SENATI</p>
          <h1>Inventario de equipos</h1>
          <p className="hero-copy">Administra los recursos de computo de forma simple y ordenada.</p>
        </div>
        <a className="docs-link" href="http://localhost:3000/api/docs" target="_blank" rel="noreferrer">Ver documentacion API</a>
      </header>

      <section className="metrics" aria-label="Resumen del inventario">
        <article className="metric-card">
          <span>Total de equipos</span>
          <strong>{equipments.length}</strong>
        </article>
        <article className="metric-card">
          <span>Equipos operativos</span>
          <strong>{totalOperational}</strong>
        </article>
      </section>

      {error && <div className="alert error-alert" role="alert">{error}<button type="button" onClick={() => setError(null)} aria-label="Cerrar mensaje de error">×</button></div>}
      {notice && <div className="alert success-alert" role="status">{notice}<button type="button" onClick={() => setNotice(null)} aria-label="Cerrar confirmacion">×</button></div>}

      <EquipmentForm
        values={formValues}
        editingId={editingId}
        isSaving={isSaving}
        onChange={setFormValues}
        onSubmit={() => { void handleSubmit(); }}
        onCancel={resetForm}
      />

      <section className="inventory-card" aria-labelledby="inventory-title">
        <div className="section-heading inventory-heading">
          <div>
            <p className="eyebrow">Registros</p>
            <h2 id="inventory-title">Equipos registrados</h2>
          </div>
          <button type="button" className="secondary-button" onClick={() => { void loadEquipments(); }} disabled={isLoading}>Actualizar lista</button>
        </div>
        <EquipmentTable
          equipments={equipments}
          isLoading={isLoading}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={(equipment) => { void handleDelete(equipment); }}
        />
      </section>
    </main>
  );
};
