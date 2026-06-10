const SUPABASE_URL = 'https://kktdlblpltjidlvyqllh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_wc2VCsqX1csFlTI80NgCCA_iBuWET-8';

// ─── Dexie / IndexedDB (fallback + config local) ─────────────────────────
var db = new Dexie('MARYTER_Psicotecnicos');
window.db = db;
db.version(1).stores({
    candidatos: 'cedula, nombre, email, fecha, completado',
    resultados: 'cedula, fecha',
    config: 'key'
});
db.on('populate', () => {
    db.config.put({ key: 'password', value: '123456' });
});

async function initDB() {
    await db.open();
    return db;
}

// ─── Supabase REST helper ─────────────────────────────────────────────────
const SUPABASE_HEADERS = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

async function supabaseFetch(path, options = {}) {
    const url = SUPABASE_URL + '/rest/v1/' + path;
    const res = await fetch(url, {
        ...options,
        headers: { ...SUPABASE_HEADERS, ...options.headers }
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error('Supabase ' + res.status + ': ' + text.slice(0, 200));
    }
    return res;
}

// ─── Candidatos ───────────────────────────────────────────────────────────
async function guardarCandidato(candidato) {
    try {
        await supabaseFetch('candidatos', {
            method: 'POST',
            body: JSON.stringify(candidato),
            headers: { 'Prefer': 'resolution=merge-duplicates' }
        });
    } catch (e) {
        console.warn('Supabase guardarCandidato falló, usando IndexedDB:', e.message);
    }
    return await db.candidatos.put(candidato);
}

async function obtenerCandidato(cedula) {
    try {
        const res = await supabaseFetch('candidatos?cedula=eq.' + encodeURIComponent(cedula) + '&select=*');
        const data = await res.json();
        if (data && data.length > 0) {
            await db.candidatos.put(data[0]).catch(() => {});
            return data[0];
        }
    } catch (e) {
        console.warn('Supabase obtenerCandidato falló, usando IndexedDB:', e.message);
    }
    return await db.candidatos.get(cedula);
}

async function obtenerTodosCandidatos() {
    try {
        const res = await supabaseFetch('candidatos?select=*');
        const data = await res.json();
        if (data) {
            data.forEach(c => db.candidatos.put(c).catch(() => {}));
            return data;
        }
    } catch (e) {
        console.warn('Supabase obtenerTodosCandidatos falló, usando IndexedDB:', e.message);
    }
    return await db.candidatos.toArray();
}

// ─── Resultados ───────────────────────────────────────────────────────────
async function guardarResultados(resultados) {
    const payload = {
        cedula: resultados.cedula,
        nombre: resultados.nombre,
        email: resultados.email,
        fecha: resultados.fecha,
        fechaFinalizacion: resultados.fechaFinalizacion || null,
        completada: resultados.completada || false,
        DISC: resultados.DISC || null,
        analisis: resultados.analisis || null,
        tecnico: resultados.tecnico || null
    };
    try {
        await supabaseFetch('resultados', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Prefer': 'resolution=merge-duplicates' }
        });
    } catch (e) {
        console.warn('Supabase guardarResultados falló, usando IndexedDB:', e.message);
    }
    return await db.resultados.put(resultados);
}

async function obtenerResultados(cedula) {
    try {
        const res = await supabaseFetch('resultados?cedula=eq.' + encodeURIComponent(cedula) + '&select=*');
        const data = await res.json();
        if (data && data.length > 0) {
            await db.resultados.put(data[0]).catch(() => {});
            return data[0];
        }
    } catch (e) {
        console.warn('Supabase obtenerResultados falló, usando IndexedDB:', e.message);
    }
    return await db.resultados.where('cedula').equals(cedula).first();
}

async function obtenerTodosResultados() {
    try {
        const res = await supabaseFetch('resultados?select=*');
        const data = await res.json();
        if (data) {
            data.forEach(r => db.resultados.put(r).catch(() => {}));
            return data;
        }
    } catch (e) {
        console.warn('Supabase obtenerTodosResultados falló, usando IndexedDB:', e.message);
    }
    return await db.resultados.toArray();
}

// ─── Config (solo IndexedDB, local) ───────────────────────────────────────
async function obtenerConfig(key) {
    const config = await db.config.get(key);
    return config ? config.value : null;
}

async function guardarConfig(key, value) {
    return await db.config.put({ key, value });
}

async function verificarPassword(password) {
    const stored = await obtenerConfig('password');
    return password === stored;
}

async function cambiarPassword(nuevaPassword) {
    return await guardarConfig('password', nuevaPassword);
}

// ─── Utilidades ───────────────────────────────────────────────────────────
async function borrarTodosLosDatos() {
    try {
        await supabaseFetch('candidatos', { method: 'DELETE' });
    } catch (_) {}
    try {
        await supabaseFetch('resultados', { method: 'DELETE' });
    } catch (_) {}
    await db.resultados.clear();
    await db.candidatos.clear();
    return true;
}

async function contarRegistros() {
    try {
        const rc = await supabaseFetch('resultados?select=cedula');
        const data = await rc.json();
        return { candidatos: data ? data.length : 0, resultados: data ? data.length : 0 };
    } catch (_) {}
    const candidatos = await db.candidatos.count();
    const resultados = await db.resultados.count();
    return { candidatos, resultados };
}
