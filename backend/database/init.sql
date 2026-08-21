CREATE TABLE IF NOT EXISTS equipments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  brand VARCHAR(80) NOT NULL,
  serial_number VARCHAR(100) NOT NULL UNIQUE,
  status VARCHAR(30) NOT NULL CHECK (status IN ('OPERATIVO', 'MANTENIMIENTO', 'FUERA_DE_SERVICIO')),
  location VARCHAR(120) NOT NULL,
  purchase_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS equipments_set_updated_at ON equipments;
CREATE TRIGGER equipments_set_updated_at
BEFORE UPDATE ON equipments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

INSERT INTO equipments (name, brand, serial_number, status, location, purchase_date, notes)
VALUES
  ('Laptop Latitude 5440', 'Dell', 'DL-5440-001', 'OPERATIVO', 'Laboratorio 101', '2024-03-15', 'Equipo para desarrollo web'),
  ('Monitor UltraSharp 24', 'Dell', 'MN-U2424-002', 'MANTENIMIENTO', 'Laboratorio 102', '2023-08-20', 'Presenta parpadeos intermitentes'),
  ('Teclado K120', 'Logitech', 'LG-K120-003', 'OPERATIVO', 'Almacen', '2024-01-10', NULL)
ON CONFLICT (serial_number) DO NOTHING;

