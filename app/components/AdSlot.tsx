interface AdSlotProps {
    type?: 'banner' | 'sidebar' | 'in-content';
}

export default function AdSlot({ type = 'banner' }: AdSlotProps) {
    return (
        <div className="ad-container">
            <div className={`ad-slot ${type === 'sidebar' ? 'ad-slot-sidebar' : ''}`}>
                Ad
            </div>
        </div>
    );
}
