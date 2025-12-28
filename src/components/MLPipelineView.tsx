import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SiPython, SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';
import { FaBrain, FaDatabase, FaChartBar, FaFileAlt, FaChartLine, FaCheckCircle, FaSave } from 'react-icons/fa';
import { MdTransform, MdTableChart, MdSpeed } from 'react-icons/md';
import type { IconType } from 'react-icons/lib';

interface ServiceNodeProps {
    Icon: IconType;
    label: string;
    sublabel?: string;
    color: string;
    bg: string;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({ Icon, label, sublabel, color, bg }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '6px', minWidth: '60px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>
            <Icon size={20} color={color} />
        </div>
        <span style={{ fontSize: '8px', fontWeight: 600, color: '#1e293b', textAlign: 'center' }}>{label}</span>
        {sublabel && <span style={{ fontSize: '7px', color: '#64748b', textAlign: 'center' }}>{sublabel}</span>}
    </div>
);

interface GroupBoxProps {
    title: string;
    children: React.ReactNode;
    borderColor?: string;
}

const GroupBox: React.FC<GroupBoxProps> = ({ title, children, borderColor = '#94a3b8' }) => (
    <div style={{ border: `2px dashed ${borderColor}`, borderRadius: '8px', padding: '8px', background: 'rgba(255, 255, 255, 0.95)' }}>
        <div style={{ fontSize: '8px', fontWeight: 700, color: borderColor, marginBottom: '6px', textTransform: 'uppercase', textAlign: 'center' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>{children}</div>
    </div>
);

const HArrow: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height="20" viewBox={`0 0 ${size} 20`}>
        <defs><marker id="mlpArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#047857" /></marker></defs>
        <line x1="0" y1="10" x2={size - 8} y2="10" stroke="#047857" strokeWidth="2" markerEnd="url(#mlpArrow)" />
    </svg>
);

const colors = {
    data: { bg: '#fef3c7', color: '#b45309' },
    preprocess: { bg: '#dbeafe', color: '#1d4ed8' },
    feature: { bg: '#fce7f3', color: '#be185d' },
    train: { bg: '#d1fae5', color: '#047857' },
    eval: { bg: '#ede9fe', color: '#7c3aed' },
    deploy: { bg: '#fee2e2', color: '#b91c1c' },
    monitor: { bg: '#e0e7ff', color: '#4338ca' },
};

const MLPipelineView: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;
        const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('caffeine_ml_pipeline.pdf');
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#f8fafc', padding: '16px' }}>
            <div ref={contentRef} style={{ border: '3px solid #047857', borderRadius: '12px', background: '#fff', padding: '16px', minWidth: '1100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #047857, #10b981)', color: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                        <FaBrain size={18} /> ML PIPELINE ARCHITECTURE
                    </div>
                </div>

                {/* Main Pipeline */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>

                    {/* 1. Data Source */}
                    <GroupBox title="Data Source" borderColor="#b45309">
                        <ServiceNode Icon={FaDatabase} label="PostgreSQL" sublabel="Transaction DB" {...colors.data} />
                        <ServiceNode Icon={FaFileAlt} label="CSV" sublabel="Batch Import" {...colors.data} />
                    </GroupBox>

                    <HArrow />

                    {/* 2. Data Preprocessing */}
                    <GroupBox title="Preprocessing" borderColor="#1d4ed8">
                        <ServiceNode Icon={SiPandas} label="pandas" sublabel="DataFrame" {...colors.preprocess} />
                        <ServiceNode Icon={MdTransform} label="Cleaning" sublabel="Missing/Outlier" {...colors.preprocess} />
                    </GroupBox>

                    <HArrow />

                    {/* 3. Feature Engineering */}
                    <GroupBox title="Feature Eng" borderColor="#be185d">
                        <ServiceNode Icon={SiNumpy} label="numpy" sublabel="Calculation" {...colors.feature} />
                        <ServiceNode Icon={MdTableChart} label="Encoding" sublabel="Category/Date" {...colors.feature} />
                    </GroupBox>

                    <HArrow />

                    {/* 4. Model Training */}
                    <GroupBox title="Training" borderColor="#047857">
                        <ServiceNode Icon={FaBrain} label="XGBoost" sublabel="Gradient Boost" {...colors.train} />
                        <ServiceNode Icon={SiScikitlearn} label="scikit-learn" sublabel="Train/Split" {...colors.train} />
                    </GroupBox>

                    <HArrow />

                    {/* 5. Evaluation */}
                    <GroupBox title="Evaluation" borderColor="#7c3aed">
                        <ServiceNode Icon={FaChartLine} label="Metrics" sublabel="MAE/RMSE/R²" {...colors.eval} />
                        <ServiceNode Icon={FaCheckCircle} label="Validation" sublabel="Cross-Val" {...colors.eval} />
                    </GroupBox>

                    <HArrow />

                    {/* 6. Model Deploy */}
                    <GroupBox title="Deployment" borderColor="#b91c1c">
                        <ServiceNode Icon={FaSave} label="joblib" sublabel="Model Save" {...colors.deploy} />
                        <ServiceNode Icon={SiPython} label="FastAPI" sublabel="Endpoint" {...colors.deploy} />
                    </GroupBox>

                    <HArrow />

                    {/* 7. Monitoring */}
                    <GroupBox title="Monitoring" borderColor="#4338ca">
                        <ServiceNode Icon={FaChartBar} label="Logging" sublabel="Prediction Log" {...colors.monitor} />
                        <ServiceNode Icon={MdSpeed} label="Drift" sublabel="Data Drift" {...colors.monitor} />
                    </GroupBox>

                </div>

                {/* Model Details */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>MODEL SPECIFICATIONS</div>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Model:</strong> XGBoost Regressor
                        </div>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Features:</strong> Category, Amount, DayOfWeek, Hour, etc.
                        </div>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Target:</strong> Next Consumption Prediction
                        </div>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>SMOTE:</strong> Class Imbalance Handling
                        </div>
                    </div>
                </div>

                {/* Pipeline Flow */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>ML PIPELINE FLOW</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        {[
                            { step: '1', label: 'Data Load', ...colors.data },
                            { step: '2', label: 'Clean', ...colors.preprocess },
                            { step: '3', label: 'Feature', ...colors.feature },
                            { step: '4', label: 'Train', ...colors.train },
                            { step: '5', label: 'Evaluate', ...colors.eval },
                            { step: '6', label: 'Deploy', ...colors.deploy },
                            { step: '7', label: 'Monitor', ...colors.monitor },
                        ].map((item, idx, arr) => (
                            <React.Fragment key={idx}>
                                <div style={{ padding: '4px 8px', background: item.bg, borderRadius: '12px', fontSize: '8px', fontWeight: 600, color: item.color }}>{item.step}. {item.label}</div>
                                {idx < arr.length - 1 && <span style={{ color: '#94a3b8' }}>→</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MLPipelineView;
