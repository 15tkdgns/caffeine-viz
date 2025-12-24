// Export utilities for external visualization tools

// Supabase/Open Metadata compatible JSON Schema
export const dbSchema = {
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

// FlowiseAI compatible LLM workflow
export const flowiseWorkflow = {
    name: 'Caffeine AI Analysis Pipeline',
    nodes: [
        {
            id: 'input',
            type: 'textInput',
            position: { x: 100, y: 200 },
            data: { label: 'Transaction Data Input' },
        },
        {
            id: 'gemini',
            type: 'llmNode',
            position: { x: 400, y: 200 },
            data: {
                label: 'Google Gemini 2.0 Flash',
                model: 'gemini-2.0-flash-exp',
                temperature: 0.7,
                systemPrompt: '당신은 가계부 분석 전문가입니다. 사용자의 소비 패턴을 분석하고 절약 팁을 제공합니다.',
            },
        },
        {
            id: 'output',
            type: 'textOutput',
            position: { x: 700, y: 200 },
            data: { label: 'Analysis Result' },
        },
    ],
    edges: [
        { id: 'e1', source: 'input', target: 'gemini' },
        { id: 'e2', source: 'gemini', target: 'output' },
    ],
};

// Export functions
export function downloadJSON(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export function exportToSupabase() {
    downloadJSON(dbSchema, 'caffeine-db-schema.json');
}

export function exportToFlowiseAI() {
    downloadJSON(flowiseWorkflow, 'caffeine-flowise-workflow.json');
}
