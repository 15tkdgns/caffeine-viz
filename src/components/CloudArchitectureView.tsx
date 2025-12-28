import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// AWS/Cloud icons from react-icons
import {
  SiAmazon, SiDocker, SiFastapi, SiReact, SiPython,
  SiGooglegemini
} from 'react-icons/si';
import {
  FaDatabase, FaBrain, FaRobot, FaShieldAlt, FaMobile, FaDesktop,
  FaNetworkWired, FaEnvelope, FaGlobe
} from 'react-icons/fa';
import {
  MdAnalytics
} from 'react-icons/md';
import type { IconType } from 'react-icons/lib';

// Service node component with icon and label
interface ServiceNodeProps {
  Icon: IconType;
  label: string;
  sublabel?: string;
  color: string;
  bg: string;
  size?: number;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({ Icon, label, sublabel, color, bg, size = 24 }) => (
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
      <Icon size={size} color={color} />
    </div>
    <span style={{
      fontSize: '9px',
      fontWeight: 600,
      color: '#1e293b',
      textAlign: 'center',
      lineHeight: 1.2,
    }}>
      {label}
    </span>
    {sublabel && (
      <span style={{
        fontSize: '7px',
        color: '#64748b',
        textAlign: 'center',
      }}>
        {sublabel}
      </span>
    )}
  </div>
);

// Group container with dashed border
interface GroupBoxProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
}

const GroupBox: React.FC<GroupBoxProps> = ({ title, children, style, borderColor = '#94a3b8' }) => (
  <div style={{
    border: `2px dashed ${borderColor}`,
    borderRadius: '8px',
    padding: '8px',
    background: 'rgba(255, 255, 255, 0.95)',
    ...style,
  }}>
    <div style={{
      fontSize: '8px',
      fontWeight: 700,
      color: borderColor,
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      textAlign: 'center',
    }}>
      {title}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

// Horizontal arrow
const HArrow: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height="20" viewBox={`0 0 ${size} 20`}>
    <defs>
      <marker id="hArrowHead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#475569" />
      </marker>
    </defs>
    <line x1="0" y1="10" x2={size - 8} y2="10" stroke="#475569" strokeWidth="2" markerEnd="url(#hArrowHead)" />
  </svg>
);

// Color schemes
const colors = {
  client: { bg: '#fef3c7', color: '#b45309' },
  gateway: { bg: '#dbeafe', color: '#1d4ed8' },
  backend: { bg: '#fee2e2', color: '#b91c1c' },
  ml: { bg: '#d1fae5', color: '#047857' },
  llm: { bg: '#ede9fe', color: '#7c3aed' },
  database: { bg: '#e0e7ff', color: '#4338ca' },
  external: { bg: '#fce7f3', color: '#be185d' },
};

const CloudArchitectureView: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('caffeine_architecture.pdf');
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'auto',
      background: '#f8fafc',
      padding: '16px',
    }}>
      {/* Main Container */}
      <div ref={contentRef} style={{
        border: '3px solid #1e40af',
        borderRadius: '12px',
        background: '#fff',
        padding: '16px',
        minWidth: '1000px',
      }}>
        {/* Header with Download Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{
            background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
            color: '#fff',
            padding: '8px 20px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 700,
          }}>
            <SiAmazon size={18} /> CAFFEINE CLOUD ARCHITECTURE
          </div>
        </div>

        {/* Main Horizontal Layout */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '12px',
          background: '#f8fafc',
          borderRadius: '8px',
        }}>

          {/* 1. Clients */}
          <GroupBox title="Clients" borderColor="#b45309">
            <ServiceNode Icon={FaDesktop} label="Admin Page" sublabel="Next.js" {...colors.client} />
            <ServiceNode Icon={FaMobile} label="User Page" sublabel="React Native" {...colors.client} />
          </GroupBox>

          <HArrow size={20} />

          {/* 2. Gateway */}
          <GroupBox title="Gateway" borderColor="#1d4ed8">
            <ServiceNode Icon={FaNetworkWired} label="ALB" sublabel="Load Balancer" {...colors.gateway} />
            <ServiceNode Icon={FaShieldAlt} label="WAF" sublabel="Firewall" {...colors.gateway} />
          </GroupBox>

          <HArrow size={20} />

          {/* 3. Backend */}
          <GroupBox title="Backend" borderColor="#b91c1c">
            <ServiceNode Icon={SiFastapi} label="FastAPI" sublabel="Python 3.10" {...colors.backend} />
            <ServiceNode Icon={SiDocker} label="ECS" sublabel="Container" {...colors.backend} />
          </GroupBox>

          <HArrow size={20} />

          {/* 4. ML/LLM Services */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <GroupBox title="ML Services" borderColor="#047857">
              <ServiceNode Icon={FaBrain} label="XGBoost" sublabel="ML Next" {...colors.ml} />
              <ServiceNode Icon={MdAnalytics} label="scikit-learn" sublabel="ML Library" {...colors.ml} />
            </GroupBox>
            <GroupBox title="LLM Services" borderColor="#7c3aed">
              <ServiceNode Icon={SiGooglegemini} label="Gemini" sublabel="LLM" {...colors.llm} />
              <ServiceNode Icon={FaRobot} label="LangChain" sublabel="LLM Framework" {...colors.llm} />
            </GroupBox>
          </div>

          <HArrow size={20} />

          {/* 5. Database */}
          <GroupBox title="Database" borderColor="#4338ca">
            <ServiceNode Icon={FaDatabase} label="AWS RDS" sublabel="PostgreSQL" {...colors.database} />
            <ServiceNode Icon={SiPython} label="SQLAlchemy" sublabel="ORM" {...colors.database} />
          </GroupBox>

          <HArrow size={20} />

          {/* 6. External APIs */}
          <GroupBox title="External APIs" borderColor="#be185d">
            <ServiceNode Icon={FaGlobe} label="Gemini API" sublabel="Google" {...colors.external} />
            <ServiceNode Icon={FaEnvelope} label="SMTP" sublabel="Email Service" {...colors.external} />
          </GroupBox>

        </div>

        {/* Tech Stack Summary */}
        <div style={{
          marginTop: '16px',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {[
            { Icon: SiReact, label: 'Frontend', tech: 'React Native, Next.js', ...colors.client },
            { Icon: SiPython, label: 'Backend', tech: 'Python, FastAPI', ...colors.backend },
            { Icon: FaBrain, label: 'ML/AI', tech: 'XGBoost, Gemini', ...colors.ml },
            { Icon: FaDatabase, label: 'Database', tech: 'PostgreSQL, Redis', ...colors.database },
            { Icon: SiDocker, label: 'DevOps', tech: 'Docker, AWS ECS', bg: '#f1f5f9', color: '#475569' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <item.Icon size={14} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>{item.label}</div>
                <div style={{ fontSize: '8px', color: '#64748b' }}>{item.tech}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Data Flow */}
        <div style={{
          marginTop: '12px',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#334155', marginRight: '8px' }}>DATA FLOW:</span>
          {[
            { step: '1', label: 'User', ...colors.client },
            { step: '2', label: 'Gateway', ...colors.gateway },
            { step: '3', label: 'Backend', ...colors.backend },
            { step: '4', label: 'ML/LLM', ...colors.ml },
            { step: '5', label: 'Database', ...colors.database },
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div style={{
                padding: '4px 10px',
                background: item.bg,
                borderRadius: '12px',
                fontSize: '8px',
                fontWeight: 600,
                color: item.color,
              }}>
                {item.step}. {item.label}
              </div>
              {idx < arr.length - 1 && <span style={{ color: '#94a3b8' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudArchitectureView;
