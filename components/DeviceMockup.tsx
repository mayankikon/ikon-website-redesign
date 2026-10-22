// Device frames in /public/assets/devices: the Studio Display cut out of the
// Studio Display mockup PSD, and the iPhone 16 Pro from the Apple Devices
// Mockup Bundle. The screen sits on top of the frame at the exact position of
// each mockup's screen layer; with no `screen` it stays blank.

type DeviceProps = {
  screen?: string;
  screenAlt: string;
  className?: string;
};

function Screen({ screen, screenAlt }: Pick<DeviceProps, "screen" | "screenAlt">) {
  return (
    <div className="device-screen" role={screen ? undefined : "img"} aria-label={screen ? undefined : `${screenAlt} (screen coming soon)`}>
      {screen ? <img src={screen} alt={screenAlt} /> : null}
    </div>
  );
}

export function DisplayMockup({ screen, screenAlt, className = "" }: DeviceProps) {
  return (
    <div className={`device device-display ${className}`.trim()}>
      <img className="device-frame" src="/assets/devices/studio-display.webp" width={1502} height={1158} alt="" aria-hidden="true" />
      <Screen screen={screen} screenAlt={screenAlt} />
    </div>
  );
}

export function PhoneMockup({ screen, screenAlt, className = "" }: DeviceProps) {
  return (
    <div className={`device device-phone ${className}`.trim()}>
      <img className="device-frame" src="/assets/devices/iphone-16-pro.svg" alt="" aria-hidden="true" />
      <Screen screen={screen} screenAlt={screenAlt} />
      <span className="device-island" aria-hidden="true" />
    </div>
  );
}
