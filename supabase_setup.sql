-- Ejecutar en Supabase SQL Editor (app.supabase.com → SQL Editor)

CREATE TABLE candidatos (
    cedula TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT,
    fecha TEXT,
    completado BOOLEAN DEFAULT false
);

ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon all candidatos"
    ON candidatos FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE TABLE resultados (
    cedula TEXT PRIMARY KEY,
    nombre TEXT,
    email TEXT,
    fecha TEXT,
    "fechaFinalizacion" TEXT,
    completada BOOLEAN DEFAULT false,
    "DISC" JSONB,
    analisis JSONB,
    tecnico JSONB
);

ALTER TABLE resultados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon all resultados"
    ON resultados FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE TABLE config (
    key TEXT PRIMARY KEY,
    value TEXT
);

ALTER TABLE config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon all config"
    ON config FOR ALL
    USING (true)
    WITH CHECK (true);

INSERT INTO config (key, value) VALUES ('password', '123456')
ON CONFLICT (key) DO NOTHING;
