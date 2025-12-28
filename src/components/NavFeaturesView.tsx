import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    FaHome, FaExchangeAlt, FaChartPie, FaTicketAlt, FaEllipsisH, FaUser, FaCog,
    FaPlus, FaRobot, FaBell, FaHistory, FaLightbulb, FaSignInAlt, FaBrain
} from 'react-icons/fa';
import { MdDashboard, MdAnalytics } from 'react-icons/md';
import type { IconType } from 'react-icons/lib';

interface FeatureItemProps {
    Icon: IconType;
    label: string;
    color: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, label, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: `${color}15`, borderRadius: '4px', fontSize: '9px', color }}>
        <Icon size={12} />
        <span>{label}</span>
    </div>
);

interface NavCardProps {
    title: string;
    icon: IconType;
    color: string;
    features: { icon: IconType; label: string }[];
}

const NavCard: React.FC<NavCardProps> = ({ title, icon: MainIcon, color, features }) => (
    <div style={{ border: `2px solid ${color}`, borderRadius: '10px', background: '#fff', overflow: 'hidden', width: '140px' }}>
        <div style={{ padding: '10px', background: `${color}15`, borderBottom: `1px solid ${color}30`, textAlign: 'center' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                <MainIcon size={18} color="#fff" />
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>{title}</div>
        </div>
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {features.map((f, idx) => (
                <FeatureItem key={idx} Icon={f.icon} label={f.label} color={color} />
            ))}
        </div>
    </div>
);

const navigationData = [
    {
        title: '대시보드',
        icon: MdDashboard,
        color: '#3b82f6',
        features: [
            { icon: FaChartPie, label: '월별 소비 요약' },
            { icon: MdAnalytics, label: '카테고리 분석' },
            { icon: FaPlus, label: '거래 추가' },
            { icon: FaBrain, label: '다음 소비 예측' },
        ]
    },
    {
        title: '거래 내역',
        icon: FaExchangeAlt,
        color: '#10b981',
        features: [
            { icon: FaHistory, label: '거래 목록' },
            { icon: FaPlus, label: '거래 등록' },
            { icon: FaChartPie, label: '카테고리 필터' },
        ]
    },
    {
        title: '분석',
        icon: FaChartPie,
        color: '#8b5cf6',
        features: [
            { icon: MdAnalytics, label: '상세 분석' },
            { icon: FaLightbulb, label: 'AI 인사이트' },
            { icon: FaRobot, label: 'AI 챗봇' },
        ]
    },
    {
        title: '쿠폰',
        icon: FaTicketAlt,
        color: '#f59e0b',
        features: [
            { icon: FaTicketAlt, label: '내 쿠폰 목록' },
            { icon: FaBell, label: '맞춤 추천' },
        ]
    },
    {
        title: '더보기',
        icon: FaEllipsisH,
        color: '#64748b',
        features: [
            { icon: FaUser, label: '프로필' },
            { icon: FaCog, label: '설정' },
            { icon: FaBell, label: '알림 설정' },
            { icon: FaSignInAlt, label: '로그아웃' },
        ]
    },
];

const NavFeaturesView: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!contentRef.current) return;
        const canvas = await html2canvas(contentRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('caffeine_nav_features.pdf');
    };

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', background: '#f8fafc', padding: '16px' }}>
            <div ref={contentRef} style={{ border: '3px solid #3b82f6', borderRadius: '12px', background: '#fff', padding: '16px', minWidth: '900px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', color: '#fff', padding: '8px 20px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700 }}>
                        <FaHome size={16} /> APP NAVIGATION & FEATURES
                    </div>
                </div>

                {/* Navigation Cards */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                    {navigationData.map((nav, idx) => (
                        <NavCard key={idx} {...nav} />
                    ))}
                </div>

                {/* Bottom Bar Indicator */}
                <div style={{ marginTop: '16px', padding: '12px', background: '#f1f5f9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Bottom Navigation Bar</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                        {navigationData.map((nav, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: nav.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <nav.icon size={16} color="#fff" />
                                </div>
                                <span style={{ fontSize: '9px', color: '#475569', fontWeight: 500 }}>{nav.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Summary */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>FEATURE SUMMARY</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                            { label: '거래 관리', color: '#10b981' },
                            { label: 'ML 예측', color: '#8b5cf6' },
                            { label: 'AI 챗봇', color: '#3b82f6' },
                            { label: '쿠폰 추천', color: '#f59e0b' },
                            { label: '소비 분석', color: '#ec4899' },
                        ].map((item, idx) => (
                            <div key={idx} style={{ padding: '4px 12px', background: `${item.color}15`, borderRadius: '12px', fontSize: '9px', fontWeight: 600, color: item.color, border: `1px solid ${item.color}30` }}>
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavFeaturesView;
