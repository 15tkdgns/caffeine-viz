import { useState } from 'react';

const diagrams = [
    { id: 'architecture', title: '전체 아키텍처', file: '/diagrams/caffeine_architecture.png' },
    { id: 'deployment', title: '배포 구조', file: '/diagrams/caffeine_deployment.png' },
    { id: 'ml_pipeline', title: 'ML 파이프라인', file: '/diagrams/caffeine_ml_pipeline.png' },
    { id: 'data_flow', title: '데이터 흐름', file: '/diagrams/caffeine_data_flow.png' },
];

export default function DiagramsView() {
    const [selected, setSelected] = useState(diagrams[0].id);
    const selectedDiagram = diagrams.find(d => d.id === selected);

    return (
        <div style={{ padding: '24px', background: '#f8fafc', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
                    📐 Python Diagrams (Cloud Architecture)
                </h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {diagrams.map((d) => (
                        <button
                            key={d.id}
                            onClick={() => setSelected(d.id)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: selected === d.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                background: selected === d.id ? '#eff6ff' : '#fff',
                                cursor: 'pointer',
                                fontWeight: selected === d.id ? 600 : 400,
                                fontSize: '0.9rem',
                            }}
                        >
                            {d.title}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                flex: 1,
                background: '#fff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto'
            }}>
                {selectedDiagram && (
                    <img
                        src={selectedDiagram.file}
                        alt={selectedDiagram.title}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                )}
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                Generated with Python <code>diagrams</code> library • Graphviz rendering
            </div>
        </div>
    );
}
