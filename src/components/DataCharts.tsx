import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

// Sample data matching Caffeine's transaction categories
const categoryData = [
    { name: '식비', value: 450000, color: '#e0f2fe' },
    { name: '교통', value: 120000, color: '#f1f5f9' },
    { name: '쇼핑', value: 280000, color: '#f0fdf4' },
    { name: '주거', value: 850000, color: '#fff7ed' },
    { name: '문화', value: 95000, color: '#faf5ff' },
    { name: '의료', value: 45000, color: '#fef2f2' },
    { name: '교육', value: 150000, color: '#ecfeff' },
    { name: '기타', value: 78000, color: '#f8fafc' },
];

const monthlyData = [
    { month: '7월', income: 3500000, expense: 2100000 },
    { month: '8월', income: 3500000, expense: 2350000 },
    { month: '9월', income: 3800000, expense: 2180000 },
    { month: '10월', income: 3500000, expense: 2450000 },
    { month: '11월', income: 4200000, expense: 2680000 },
    { month: '12월', income: 3900000, expense: 2068000 },
];

const weeklyTrend = [
    { day: '월', amount: 45000 },
    { day: '화', amount: 32000 },
    { day: '수', amount: 67000 },
    { day: '목', amount: 28000 },
    { day: '금', amount: 89000 },
    { day: '토', amount: 125000 },
    { day: '일', amount: 78000 },
];

const mlPredictionData = [
    { category: '식비', accuracy: 85.2 },
    { category: '교통', accuracy: 91.5 },
    { category: '쇼핑', accuracy: 73.4 },
    { category: '주거', accuracy: 95.8 },
    { category: '문화', accuracy: 68.7 },
    { category: '의료', accuracy: 88.3 },
    { category: '교육', accuracy: 79.2 },
];

export default function DataCharts() {
    return (
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', background: '#f8fafc', minHeight: '100%', overflow: 'auto' }}>
            {/* Category Distribution Pie Chart */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>📊 카테고리별 지출 분포</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#64748b" strokeWidth={1} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₩${Number(value).toLocaleString()}`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Income vs Expense */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>📈 월별 수입/지출 비교</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => `₩${Number(value).toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="income" name="수입" fill="#86efac" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expense" name="지출" fill="#fca5a5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Weekly Spending Trend */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>📅 주간 지출 트렌드</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}천`} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => `₩${Number(value).toLocaleString()}`} />
                        <Area type="monotone" dataKey="amount" name="지출" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* ML Prediction Accuracy */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>🤖 ML 카테고리 예측 정확도</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={mlPredictionData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12 }} />
                        <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} width={60} />
                        <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                        <Bar dataKey="accuracy" name="정확도" fill="#7dd3fc" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
