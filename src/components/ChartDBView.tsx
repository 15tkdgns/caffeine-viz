// ChartDB-style interactive database schema visualization

interface Column {
    name: string;
    type: string;
    primary_key?: boolean;
    foreign_key?: string;
    unique?: boolean;
    default?: boolean | string;
}

interface Table {
    name: string;
    columns: Column[];
}

interface Relationship {
    from: string;
    to: string;
    type: string;
}

const dbSchema: { tables: Table[]; relationships: Relationship[] } = {
    tables: [
        {
            name: 'users',
            columns: [
                { name: 'id', type: 'integer', primary_key: true },
                { name: 'email', type: 'varchar(255)', unique: true },
                { name: 'name', type: 'varchar(100)' },
                { name: 'password_hash', type: 'varchar(255)' },
                { name: 'created_at', type: 'timestamp' },
                { name: 'is_active', type: 'boolean', default: true },
                { name: 'is_admin', type: 'boolean', default: false },
            ],
        },
        {
            name: 'transactions',
            columns: [
                { name: 'id', type: 'integer', primary_key: true },
                { name: 'user_id', type: 'integer', foreign_key: 'users.id' },
                { name: 'amount', type: 'decimal(12,2)' },
                { name: 'description', type: 'text' },
                { name: 'category', type: 'varchar(50)' },
                { name: 'ml_category', type: 'integer' },
                { name: 'transaction_date', type: 'timestamp' },
                { name: 'is_anomaly', type: 'boolean', default: false },
            ],
        },
        {
            name: 'user_settings',
            columns: [
                { name: 'id', type: 'integer', primary_key: true },
                { name: 'user_id', type: 'integer', foreign_key: 'users.id' },
                { name: 'email_notifications', type: 'boolean', default: true },
                { name: 'budget_limit', type: 'integer' },
            ],
        },
        {
            name: 'coupons',
            columns: [
                { name: 'id', type: 'integer', primary_key: true },
                { name: 'title', type: 'varchar(255)' },
                { name: 'discount_rate', type: 'decimal(5,2)' },
                { name: 'valid_until', type: 'timestamp' },
                { name: 'is_active', type: 'boolean', default: true },
            ],
        },
        {
            name: 'user_coupons',
            columns: [
                { name: 'id', type: 'integer', primary_key: true },
                { name: 'user_id', type: 'integer', foreign_key: 'users.id' },
                { name: 'coupon_id', type: 'integer', foreign_key: 'coupons.id' },
                { name: 'claimed_at', type: 'timestamp' },
                { name: 'is_used', type: 'boolean', default: false },
            ],
        },
        {
            name: 'chatbot_history',
            columns: [
                { name: 'id', type: 'integer', primary_key: true },
                { name: 'user_id', type: 'integer', foreign_key: 'users.id' },
                { name: 'message', type: 'text' },
                { name: 'response', type: 'text' },
                { name: 'created_at', type: 'timestamp' },
            ],
        },
    ],
    relationships: [
        { from: 'transactions.user_id', to: 'users.id', type: 'many-to-one' },
        { from: 'user_settings.user_id', to: 'users.id', type: 'one-to-one' },
        { from: 'user_coupons.user_id', to: 'users.id', type: 'many-to-one' },
        { from: 'user_coupons.coupon_id', to: 'coupons.id', type: 'many-to-one' },
        { from: 'chatbot_history.user_id', to: 'users.id', type: 'many-to-one' },
    ],
};

import { Download } from 'lucide-react';
import { downloadFile, generateSQL } from '../utils/newExporters';

export default function ChartDBView() {
    return (
        <div style={{ padding: '24px', background: '#0f172a', height: '100%', overflowY: 'auto', color: '#e2e8f0', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: '#f8fafc', margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                    Database Schema (ChartDB Style)
                </h2>
                <button
                    onClick={() => {
                        const sql = generateSQL(dbSchema);
                        downloadFile('caffeine_schema.sql', sql, 'application/sql');
                    }}
                    style={{
                        padding: '8px 16px',
                        background: '#334155',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.85rem'
                    }}
                >
                    <Download size={14} /> Export SQL
                </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
                {dbSchema.tables.map((table) => (
                    <div
                        key={table.name}
                        style={{
                            background: '#1e293b',
                            borderRadius: '12px',
                            border: '2px solid #334155',
                            minWidth: '280px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                        }}
                    >
                        {/* Table Header */}
                        <div
                            style={{
                                background: getTableColor(table.name),
                                padding: '12px 16px',
                                borderBottom: '2px solid #334155',
                            }}
                        >
                            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                                {table.name.toUpperCase()}
                            </span>
                        </div>
                        {/* Columns */}
                        <div style={{ padding: '8px 0' }}>
                            {table.columns.map((col, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 16px',
                                        borderBottom: idx < table.columns.length - 1 ? '1px solid #334155' : 'none',
                                    }}
                                >
                                    {/* Key indicator */}
                                    <span style={{ width: '24px', fontSize: '0.75rem', fontWeight: 700, color: '#fcd34d' }}>
                                        {col.primary_key && 'PK'}
                                        {col.foreign_key && 'FK'}
                                        {col.unique && 'UQ'}
                                    </span>
                                    {/* Column name */}
                                    <span style={{ flex: 1, color: '#e2e8f0', fontSize: '0.85rem' }}>
                                        {col.name}
                                    </span>
                                    {/* Column type */}
                                    <span style={{ color: '#64748b', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                        {col.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Relationships */}
            <div style={{ marginTop: '32px' }}>
                <h3 style={{ color: '#94a3b8', marginBottom: '16px', fontSize: '1rem' }}>
                    Relationships
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {dbSchema.relationships.map((rel, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: '#1e293b',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: '1px solid #334155',
                                fontSize: '0.85rem',
                                color: '#cbd5e1',
                            }}
                        >
                            <span style={{ color: '#7dd3fc' }}>{rel.from}</span>
                            <span style={{ margin: '0 8px', color: '#64748b' }}>→</span>
                            <span style={{ color: '#86efac' }}>{rel.to}</span>
                            <span style={{ marginLeft: '12px', color: '#a78bfa', fontSize: '0.75rem' }}>
                                ({rel.type})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getTableColor(tableName: string): string {
    const colors: { [key: string]: string } = {
        users: '#3b82f6',
        transactions: '#22c55e',
        user_settings: '#8b5cf6',
        coupons: '#f59e0b',
        user_coupons: '#ec4899',
        chatbot_history: '#06b6d4',
    };
    return colors[tableName] || '#64748b';
}
