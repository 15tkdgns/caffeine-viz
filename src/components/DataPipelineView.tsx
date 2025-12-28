import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    SiPython, SiFastapi
} from 'react-icons/si';
import {
    FaDatabase, FaBrain, FaChartLine, FaFileExport, FaCloudUploadAlt,
    FaMobile, FaDesktop
} from 'react-icons/fa';
import { MdDataObject, MdTransform, MdStorage } from 'react-icons/md';
import type { IconType } from 'react-icons/lib';

interface ServiceNodeProps {
    Icon: IconType;
    label: string;
    sublabel?: string;
    color: string;
    bg: string;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({ Icon, label, sublabel, color, bg }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '6px',
        minWidth: '65px',
    }}>
        <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
        }}>
            <Icon size={22} color={color} />
        </div>
        <span style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b', textAlign: 'center' }}>{label}</span>
        {sublabel && <span style={{ fontSize: '7px', color: '#64748b', textAlign: 'center' }}>{sublabel}</span>}
    </div>
);

interface GroupBoxProps {
    title: string;
    children: React.ReactNode;
    borderColor?: string;
}

const GroupBox: React.FC<GroupBoxProps> = ({ title, children, borderColor = '#94a3b8' }) => (
    <div style={{
        border: `2px dashed ${borderColor}`,
        borderRadius: '8px',
        padding: '8px',
        background: 'rgba(255, 255, 255, 0.95)',
    }}>
        <div style={{ fontSize: '8px', fontWeight: 700, color: borderColor, marginBottom: '6px', textTransform: 'uppercase', textAlign: 'center' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>{children}</div>
    </div>
);

const HArrow: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height="20" viewBox={`0 0 ${size} 20`}>
        <defs><marker id="dataArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#475569" /></marker></defs>
        <line x1="0" y1="10" x2={size - 8} y2="10" stroke="#475569" strokeWidth="2" markerEnd="url(#dataArrow)" />
    </svg>
);

const colors = {
    input: { bg: '#fef3c7', color: '#b45309' },
    process: { bg: '#dbeafe', color: '#1d4ed8' },
    transform: { bg: '#fee2e2', color: '#b91c1c' },
    ml: { bg: '#d1fae5', color: '#047857' },
    storage: { bg: '#e0e7ff', color: '#4338ca' },
    output: { bg: '#fce7f3', color: '#be185d' },
};

const DataPipelineView: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;
        const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('caffeine_data_pipeline.pdf');
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#f8fafc', padding: '16px' }}>
            <div ref={contentRef} style={{ border: '3px solid #059669', borderRadius: '12px', background: '#fff', padding: '16px', minWidth: '1000px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #059669, #10b981)', color: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                        <MdDataObject size={18} /> DATA PIPELINE ARCHITECTURE
                    </div>
                </div>

                {/* Main Layout */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>

                    <GroupBox title="Data Input" borderColor="#b45309">
                        <ServiceNode Icon={FaMobile} label="Mobile App" sublabel="User Input" {...colors.input} />
                        <ServiceNode Icon={FaDesktop} label="Web App" sublabel="Transaction" {...colors.input} />
                    </GroupBox>

                    <HArrow />

                    <GroupBox title="API Layer" borderColor="#1d4ed8">
                        <ServiceNode Icon={SiFastapi} label="FastAPI" sublabel="REST API" {...colors.process} />
                        <ServiceNode Icon={SiPython} label="Pydantic" sublabel="Validation" {...colors.process} />
                    </GroupBox>

                    <HArrow />

                    <GroupBox title="Data Transform" borderColor="#b91c1c">
                        <ServiceNode Icon={MdTransform} label="pandas" sublabel="Processing" {...colors.transform} />
                        <ServiceNode Icon={FaChartLine} label="numpy" sublabel="Calculation" {...colors.transform} />
                    </GroupBox>

                    <HArrow />

                    <GroupBox title="ML Processing" borderColor="#047857">
                        <ServiceNode Icon={FaBrain} label="XGBoost" sublabel="Prediction" {...colors.ml} />
                        <ServiceNode Icon={SiPython} label="scikit-learn" sublabel="Feature Eng" {...colors.ml} />
                    </GroupBox>

                    <HArrow />

                    <GroupBox title="Data Storage" borderColor="#4338ca">
                        <ServiceNode Icon={FaDatabase} label="PostgreSQL" sublabel="AWS RDS" {...colors.storage} />
                        <ServiceNode Icon={MdStorage} label="SQLAlchemy" sublabel="ORM" {...colors.storage} />
                    </GroupBox>

                    <HArrow />

                    <GroupBox title="Output" borderColor="#be185d">
                        <ServiceNode Icon={FaFileExport} label="JSON" sublabel="API Response" {...colors.output} />
                        <ServiceNode Icon={FaCloudUploadAlt} label="Webhook" sublabel="Notification" {...colors.output} />
                    </GroupBox>

                </div>

                {/* Data Flow */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>DATA FLOW STAGES</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                            { step: '1', label: 'Ingestion', ...colors.input },
                            { step: '2', label: 'Validation', ...colors.process },
                            { step: '3', label: 'Transform', ...colors.transform },
                            { step: '4', label: 'ML Inference', ...colors.ml },
                            { step: '5', label: 'Persist', ...colors.storage },
                            { step: '6', label: 'Serve', ...colors.output },
                        ].map((item, idx, arr) => (
                            <React.Fragment key={idx}>
                                <div style={{ padding: '4px 10px', background: item.bg, borderRadius: '12px', fontSize: '8px', fontWeight: 600, color: item.color }}>{item.step}. {item.label}</div>
                                {idx < arr.length - 1 && <span style={{ color: '#94a3b8' }}>→</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPipelineView;
