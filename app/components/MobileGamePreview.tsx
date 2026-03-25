export default function MobileGamePreview() {
  return (
    <iframe
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
