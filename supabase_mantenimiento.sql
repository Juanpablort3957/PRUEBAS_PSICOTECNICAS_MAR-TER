-- ==============================================================================
-- TABLAS SUPABASE - COORDINADOR DE MANTENIMIENTO Y LOGÍSTICA
-- ==============================================================================
-- NOTA: Las tablas son COMPARTIDAS con Analista SIG.
-- Si las tablas ya existen (creadas con supabase_setup.sql), omitir este paso.
-- Si es un proyecto independiente, ejecutar este script.
-- ==============================================================================

-- Tabla de candidatos
CREATE TABLE IF NOT EXISTS candidatos (
    id BIGSERIAL PRIMARY KEY,
    cedula TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    email TEXT,
    fecha TEXT NOT NULL,
    completado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de resultados
CREATE TABLE IF NOT EXISTS resultados (
    id BIGSERIAL PRIMARY KEY,
    cedula TEXT UNIQUE NOT NULL,
    nombre TEXT,
    email TEXT,
    fecha TEXT NOT NULL,
    fechaFinalizacion TEXT,
    completada BOOLEAN DEFAULT FALSE,
    respuestasDISC JSONB DEFAULT '{}'::jsonb,
    analisis JSONB DEFAULT '{}'::jsonb,
    tecnico JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de configuración
CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Password por defecto (123456)
INSERT INTO config (key, value) VALUES ('password', '123456')
ON CONFLICT (key) DO NOTHING;

-- RLS: Permitir acceso anónimo (misma lógica que Analista SIG)
ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'anon_access_candidatos'
        AND tablename = 'candidatos'
    ) THEN
        EXECUTE 'CREATE POLICY anon_access_candidatos ON candidatos FOR ALL USING (true) WITH CHECK (true)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'anon_access_resultados'
        AND tablename = 'resultados'
    ) THEN
        EXECUTE 'CREATE POLICY anon_access_resultados ON resultados FOR ALL USING (true) WITH CHECK (true)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = 'anon_access_config'
        AND tablename = 'config'
    ) THEN
        EXECUTE 'CREATE POLICY anon_access_config ON config FOR ALL USING (true) WITH CHECK (true)';
    END IF;
END $$;
