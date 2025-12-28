import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SiGooglegemini, SiPython } from 'react-icons/si';
import { FaRobot, FaComments, FaDatabase, FaCogs, FaLightbulb, FaUserAlt, FaReply, FaHistory } from 'react-icons/fa';
import { MdOutlineAutoAwesome, MdApi, MdMemory, MdTextFormat } from 'react-icons/md';
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
        <defs><marker id="llmArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#7c3aed" /></marker></defs>
        <line x1="0" y1="10" x2={size - 8} y2="10" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#llmArrow)" />
    </svg>
);

const colors = {
    input: { bg: '#fef3c7', color: '#b45309' },
    context: { bg: '#dbeafe', color: '#1d4ed8' },
    prompt: { bg: '#fce7f3', color: '#be185d' },
    llm: { bg: '#ede9fe', color: '#7c3aed' },
    postprocess: { bg: '#d1fae5', color: '#047857' },
    response: { bg: '#fee2e2', color: '#b91c1c' },
    memory: { bg: '#e0e7ff', color: '#4338ca' },
};

const LLMArchView: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;
        const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('caffeine_llm_architecture.pdf');
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#f8fafc', padding: '16px' }}>
            <div ref={contentRef} style={{ border: '3px solid #7c3aed', borderRadius: '12px', background: '#fff', padding: '16px', minWidth: '1100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)', color: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                        <FaRobot size={18} /> LLM ARCHITECTURE (Gemini)
                    </div>
                </div>

                {/* Main LLM Pipeline */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>

                    {/* 1. User Input */}
                    <GroupBox title="User Input" borderColor="#b45309">
                        <ServiceNode Icon={FaUserAlt} label="User" sublabel="Chat Message" {...colors.input} />
                        <ServiceNode Icon={FaComments} label="Query" sublabel="Natural Lang" {...colors.input} />
                    </GroupBox>

                    <HArrow />

                    {/* 2. Context Retrieval */}
                    <GroupBox title="Context" borderColor="#1d4ed8">
                        <ServiceNode Icon={FaDatabase} label="Transaction" sublabel="User Data" {...colors.context} />
                        <ServiceNode Icon={FaHistory} label="History" sublabel="Chat Memory" {...colors.context} />
                    </GroupBox>

                    <HArrow />

                    {/* 3. Prompt Engineering */}
                    <GroupBox title="Prompt Eng" borderColor="#be185d">
                        <ServiceNode Icon={MdTextFormat} label="Template" sublabel="System Prompt" {...colors.prompt} />
                        <ServiceNode Icon={FaLightbulb} label="Injection" sublabel="Context Insert" {...colors.prompt} />
                    </GroupBox>

                    <HArrow />

                    {/* 4. LLM API */}
                    <GroupBox title="Gemini API" borderColor="#7c3aed">
                        <ServiceNode Icon={SiGooglegemini} label="Gemini" sublabel="gemini-pro" {...colors.llm} />
                        <ServiceNode Icon={MdApi} label="API Call" sublabel="Google AI" {...colors.llm} />
                    </GroupBox>

                    <HArrow />

                    {/* 5. Post Processing */}
                    <GroupBox title="Post Process" borderColor="#047857">
                        <ServiceNode Icon={MdOutlineAutoAwesome} label="Parse" sublabel="JSON/Text" {...colors.postprocess} />
                        <ServiceNode Icon={FaCogs} label="Format" sublabel="Response Clean" {...colors.postprocess} />
                    </GroupBox>

                    <HArrow />

                    {/* 6. Response */}
                    <GroupBox title="Response" borderColor="#b91c1c">
                        <ServiceNode Icon={FaReply} label="Chatbot" sublabel="AI Reply" {...colors.response} />
                        <ServiceNode Icon={SiPython} label="FastAPI" sublabel="Endpoint" {...colors.response} />
                    </GroupBox>

                    <HArrow />

                    {/* 7. Memory Store */}
                    <GroupBox title="Memory" borderColor="#4338ca">
                        <ServiceNode Icon={MdMemory} label="Session" sublabel="Context Store" {...colors.memory} />
                        <ServiceNode Icon={FaDatabase} label="PostgreSQL" sublabel="Chat Log" {...colors.memory} />
                    </GroupBox>

                </div>

                {/* LLM Use Cases */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>LLM USE CASES</div>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ padding: '8px 16px', background: '#ede9fe', borderRadius: '8px', fontSize: '9px', color: '#7c3aed', fontWeight: 600 }}>
                            💬 Consumption Advice
                        </div>
                        <div style={{ padding: '8px 16px', background: '#ede9fe', borderRadius: '8px', fontSize: '9px', color: '#7c3aed', fontWeight: 600 }}>
                            📊 Spending Analysis
                        </div>
                        <div style={{ padding: '8px 16px', background: '#ede9fe', borderRadius: '8px', fontSize: '9px', color: '#7c3aed', fontWeight: 600 }}>
                            🎯 Budget Coaching
                        </div>
                        <div style={{ padding: '8px 16px', background: '#ede9fe', borderRadius: '8px', fontSize: '9px', color: '#7c3aed', fontWeight: 600 }}>
                            🔔 Nagging Feature
                        </div>
                    </div>
                </div>

                {/* LLM Config */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>GEMINI CONFIGURATION</div>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Model:</strong> gemini-pro
                        </div>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Temperature:</strong> 0.7
                        </div>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Max Tokens:</strong> 2048
                        </div>
                        <div style={{ padding: '8px 16px', background: '#f1f5f9', borderRadius: '8px', fontSize: '9px' }}>
                            <strong>Persona:</strong> Financial Advisor
                        </div>
                    </div>
                </div>

                {/* LLM Flow */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '12px' }}>LLM FLOW</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        {[
                            { step: '1', label: 'Input', ...colors.input },
                            { step: '2', label: 'Context', ...colors.context },
                            { step: '3', label: 'Prompt', ...colors.prompt },
                            { step: '4', label: 'Gemini', ...colors.llm },
                            { step: '5', label: 'Parse', ...colors.postprocess },
                            { step: '6', label: 'Reply', ...colors.response },
                            { step: '7', label: 'Store', ...colors.memory },
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

export default LLMArchView;
