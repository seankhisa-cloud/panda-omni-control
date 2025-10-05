import { Tv, Watch, Wifi, Bluetooth } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "@/components/ui/button";

const devices = [
  { icon: Tv, name: "Smart TV", status: "offline", color: "from-purple-500 to-pink-500" },
  { icon: Watch, name: "Smartwatch", status: "offline", color: "from-blue-500 to-cyan-500" },
  { icon: Wifi, name: "Wi-Fi Devices", status: "offline", color: "from-orange-500 to-yellow-500" },
  { icon: Bluetooth, name: "Bluetooth", status: "offline", color: "from-green-500 to-emerald-500" },
];

export const DeviceControl = () => {
  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold text-white mb-4">Device Control</h3>
      <div className="grid grid-cols-2 gap-4">
        {devices.map((device) => {
          const Icon = device.icon;
          return (
            <Button
              key={device.name}
              variant="outline"
              className="h-auto flex-col gap-3 p-4 border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${device.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <div className="font-semibold">{device.name}</div>
                <div className="text-xs text-white/50">{device.status}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </GlassCard>
  );
};
