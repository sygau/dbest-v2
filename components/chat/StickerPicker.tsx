/**
 * StickerPicker — grid of stickers. Moderator stickers shown only to mods.
 * Duolingo-style rounded card; works as desktop popover and mobile modal.
 */
import { LuX } from 'react-icons/lu';
import { REGULAR_STICKERS, MOD_STICKERS, type Sticker } from '../../lib/chat/stickers';

interface Props {
  isModerator: boolean;
  onPick: (sticker: Sticker) => void;
  onClose: () => void;
  variant: 'popover' | 'modal';
}

export function StickerPicker({ isModerator, onPick, onClose, variant }: Props) {
  const stickers = isModerator ? [...REGULAR_STICKERS, ...MOD_STICKERS] : REGULAR_STICKERS;

  const grid = (
    <div className="grid grid-cols-3 gap-2 min-[400px]:grid-cols-4">
      {stickers.map((s) => (
        <button
          key={s.name}
          type="button"
          onClick={() => onPick(s)}
          aria-label={`Send ${s.name} sticker`}
          className="r5-btn-press flex aspect-square items-center justify-center rounded-xl p-1.5"
          style={{
            border: `2px solid ${s.modOnly ? '#f0b400' : 'var(--color-border)'}`,
            background: 'var(--color-card-bg)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.url} alt={s.name} className="h-full w-full object-contain" loading="lazy" />
        </button>
      ))}
    </div>
  );

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}>
        <div
          className="flex max-h-[80vh] w-full max-w-md flex-col rounded-2xl"
          style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b px-4 py-3"
            style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-heading)' }}>Stickers</h3>
            <button type="button" onClick={onClose} aria-label="Close"><LuX size={18} /></button>
          </div>
          <div className="overflow-y-auto p-4">{grid}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-sticker-zone
      className="absolute bottom-full left-1/2 z-[1000] mb-3 max-h-[400px] w-[min(340px,90vw)] -translate-x-1/2 overflow-y-auto rounded-2xl p-4 shadow-xl"
      style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
    >
      <div className="mb-3 flex items-center justify-between border-b pb-2"
        style={{ borderColor: 'var(--color-border)' }}>
        <h6 className="m-0 text-[14px] font-semibold" style={{ color: 'var(--color-heading)' }}>Stickers</h6>
        <button type="button" onClick={onClose} aria-label="Close stickers"><LuX size={16} /></button>
      </div>
      {grid}
    </div>
  );
}
