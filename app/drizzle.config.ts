import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
    try {
        process.loadEnvFile('.env')
    } catch {}
}

function credentials(url: string, ca: string | undefined) {
    if (!ca) {
        return { url }
    }
    const parsed = new URL(url)
    return {
        host: parsed.hostname,
        port: Number(parsed.port),
        user: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: decodeURIComponent(parsed.pathname.slice(1)),
        ssl: { ca },
    }
}

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    out: './drizzle',
    dbCredentials: credentials(process.env.DATABASE_URL ?? '', process.env.DATABASE_CA),

    introspect: { casing: 'preserve' },
    strict: true,
    verbose: true,
})
