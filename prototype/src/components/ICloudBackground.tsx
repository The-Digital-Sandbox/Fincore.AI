"use client";

export default function ICloudBackground() {
  return (
    <div className="fixed inset-0 z-0 icloud-bg overflow-hidden">
      {/* Radial light overlays */}
      <div
        className="absolute -top-[40%] -left-[20%] w-[140%] h-[140%] animate-pulse"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.22) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          animationDuration: "8s",
        }}
      />
      {/* Floating light beams */}
      <div
        className="light-beam absolute w-[400px] h-[400px] bg-[rgba(86,204,242,0.2)] top-[10%] left-[5%]"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="light-beam absolute w-[350px] h-[350px] bg-[rgba(255,255,255,0.12)] top-[40%] right-[10%]"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="light-beam absolute w-[500px] h-[300px] bg-[rgba(0,95,204,0.15)] bottom-[10%] left-[30%]"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
