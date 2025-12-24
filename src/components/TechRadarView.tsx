// Tech Radar - 기술 스택을 Adopt/Trial/Assess/Hold로 분류
const techRadarData = {
    adopt: [
        { name: 'React Native', category: 'Frontend' },
        { name: 'FastAPI', category: 'Backend' },
        { name: 'PostgreSQL', category: 'Database' },
        { name: 'Docker', category: 'DevOps' },
    ],
    trial: [
        { name: 'XGBoost', category: 'ML' },
        { name: 'Gemini 2.0', category: 'LLM' },
        { name: 'TypeScript', category: 'Frontend' },
    ],
    assess: [
        { name: 'Next.js 16', category: 'Frontend' },
        { name: 'TailwindCSS 4', category: 'Frontend' },
        { name: 'AWS ECS', category: 'DevOps' },
    ],
    hold: [
        { name: 'Flask', category: 'Backend' },
        { name: 'MongoDB', category: 'Database' },
    ],
};

// Project Timeline
const timelineData = [
    { date: '2024-10', title: '프로젝트 시작', desc: '기획 및 설계', status: 'done' },
    { date: '2024-11', title: 'MVP 개발', desc: 'FastAPI + React Native 기본 구조', status: 'done' },
    { date: '2024-12', title: 'ML 모델 통합', desc: 'XGBoost 카테고리 예측 (73.47%)', status: 'done' },
    { date: '2025-01', title: 'LLM 분석 추가', desc: 'Gemini 2.0 기반 소비 분석', status: 'current' },
    { date: '2025-02', title: '배포 & 최적화', desc: 'AWS ECS 프로덕션 배포', status: 'planned' },
];

// Feature Matrix
const featureMatrix = [
    { feature: '사용자 인증', user: true, admin: true, api: 'JWT' },
    { feature: '거래 내역 관리', user: true, admin: true, api: 'CRUD' },
    { feature: 'ML 카테고리 예측', user: true, admin: false, api: 'POST' },
    { feature: '소비 분석 리포트', user: true, admin: true, api: 'GET' },
    { feature: 'AI 챗봇', user: true, admin: false, api: 'WS' },
    { feature: '쿠폰 관리', user: true, admin: true, api: 'CRUD' },
    { feature: '사용자 관리', user: false, admin: true, api: 'CRUD' },
];

import { Download } from 'lucide-react';
import { downloadFile } from '../utils/newExporters';

export default function TechRadarView() {
    return (
        <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100%', overflow: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Tech Radar */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                            Tech Radar
                        </h3>
                        <button
                            onClick={() => {
                                const data = { techRadar: techRadarData, timeline: timelineData, matrix: featureMatrix };
                                downloadFile('caffeine_tech_radar.json', JSON.stringify(data, null, 2), 'application/json');
                            }}
                            style={{
                                padding: '6px 12px',
                                background: '#f1f5f9',
                                color: '#475569',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.75rem'
                            }}
                        >
                            <Download size={12} /> Export JSON
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {Object.entries(techRadarData).map(([ring, techs]) => (
                            <div key={ring} style={{ padding: '12px', borderRadius: '8px', background: getRingColor(ring) }}>
                                <div style={{ fontWeight: 600, marginBottom: '8px', color: '#1e293b', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                                    {ring}
                                </div>
                                {techs.map((tech, idx) => (
                                    <div key={idx} style={{ fontSize: '0.85rem', padding: '4px 0', color: '#475569' }}>
                                        • {tech.name} <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({tech.category})</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Matrix */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                        📋 Feature Matrix
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ background: '#f1f5f9' }}>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>기능</th>
                                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>User</th>
                                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>Admin</th>
                                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>API</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featureMatrix.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '10px' }}>{row.feature}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.user ? '✅' : '—'}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{row.admin ? '✅' : '—'}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', fontFamily: 'monospace', color: '#64748b' }}>{row.api}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Timeline */}
            <div style={{ marginTop: '24px', background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                    📅 Project Timeline
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Timeline line */}
                    <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '4px', background: '#e2e8f0', zIndex: 0 }} />

                    {timelineData.map((item, idx) => (
                        <div key={idx} style={{ textAlign: 'center', position: 'relative', zIndex: 1, flex: 1 }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: getStatusColor(item.status),
                                border: '4px solid #fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                margin: '0 auto 12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                color: '#fff',
                                fontWeight: 600,
                            }}>
                                {item.status === 'done' ? '✓' : item.status === 'current' ? '●' : '○'}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '4px' }}>{item.date}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>{item.title}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getRingColor(ring: string): string {
    const colors: { [key: string]: string } = {
        adopt: '#dcfce7',
        trial: '#dbeafe',
        assess: '#fef9c3',
        hold: '#fee2e2',
    };
    return colors[ring] || '#f1f5f9';
}

function getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
        done: '#22c55e',
        current: '#3b82f6',
        planned: '#94a3b8',
    };
    return colors[status] || '#94a3b8';
}
