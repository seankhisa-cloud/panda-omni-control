import { PandaChat } from "@/components/PandaChat";
import { DeviceControl } from "@/components/DeviceControl";
import pandaBg from "@/assets/panda-bg.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen p-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(${pandaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">PANDA</h1>
          <p className="text-white/80 text-lg drop-shadow-md">
            Your AI-Powered Device Control Assistant
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <PandaChat />
          <DeviceControl />
        </div>
      </div>
    </div>
  );
};

export default Index;
