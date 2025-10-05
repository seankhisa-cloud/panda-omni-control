import { useState } from "react";
import { Tv, Watch, Wifi, Bluetooth, ChevronDown, Power, Cast } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const devices = [
  { icon: Tv, name: "Smart TV", type: "tv", color: "from-purple-500 to-pink-500" },
  { icon: Watch, name: "Smartwatch", type: "watch", color: "from-blue-500 to-cyan-500" },
  { icon: Wifi, name: "Wi-Fi Devices", type: "wifi", color: "from-orange-500 to-yellow-500" },
  { icon: Bluetooth, name: "Bluetooth", type: "bluetooth", color: "from-green-500 to-emerald-500" },
];

export const DeviceControl = () => {
  const [connectedDevices, setConnectedDevices] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const connectToSmartwatch = async () => {
    try {
      const nav = navigator as any;
      if (!nav.bluetooth) {
        toast({
          title: "Bluetooth Not Supported",
          description: "Your browser doesn't support Web Bluetooth API",
          variant: "destructive",
        });
        return;
      }

      const device = await nav.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service']
      });

      setConnectedDevices(prev => new Set(prev).add('watch'));
      toast({
        title: "Smartwatch Connected",
        description: `Connected to ${device.name}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to smartwatch",
        variant: "destructive",
      });
    }
  };

  const connectToTV = async () => {
    try {
      // Check for Google Cast API
      const win = window as any;
      if (!win.chrome?.cast) {
        toast({
          title: "Cast Not Available",
          description: "Google Cast is not available. Make sure you're using Chrome/Edge.",
          variant: "destructive",
        });
        return;
      }

      setConnectedDevices(prev => new Set(prev).add('tv'));
      toast({
        title: "TV Discovery",
        description: "Scanning for Cast devices...",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to discover TV devices",
        variant: "destructive",
      });
    }
  };

  const connectToWiFi = async () => {
    toast({
      title: "Wi-Fi Scan",
      description: "Scanning for Wi-Fi enabled devices on local network...",
    });
    setConnectedDevices(prev => new Set(prev).add('wifi'));
  };

  const connectToBluetooth = async () => {
    try {
      const nav = navigator as any;
      if (!nav.bluetooth) {
        toast({
          title: "Bluetooth Not Supported",
          description: "Your browser doesn't support Web Bluetooth API",
          variant: "destructive",
        });
        return;
      }

      const device = await nav.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      });

      setConnectedDevices(prev => new Set(prev).add('bluetooth'));
      toast({
        title: "Bluetooth Device Connected",
        description: `Connected to ${device.name}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Bluetooth device",
        variant: "destructive",
      });
    }
  };

  const handleConnect = async (type: string) => {
    switch (type) {
      case 'tv':
        await connectToTV();
        break;
      case 'watch':
        await connectToSmartwatch();
        break;
      case 'wifi':
        await connectToWiFi();
        break;
      case 'bluetooth':
        await connectToBluetooth();
        break;
    }
  };

  const handleDisconnect = (type: string) => {
    setConnectedDevices(prev => {
      const newSet = new Set(prev);
      newSet.delete(type);
      return newSet;
    });
    toast({
      title: "Device Disconnected",
      description: "Device has been disconnected",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="backdrop-blur-xl bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2"
        >
          <Power className="w-4 h-4" />
          Devices ({connectedDevices.size})
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 backdrop-blur-xl bg-background/95 border-white/20"
      >
        <DropdownMenuLabel className="text-foreground">Control Devices</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {devices.map((device) => {
          const Icon = device.icon;
          const isConnected = connectedDevices.has(device.type);
          
          return (
            <DropdownMenuItem
              key={device.type}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => isConnected ? handleDisconnect(device.type) : handleConnect(device.type)}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${device.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{device.name}</div>
                <div className="text-xs text-muted-foreground">
                  {isConnected ? 'Connected' : 'Click to connect'}
                </div>
              </div>
              {isConnected && (
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
