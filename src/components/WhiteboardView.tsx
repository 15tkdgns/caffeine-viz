import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function WhiteboardView() {
    return (
        <div style={{
            width: '100%',
            height: 'calc(100vh - 120px)',
            minHeight: '500px'
        }}>
            <Tldraw />
        </div>
    );
}
