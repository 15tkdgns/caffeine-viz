import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SiAmazon, SiDocker } from 'react-icons/si';
import {
    FaShieldAlt, FaLock, FaKey, FaUserShield, FaFingerprint, FaNetworkWired
} from 'react-icons/fa';
import { MdSecurity, MdVerifiedUser, MdHttps } from 'react-icons/md';
import type { IconType } from 'react-icons/lib';

interface ServiceNodeProps {
    Icon: IconType;
    label: string;
    sublabel?: string;
    color: string;
    bg: string;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({ Icon, label, sublabel, color, bg }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '6px', minWidth: '65px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>
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
    <div style={{ border: `2px dashed ${borderColor}`, borderRadius: '8px', padding: '8px', background: 'rgba(255, 255, 255, 0.95)' }}>
        <div style={{ fontSize: '8px', fontWeight: 700, color: borderColor, marginBottom: '6px', textTransform: 'uppercase', textAlign: 'center' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>{children}</div>
    </div>
);

const HArrow: React.FC<{ size?: number }> = ({ size = 20 }) => (
    <svg width={size} height="20" viewBox={`0 0 ${size} 20`}>
        <defs><marker id="secArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#475569" /></marker></defs>
        <line x1="0" y1="10" x2={size - 8} y2="10" stroke="#475569" strokeWidth="2" markerEnd="url(#secArrow)" />
    </svg>
);

const colors = {
    auth: { bg: '#fef3c7', color: '#b45309' },
    network: { bg: '#dbeafe', color: '#1d4ed8' },
    app: { bg: '#fee2e2', color: '#b91c1c' },
    data: { bg: '#e0e7ff', color: '#4338ca' },
    infra: { bg: '#f1f5f9', color: '#475569' },
};

const SecurityArchView: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;
        const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('caffeine_security_architecture.pdf');
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#f8fafc', padding: '16px' }}>
            <div ref={contentRef} style={{ border: '3px solid #dc2626', borderRadius: '12px', background: '#fff', padding: '16px', minWidth: '1000px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444)', color: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                        <MdSecurity size={18} /> SECURITY ARCHITECTURE
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    <GroupBox title="Authentication" borderColor="#b45309">
                        <ServiceNode Icon={FaUserShield} label="JWT" sublabel="Token Auth" {...colors.auth} />
                        <ServiceNode Icon={FaKey} label="OAuth 2.0" sublabel="Social Login" {...colors.auth} />
                    </GroupBox>
                    <HArrow />
                    <GroupBox title="Network Security" borderColor="#1d4ed8">
                        <ServiceNode Icon={FaNetworkWired} label="AWS ALB" sublabel="Load Balancer" {...colors.network} />
                        <ServiceNode Icon={FaShieldAlt} label="AWS WAF" sublabel="Web Firewall" {...colors.network} />
                    </GroupBox>
                    <HArrow />
                    <GroupBox title="Application Security" borderColor="#b91c1c">
                        <ServiceNode Icon={MdHttps} label="HTTPS/TLS" sublabel="Encryption" {...colors.app} />
                        <ServiceNode Icon={MdVerifiedUser} label="CORS" sublabel="Cross-Origin" {...colors.app} />
                    </GroupBox>
                    <HArrow />
                    <GroupBox title="Data Security" borderColor="#4338ca">
                        <ServiceNode Icon={FaLock} label="bcrypt" sublabel="Password Hash" {...colors.data} />
                        <ServiceNode Icon={FaFingerprint} label="Pydantic" sublabel="Validation" {...colors.data} />
                    </GroupBox>
                    <HArrow />
                    <GroupBox title="Infrastructure" borderColor="#475569">
                        <ServiceNode Icon={SiDocker} label="Docker" sublabel="Isolation" {...colors.infra} />
                        <ServiceNode Icon={SiAmazon} label="AWS VPC" sublabel="Private Network" {...colors.infra} />
                    </GroupBox>
                </div>

                <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>SECURITY LAYERS</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                            { step: '1', label: 'WAF Filter', ...colors.network },
                            { step: '2', label: 'TLS Encryption', ...colors.app },
                            { step: '3', label: 'JWT Validation', ...colors.auth },
                            { step: '4', label: 'Input Validation', ...colors.app },
                            { step: '5', label: 'Data Encryption', ...colors.data },
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

export default SecurityArchView;
