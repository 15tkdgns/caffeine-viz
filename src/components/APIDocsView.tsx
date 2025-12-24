// API Documentation Explorer
const apiDocs = {
    auth: {
        title: 'Authentication',
        endpoints: [
            { method: 'POST', path: '/api/auth/login', desc: '사용자 로그인', body: '{ email, password }', response: '{ token, user }' },
            { method: 'POST', path: '/api/auth/register', desc: '회원가입', body: '{ email, name, password }', response: '{ user }' },
            { method: 'GET', path: '/api/auth/me', desc: '현재 사용자 정보', body: '-', response: '{ user }' },
        ],
    },
    transactions: {
        title: 'Transactions',
        endpoints: [
            { method: 'GET', path: '/api/transactions', desc: '거래 내역 조회', body: '-', response: '{ items[], total }' },
            { method: 'POST', path: '/api/transactions', desc: '거래 등록', body: '{ amount, description, category }', response: '{ transaction }' },
            { method: 'PUT', path: '/api/transactions/:id', desc: '거래 수정', body: '{ amount?, description? }', response: '{ transaction }' },
            { method: 'DELETE', path: '/api/transactions/:id', desc: '거래 삭제', body: '-', response: '{ success }' },
        ],
    },
    analysis: {
        title: 'Analysis',
        endpoints: [
            { method: 'GET', path: '/api/analysis/full', desc: '전체 분석 리포트', body: '-', response: '{ summary, charts, tips }' },
            { method: 'GET', path: '/api/analysis/categories', desc: '카테고리별 통계', body: '-', response: '{ categories[] }' },
            { method: 'GET', path: '/api/analysis/monthly', desc: '월별 추이', body: '-', response: '{ months[] }' },
        ],
    },
    ml: {
        title: 'ML Services',
        endpoints: [
            { method: 'POST', path: '/ml/predict', desc: '카테고리 예측', body: '{ description, amount }', response: '{ category, probability }' },
            { method: 'POST', path: '/ml/predict-next', desc: '다음 소비 예측', body: '{ user_id }', response: '{ predictions[] }' },
        ],
    },
    chatbot: {
        title: 'Chatbot',
        endpoints: [
            { method: 'POST', path: '/api/chatbot/chat', desc: 'AI 대화', body: '{ message }', response: '{ response }' },
            { method: 'GET', path: '/api/chatbot/history', desc: '대화 기록', body: '-', response: '{ messages[] }' },
        ],
    },
};

const methodColors: { [key: string]: string } = {
    GET: '#22c55e',
    POST: '#3b82f6',
    PUT: '#f59e0b',
    DELETE: '#ef4444',
};

import { Download } from 'lucide-react';
import { downloadFile, generateMarkdownDocs } from '../utils/newExporters';

export default function APIDocsView() {
    return (
        <div style={{ padding: '24px', background: '#0f172a', height: '100%', overflowY: 'auto', color: '#e2e8f0', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                    API Documentation
                </h2>
                <button
                    onClick={() => {
                        const md = generateMarkdownDocs(apiDocs);
                        downloadFile('caffeine_api_docs.md', md, 'text/markdown');
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
                    <Download size={14} /> Export Markdown
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {Object.entries(apiDocs).map(([key, section]) => (
                    <div key={key} style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', background: '#334155', fontWeight: 600, fontSize: '1rem' }}>
                            {section.title}
                        </div>
                        <div style={{ padding: '12px' }}>
                            {section.endpoints.map((ep, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '80px 1fr 200px',
                                        gap: '12px',
                                        padding: '12px',
                                        borderBottom: idx < section.endpoints.length - 1 ? '1px solid #334155' : 'none',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{
                                        background: methodColors[ep.method] || '#64748b',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        textAlign: 'center',
                                    }}>
                                        {ep.method}
                                    </span>
                                    <div>
                                        <code style={{ color: '#7dd3fc', fontSize: '0.9rem' }}>{ep.path}</code>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>{ep.desc}</div>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>
                                        → {ep.response}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
