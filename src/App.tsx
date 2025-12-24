import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  BackgroundVariant
} from '@xyflow/react';
import type { Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Monitor, Server, Database, Brain, Activity, Globe, Shield, Cloud, Lock, User, CreditCard, MessageSquare, Settings, Smartphone, Layout, Cpu, FileText, Zap, Network, Key, UserCheck, Box, GitBranch, Container, Layers, LayoutGrid } from 'lucide-react';
import './index.css';
import ChartDBView from './components/ChartDBView';
import TechRadarView from './components/TechRadarView';
import APIDocsView from './components/APIDocsView';
import DiagramsView from './components/DiagramsView';
import { getLayoutedElements, type LayoutDirection } from './utils/layoutUtils';

// Custom Node Component
const CustomNode = ({ data }: { data: any }) => {
  const Icon = data.icon || Server;
  return (
    <div className={`custom-node node-${data.layer}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <Icon size={16} />
        {data.label}
      </div>
      {data.sub && <div className="node-sub">{data.sub}</div>}
      {data.port && <div className="node-port">Port: {data.port}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

// --- Diagram Data ---

// 1. Overall Architecture
const overallNodes = [
  { id: 'user-app', type: 'custom', position: { x: 100, y: 0 }, data: { label: 'User App', sub: '(React Native/Expo)', port: '8081', layer: 'client', icon: Monitor } },
  { id: 'admin-app', type: 'custom', position: { x: 350, y: 0 }, data: { label: 'Admin App', sub: '(Next.js/TS)', port: '3001', layer: 'client', icon: Globe } },
  { id: 'nginx', type: 'custom', position: { x: 225, y: 150 }, data: { label: 'Nginx', sub: 'Reverse Proxy', port: '80', layer: 'gateway', icon: Shield } },
  { id: 'fastapi', type: 'custom', position: { x: 225, y: 300 }, data: { label: 'FastAPI Server', sub: '(Python 3.10)', port: '8001', layer: 'backend', icon: Server } },
  { id: 'ml-next', type: 'custom', position: { x: 0, y: 500 }, data: { label: 'ML Next', sub: '(XGBoost 73.47%)', port: '9001', layer: 'ml', icon: Activity } },
  { id: 'ml-fraud', type: 'custom', position: { x: 150, y: 500 }, data: { label: 'ML Fraud', sub: '(Anomaly Detection)', port: '9002', layer: 'ml', icon: Activity } },
  { id: 'llm-cat', type: 'custom', position: { x: 300, y: 500 }, data: { label: 'LLM Category', port: '9100', layer: 'llm', icon: Brain } },
  { id: 'llm-analysis', type: 'custom', position: { x: 450, y: 500 }, data: { label: 'LLM Analysis', sub: '(Gemini 2.0)', port: '9102', layer: 'llm', icon: Brain } },
  { id: 'postgres', type: 'custom', position: { x: 225, y: 650 }, data: { label: 'PostgreSQL', sub: 'AWS RDS', port: '5432', layer: 'database', icon: Database } },
];
const overallEdges = [
  { id: 'e1-2', source: 'user-app', target: 'nginx', type: 'smoothstep' },
  { id: 'e2-2', source: 'admin-app', target: 'nginx', type: 'smoothstep' },
  { id: 'e3', source: 'nginx', target: 'fastapi', type: 'smoothstep' },
  { id: 'e4', source: 'fastapi', target: 'ml-next', type: 'smoothstep' },
  { id: 'e5', source: 'fastapi', target: 'ml-fraud', type: 'smoothstep' },
  { id: 'e6', source: 'fastapi', target: 'llm-cat', type: 'smoothstep' },
  { id: 'e7', source: 'fastapi', target: 'llm-analysis', type: 'smoothstep' },
  { id: 'e8', source: 'fastapi', target: 'postgres', type: 'smoothstep' },
];

// 2. Tech Stack (Mindmap style - edges flow inward to root)
const techStackNodes = [
  { id: 'root', type: 'custom', position: { x: 300, y: 300 }, data: { label: 'Caffeine', layer: 'backend', icon: Zap } },
  { id: 'frontend', type: 'custom', position: { x: 100, y: 100 }, data: { label: 'Frontend', sub: 'React Native, Expo, Next.js 16, TypeScript, TailwindCSS', layer: 'client', icon: Smartphone } },
  { id: 'backend', type: 'custom', position: { x: 500, y: 100 }, data: { label: 'Backend', sub: 'Python 3.10, FastAPI, SQLAlchemy, Pydantic, JWT', layer: 'backend', icon: Server } },
  { id: 'database', type: 'custom', position: { x: 100, y: 500 }, data: { label: 'Database', sub: 'PostgreSQL, AWS RDS', layer: 'database', icon: Database } },
  { id: 'ml', type: 'custom', position: { x: 500, y: 500 }, data: { label: 'ML/AI', sub: 'XGBoost, scikit-learn, Anomaly Detection', layer: 'ml', icon: Brain } },
  { id: 'llm', type: 'custom', position: { x: 300, y: 500 }, data: { label: 'LLM', sub: 'Google Gemini API, gemini-2.0-flash', layer: 'llm', icon: MessageSquare } },
  { id: 'devops', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'DevOps', sub: 'Docker, Nginx, AWS ECS', layer: 'gateway', icon: Container } },
];
const techStackEdges = [
  { id: 'te1', source: 'frontend', target: 'root', type: 'smoothstep' },
  { id: 'te2', source: 'backend', target: 'root', type: 'smoothstep' },
  { id: 'te3', source: 'database', target: 'root', type: 'smoothstep' },
  { id: 'te4', source: 'ml', target: 'root', type: 'smoothstep' },
  { id: 'te5', source: 'llm', target: 'root', type: 'smoothstep' },
  { id: 'te6', source: 'devops', target: 'root', type: 'smoothstep' },
];

// 3. Database Schema (ERD)
const erdNodes = [
  { id: 'users', type: 'custom', position: { x: 300, y: 50 }, data: { label: 'USERS', sub: 'id, email, name, password_hash, created_at, is_active, is_admin', layer: 'database', icon: User } },
  { id: 'transactions', type: 'custom', position: { x: 50, y: 250 }, data: { label: 'TRANSACTIONS', sub: 'id, user_id, amount, description, category, ml_category, transaction_date', layer: 'ml', icon: CreditCard } },
  { id: 'settings', type: 'custom', position: { x: 300, y: 250 }, data: { label: 'USER_SETTINGS', sub: 'id, user_id, email_notifications, budget_limit', layer: 'gateway', icon: Settings } },
  { id: 'coupons', type: 'custom', position: { x: 550, y: 50 }, data: { label: 'COUPONS', sub: 'id, title, discount_rate, valid_until, is_active', layer: 'llm', icon: FileText } },
  { id: 'user_coupons', type: 'custom', position: { x: 550, y: 250 }, data: { label: 'USER_COUPONS', sub: 'id, user_id, coupon_id, claimed_at, is_used', layer: 'client', icon: FileText } },
  { id: 'chatbot', type: 'custom', position: { x: 300, y: 450 }, data: { label: 'CHATBOT_HISTORY', sub: 'id, user_id, message, response, created_at', layer: 'llm', icon: MessageSquare } },
];
const erdEdges = [
  { id: 'erd1', source: 'users', target: 'transactions', type: 'smoothstep', label: 'has' },
  { id: 'erd2', source: 'users', target: 'settings', type: 'smoothstep', label: 'has' },
  { id: 'erd3', source: 'users', target: 'user_coupons', type: 'smoothstep', label: 'claims' },
  { id: 'erd4', source: 'coupons', target: 'user_coupons', type: 'smoothstep', label: 'claimed by' },
  { id: 'erd5', source: 'users', target: 'chatbot', type: 'smoothstep', label: 'has' },
];

// 4. API Endpoints (with central FastAPI hub)
const apiNodes = [
  { id: 'fastapi', type: 'custom', position: { x: 250, y: 200 }, data: { label: 'FastAPI', sub: 'Central API Gateway', layer: 'backend', icon: Server } },
  { id: 'auth', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Auth API', sub: 'POST /login, /register, GET /profile', layer: 'client', icon: Lock } },
  { id: 'trans', type: 'custom', position: { x: 250, y: 50 }, data: { label: 'Transaction API', sub: 'GET/POST/PUT/DELETE /transactions', layer: 'backend', icon: CreditCard } },
  { id: 'analysis', type: 'custom', position: { x: 450, y: 50 }, data: { label: 'Analysis API', sub: 'GET /analysis/full, /summary', layer: 'ml', icon: Activity } },
  { id: 'ml-api', type: 'custom', position: { x: 100, y: 350 }, data: { label: 'ML API', sub: 'POST /ml/predict, /predict-next', layer: 'ml', icon: Cpu } },
  { id: 'chat-api', type: 'custom', position: { x: 400, y: 350 }, data: { label: 'Chatbot API', sub: 'POST /chatbot/chat, GET /history', layer: 'llm', icon: MessageSquare } },
];
const apiEdges = [
  { id: 'api1', source: 'fastapi', target: 'auth', type: 'smoothstep' },
  { id: 'api2', source: 'fastapi', target: 'trans', type: 'smoothstep' },
  { id: 'api3', source: 'fastapi', target: 'analysis', type: 'smoothstep' },
  { id: 'api4', source: 'fastapi', target: 'ml-api', type: 'smoothstep' },
  { id: 'api5', source: 'fastapi', target: 'chat-api', type: 'smoothstep' },
];

// 5. ML Pipeline
const mlNodes = [
  { id: 'input', type: 'custom', position: { x: 50, y: 200 }, data: { label: '입력 데이터', sub: '금액, 설명, 날짜', layer: 'client', icon: FileText } },
  { id: 'feat1', type: 'custom', position: { x: 200, y: 100 }, data: { label: '금액 범위', layer: 'gateway', icon: Layers } },
  { id: 'feat2', type: 'custom', position: { x: 200, y: 200 }, data: { label: '시간대', layer: 'gateway', icon: Layers } },
  { id: 'feat3', type: 'custom', position: { x: 200, y: 300 }, data: { label: '요일', layer: 'gateway', icon: Layers } },
  { id: 'feat4', type: 'custom', position: { x: 200, y: 400 }, data: { label: '텍스트 특징', layer: 'gateway', icon: Layers } },
  { id: 'xgb', type: 'custom', position: { x: 400, y: 200 }, data: { label: 'XGBoost Classifier', layer: 'ml', icon: Brain } },
  { id: 'output-cat', type: 'custom', position: { x: 600, y: 150 }, data: { label: '카테고리 분류', sub: '15개 분류', layer: 'llm', icon: FileText } },
  { id: 'output-prob', type: 'custom', position: { x: 600, y: 250 }, data: { label: '확률 점수', layer: 'llm', icon: Activity } },
];
const mlEdges = [
  { id: 'ml1', source: 'input', target: 'feat1', type: 'smoothstep' },
  { id: 'ml2', source: 'input', target: 'feat2', type: 'smoothstep' },
  { id: 'ml3', source: 'input', target: 'feat3', type: 'smoothstep' },
  { id: 'ml4', source: 'input', target: 'feat4', type: 'smoothstep' },
  { id: 'ml5', source: 'feat1', target: 'xgb', type: 'smoothstep' },
  { id: 'ml6', source: 'feat2', target: 'xgb', type: 'smoothstep' },
  { id: 'ml7', source: 'feat3', target: 'xgb', type: 'smoothstep' },
  { id: 'ml8', source: 'feat4', target: 'xgb', type: 'smoothstep' },
  { id: 'ml9', source: 'xgb', target: 'output-cat', type: 'smoothstep' },
  { id: 'ml10', source: 'xgb', target: 'output-prob', type: 'smoothstep' },
];

// 6. User App Navigation
const navNodes = [
  { id: 'login', type: 'custom', position: { x: 50, y: 50 }, data: { label: '로그인', layer: 'client', icon: Lock } },
  { id: 'signup', type: 'custom', position: { x: 200, y: 50 }, data: { label: '회원가입', layer: 'client', icon: UserCheck } },
  { id: 'dashboard', type: 'custom', position: { x: 125, y: 200 }, data: { label: '대시보드', layer: 'backend', icon: Layout } },
  { id: 'transactions', type: 'custom', position: { x: 0, y: 350 }, data: { label: '거래 내역', layer: 'gateway', icon: CreditCard } },
  { id: 'analysis', type: 'custom', position: { x: 125, y: 350 }, data: { label: '분석', layer: 'ml', icon: Activity } },
  { id: 'coupons', type: 'custom', position: { x: 250, y: 350 }, data: { label: '쿠폰', layer: 'llm', icon: FileText } },
  { id: 'more', type: 'custom', position: { x: 375, y: 350 }, data: { label: '더보기', layer: 'database', icon: Settings } },
  { id: 'profile', type: 'custom', position: { x: 325, y: 500 }, data: { label: '프로필', layer: 'client', icon: User } },
  { id: 'settings', type: 'custom', position: { x: 425, y: 500 }, data: { label: '설정', layer: 'gateway', icon: Settings } },
];
const navEdges = [
  { id: 'nav1', source: 'login', target: 'dashboard', type: 'smoothstep' },
  { id: 'nav2', source: 'signup', target: 'dashboard', type: 'smoothstep' },
  { id: 'nav3', source: 'dashboard', target: 'transactions', type: 'smoothstep' },
  { id: 'nav4', source: 'dashboard', target: 'analysis', type: 'smoothstep' },
  { id: 'nav5', source: 'dashboard', target: 'coupons', type: 'smoothstep' },
  { id: 'nav6', source: 'dashboard', target: 'more', type: 'smoothstep' },
  { id: 'nav7', source: 'more', target: 'profile', type: 'smoothstep' },
  { id: 'nav8', source: 'more', target: 'settings', type: 'smoothstep' },
];

// 7. Deployment Architecture
const deployNodes = [
  { id: 'github', type: 'custom', position: { x: 50, y: 150 }, data: { label: 'Source Code', sub: 'GitHub', layer: 'gateway', icon: GitBranch } },
  { id: 'docker-local', type: 'custom', position: { x: 50, y: 300 }, data: { label: 'Docker Compose', sub: 'Local', layer: 'gateway', icon: Container } },
  { id: 'ecr', type: 'custom', position: { x: 250, y: 150 }, data: { label: 'AWS ECR', sub: 'Container Registry', layer: 'ml', icon: Box } },
  { id: 'ecs', type: 'custom', position: { x: 450, y: 150 }, data: { label: 'AWS ECS', sub: 'Container Service', layer: 'backend', icon: Cloud } },
  { id: 'rds', type: 'custom', position: { x: 450, y: 300 }, data: { label: 'AWS RDS', sub: 'PostgreSQL', layer: 'database', icon: Database } },
  { id: 'gemini', type: 'custom', position: { x: 650, y: 150 }, data: { label: 'Google Gemini API', layer: 'llm', icon: Brain } },
  { id: 'gmail', type: 'custom', position: { x: 650, y: 300 }, data: { label: 'Gmail SMTP', layer: 'client', icon: MessageSquare } },
];
const deployEdges = [
  { id: 'dep1', source: 'github', target: 'docker-local', type: 'smoothstep' },
  { id: 'dep2', source: 'github', target: 'ecr', type: 'smoothstep' },
  { id: 'dep3', source: 'ecr', target: 'ecs', type: 'smoothstep' },
  { id: 'dep4', source: 'ecs', target: 'rds', type: 'smoothstep' },
  { id: 'dep5', source: 'ecs', target: 'gemini', type: 'smoothstep' },
  { id: 'dep6', source: 'ecs', target: 'gmail', type: 'smoothstep' },
];

// 8. Security Layer (with connected API Key flow)
const securityNodes = [
  { id: 'request', type: 'custom', position: { x: 50, y: 150 }, data: { label: 'External Request', layer: 'gateway', icon: Network } },
  { id: 'cors', type: 'custom', position: { x: 200, y: 150 }, data: { label: 'CORS Policy', layer: 'database', icon: Shield } },
  { id: 'jwt', type: 'custom', position: { x: 350, y: 150 }, data: { label: 'JWT Authentication', layer: 'database', icon: Key } },
  { id: 'middleware', type: 'custom', position: { x: 500, y: 150 }, data: { label: 'Security Middleware', layer: 'database', icon: Lock } },
  { id: 'user-role', type: 'custom', position: { x: 450, y: 300 }, data: { label: 'User Role', layer: 'client', icon: User } },
  { id: 'admin-role', type: 'custom', position: { x: 550, y: 300 }, data: { label: 'Admin Role', layer: 'ml', icon: UserCheck } },
  { id: 'api-key', type: 'custom', position: { x: 350, y: 300 }, data: { label: 'API Key', sub: 'Service-to-Service', layer: 'llm', icon: Key } },
  { id: 'llm-services', type: 'custom', position: { x: 350, y: 450 }, data: { label: 'LLM Services', layer: 'llm', icon: Brain } },
];
const securityEdges = [
  { id: 'sec1', source: 'request', target: 'cors', type: 'smoothstep' },
  { id: 'sec2', source: 'cors', target: 'jwt', type: 'smoothstep' },
  { id: 'sec3', source: 'jwt', target: 'middleware', type: 'smoothstep' },
  { id: 'sec4', source: 'middleware', target: 'user-role', type: 'smoothstep' },
  { id: 'sec5', source: 'middleware', target: 'admin-role', type: 'smoothstep' },
  { id: 'sec6', source: 'middleware', target: 'api-key', type: 'smoothstep' },
  { id: 'sec7', source: 'api-key', target: 'llm-services', type: 'smoothstep' },
];

// Diagram selector
const diagrams: { [key: string]: { nodes: any[], edges: any[], label: string } } = {
  overall: { nodes: overallNodes, edges: overallEdges, label: '전체 구성도' },
  techstack: { nodes: techStackNodes, edges: techStackEdges, label: '기술 스택' },
  erd: { nodes: erdNodes, edges: erdEdges, label: 'DB 스키마' },
  api: { nodes: apiNodes, edges: apiEdges, label: 'API 엔드포인트' },
  ml: { nodes: mlNodes, edges: mlEdges, label: 'ML 파이프라인' },
  nav: { nodes: navNodes, edges: navEdges, label: '앱 내비게이션' },
  deploy: { nodes: deployNodes, edges: deployEdges, label: '배포 아키텍처' },
  security: { nodes: securityNodes, edges: securityEdges, label: '보안 레이어' },
};

// Special views (non-React Flow)
const specialViews = ['chartdb', 'techradar', 'apidocs', 'diagrams'];

function App() {
  const [currentView, setCurrentView] = useState('overall');
  const [nodes, setNodes, onNodesChange] = useNodesState(diagrams['overall'].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(diagrams['overall'].edges);
  const [layoutDirection, setLayoutDirection] = useState<LayoutDirection>('TB');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleViewChange = (key: string) => {
    setCurrentView(key);
    if (!specialViews.includes(key) && diagrams[key]) {
      setNodes(diagrams[key].nodes);
      setEdges(diagrams[key].edges);
    }
  };

  const onLayout = useCallback((direction: LayoutDirection) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      direction
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    setLayoutDirection(direction);
  }, [nodes, edges, setNodes, setEdges]);

  const isSpecialView = specialViews.includes(currentView);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tab Navigation */}
      <div style={{ padding: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid #e2e8f0', background: '#fff', alignItems: 'center' }}>
        {/* React Flow Diagrams */}
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Flow:</span>
        {Object.entries(diagrams).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleViewChange(key)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: currentView === key ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              background: currentView === key ? '#eff6ff' : '#fff',
              cursor: 'pointer',
              fontWeight: currentView === key ? 600 : 400,
              fontSize: '0.85rem',
            }}
          >
            {val.label}
          </button>
        ))}

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px' }} />

        {/* Additional Tools */}
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Tools:</span>
        <button
          onClick={() => handleViewChange('chartdb')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: currentView === 'chartdb' ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
            background: currentView === 'chartdb' ? '#faf5ff' : '#fff',
            cursor: 'pointer',
            fontWeight: currentView === 'chartdb' ? 600 : 400,
            fontSize: '0.85rem',
          }}
        >
          ChartDB
        </button>
        <button
          onClick={() => handleViewChange('techradar')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: currentView === 'techradar' ? '2px solid #06b6d4' : '1px solid #e2e8f0',
            background: currentView === 'techradar' ? '#ecfeff' : '#fff',
            cursor: 'pointer',
            fontWeight: currentView === 'techradar' ? 600 : 400,
            fontSize: '0.85rem',
          }}
        >
          Tech Radar
        </button>
        <button
          onClick={() => handleViewChange('apidocs')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: currentView === 'apidocs' ? '2px solid #ec4899' : '1px solid #e2e8f0',
            background: currentView === 'apidocs' ? '#fdf2f8' : '#fff',
            cursor: 'pointer',
            fontWeight: currentView === 'apidocs' ? 600 : 400,
            fontSize: '0.85rem',
          }}
        >
          API Docs
        </button>
        <button
          onClick={() => handleViewChange('diagrams')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: currentView === 'diagrams' ? '2px solid #10b981' : '1px solid #e2e8f0',
            background: currentView === 'diagrams' ? '#ecfdf5' : '#fff',
            cursor: 'pointer',
            fontWeight: currentView === 'diagrams' ? 600 : 400,
            fontSize: '0.85rem',
          }}
        >
          Diagrams
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px' }} />

        {/* Layout Buttons */}
        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Layout:</span>
        <button
          onClick={() => onLayout('TB')}
          disabled={isSpecialView}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: layoutDirection === 'TB' ? '2px solid #6366f1' : '1px solid #e2e8f0',
            background: layoutDirection === 'TB' ? '#eef2ff' : '#fff',
            cursor: isSpecialView ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: isSpecialView ? 0.5 : 1,
          }}
        >
          <LayoutGrid size={14} /> TB
        </button>
        <button
          onClick={() => onLayout('LR')}
          disabled={isSpecialView}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: layoutDirection === 'LR' ? '2px solid #6366f1' : '1px solid #e2e8f0',
            background: layoutDirection === 'LR' ? '#eef2ff' : '#fff',
            cursor: isSpecialView ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: isSpecialView ? 0.5 : 1,
          }}
        >
          <LayoutGrid size={14} /> LR
        </button>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {currentView === 'chartdb' && <ChartDBView />}
        {currentView === 'techradar' && <TechRadarView />}
        {currentView === 'apidocs' && <APIDocsView />}
        {currentView === 'diagrams' && <DiagramsView />}
        {!isSpecialView && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}

export default App;
