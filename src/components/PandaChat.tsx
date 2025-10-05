import { useState } from "react";
import { Send, Mic, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "./GlassCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PandaChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm PANDA, your AI assistant. I can help control your devices, manage your smartwatch health data, and interact with your smart TV. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    // TODO: Connect to Lovable AI for responses
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "This will be connected to Lovable AI soon. For now, I'm just a placeholder response."
      }]);
    }, 500);
    
    setInput("");
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // TODO: Implement voice input
  };

  return (
    <GlassCard className="flex flex-col h-[600px] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Circle className="w-6 h-6 text-white fill-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">PANDA</h2>
          <p className="text-sm text-white/70">AI Assistant</p>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white/20 text-white backdrop-blur-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask PANDA anything..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <Button
          onClick={toggleVoice}
          variant={isListening ? "default" : "outline"}
          size="icon"
          className={isListening ? "bg-destructive" : "border-white/20 text-white hover:bg-white/10"}
        >
          <Mic className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </GlassCard>
  );
};
