// API Documentation Explorer
const apiDocs = {
    auth: {
        title: 'Authentication',
        color: '#f59e0b',
        endpoints: [
            { method: 'POST', path: '/api/auth/login', desc: '사용자 로그인', body: '{ email, password }', response: '{ token, user }' },
            { method: 'POST', path: '/api/auth/register', desc: '회원가입', body: '{ email, name, password }', response: '{ user }' },
            { method: 'GET', path: '/api/auth/me', desc: '현재 사용자 정보', body: '-', response: '{ user }' },
        ],
    },
    transactions: {
        title: 'Transactions',
        color: '#3b82f6',
        endpoints: [
            { method: 'GET', path: '/api/transactions', desc: '거래 내역 조회', body: '-', response: '{ items[], total }' },
            { method: 'POST', path: '/api/transactions', desc: '거래 등록', body: '{ amount, description, category }', response: '{ transaction }' },
            { method: 'PUT', path: '/api/transactions/:id', desc: '거래 수정', body: '{ amount?, description? }', response: '{ transaction }' },
            { method: 'DELETE', path: '/api/transactions/:id', desc: '거래 삭제', body: '-', response: '{ success }' },
        ],
    },
    analysis: {
        title: 'Analysis',
        color: '#10b981',
        endpoints: [
            { method: 'GET', path: '/api/analysis/full', desc: '전체 분석 리포트', body: '-', response: '{ summary, charts, tips }' },
            { method: 'GET', path: '/api/analysis/categories', desc: '카테고리별 통계', body: '-', response: '{ categories[] }' },
            { method: 'GET', path: '/api/analysis/monthly', desc: '월별 추이', body: '-', response: '{ months[] }' },
        ],
    },
    ml: {
        title: 'ML Services',
        color: '#8b5cf6',
        endpoints: [
            { method: 'POST', path: '/ml/predict', desc: '카테고리 예측', body: '{ description, amount }', response: '{ category, probability }' },
            { method: 'POST', path: '/ml/predict-next', desc: '다음 소비 예측', body: '{ user_id }', response: '{ predictions[] }' },
        ],
    },
    chatbot: {
        title: 'Chatbot',
        color: '#ec4899',
        endpoints: [
            { method: 'POST', path: '/api/chatbot/chat', desc: 'AI 대화', body: '{ message }', response: '{ response }' },
            { method: 'GET', path: '/api/chatbot/history', desc: '대화 기록', body: '-', response: '{ messages[] }' },
        ],
    },
};

const methodColors: { [key: string]: { bg: string; text: string } } = {
    GET: { bg: '#d1fae5', text: '#047857' },
    POST: { bg: '#dbeafe', text: '#1d4ed8' },
    PUT: { bg: '#fef3c7', text: '#b45309' },
    DELETE: { bg: '#fee2e2', text: '#b91c1c' },
};

import { Download } from 'lucide-react';
import { downloadFile, generateMarkdownDocs } from '../utils/newExporters';

export default function APIDocsView() {
    return (
        <div style={{ padding: '16px', background: '#f8fafc', height: '100%', overflow: 'auto' }}>
            <div style={{ border: '3px solid #3b82f6', borderRadius: '12px', background: '#fff', padding: '16px', minWidth: '800px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', color: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                        📡 API DOCUMENTATION
                    </div>
                    <button
                        onClick={() => {
                            const md = generateMarkdownDocs(apiDocs);
                            downloadFile('caffeine_api_docs.md', md, 'text/markdown');
                        }}
                        style={{ padding: '8px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Download size={14} /> Export Markdown
                    </button>
                </div>

                {/* API Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(apiDocs).map(([key, section]) => (
                        <div key={key} style={{ border: `2px dashed ${section.color}`, borderRadius: '8px', background: 'rgba(255,255,255,0.95)', overflow: 'hidden' }}>
                            <div style={{ padding: '10px 16px', background: `${section.color}15`, borderBottom: `1px solid ${section.color}30`, fontWeight: 700, fontSize: '12px', color: section.color, textTransform: 'uppercase' }}>
                                {section.title}
                            </div>
                            <div style={{ padding: '8px' }}>
                                {section.endpoints.map((ep, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '70px 1fr 180px',
                                            gap: '12px',
                                            padding: '10px',
                                            borderBottom: idx < section.endpoints.length - 1 ? '1px solid #e2e8f0' : 'none',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span style={{
                                            background: methodColors[ep.method]?.bg || '#f1f5f9',
                                            color: methodColors[ep.method]?.text || '#475569',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            textAlign: 'center',
                                        }}>
                                            {ep.method}
                                        </span>
                                        <div>
                                            <code style={{ color: '#1e293b', fontSize: '12px', fontWeight: 600 }}>{ep.path}</code>
                                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{ep.desc}</div>
                                        </div>
                                        <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#475569', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                                            → {ep.response}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
