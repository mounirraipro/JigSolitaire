import GameIframe from './GameIframe';

export default function MobileGamePreview() {
  return (
    <GameIframe
      src="/game/index.html"
      title="JigSolitaire – Try a puzzle"
      scrolling="no"
      className="game-iframe-responsive"
      style={{
        flexShrink: 0,
      }}
    />
  );
}
