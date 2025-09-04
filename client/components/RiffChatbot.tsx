import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  X,
  MessageCircle,
  Send,
  Mic,
  MicOff,
  TrendingUp,
  Star,
  ShoppingBag,
} from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "riff";
  timestamp: Date;
  suggestions?: string[];
}

export default function RiffChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const riffPersonality = {
    name: "Riff",
    role: "AI Sports Commentator & Fan Guide",
    traits: [
      "OG sports commentator",
      "very cool",
      "very funny",
      "approachable",
      "up-to-the-minute sports news",
      "NFL & NCAA trending fashion expert",
    ],
    greeting:
      "Yo! I'm Riff, your sports commentator and Fan Waves guide! 🏈 Ready to find some legendary gear? I've got the inside scoop on all the hottest trends and can help you navigate the site like a pro!",
  };

  const quickSuggestions = [
    "What's trending in NFL gear?",
    "Show me custom gear options",
    "Help me find my team's gear",
    "What's hot in NCAA fashion?",
    "Guide me through the site",
    "Latest sports news?",
  ];

  const riffResponses = {
    greeting: riffPersonality.greeting,
    nfl: "Oh man, you're talking my language! 🔥 NFL gear is absolutely FIRE right now! Chiefs gear is flying off the shelves after that championship run, and Cowboys fans are going crazy for the new vintage collections. What team are you repping?",
    ncaa: "College ball, baby! 🏟️ Alabama crimson is always classic, but Ohio State is trending HARD with their throwback designs. Plus, March Madness gear is already heating up. Which school has your heart?",
    custom:
      "Now THIS is where the magic happens! ✨ Our custom gear designer is next level - you can create jerseys, hats, accessories with ANY team colors and fonts. Want me to walk you through it? It's like having your own personal design studio!",
    trending:
      "Yo, let me drop some knowledge! 📈 Right now it's all about vintage-style snapbacks, oversized jerseys for that throwback vibe, and custom fan chains are HUGE! Fans are mixing classic with modern - it's beautiful!",
    help: "I got you covered! 🙌 I can help you find specific teams, explain our custom designer, show you what's trending, or just chat sports. What do you need, my friend?",
    teams:
      "We've got ALL the teams! 💯 Every NFL squad, major NCAA programs - if you bleed team colors, we got the gear to match. Drop me a team name and I'll show you what's hot!",
    news: "Breaking! 🚨 Latest buzz: Cowboys just dropped new colorways, Chiefs gear still dominating after the ring, and college recruiting is wild - which means team gear sales are through the roof! What team news you want?",
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "1",
        content: riffResponses.greeting,
        sender: "riff",
        timestamp: new Date(),
        suggestions: quickSuggestions.slice(0, 3),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Riff's response based on message content
    setTimeout(() => {
      const response = generateRiffResponse(message.toLowerCase());
      const riffMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "riff",
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, riffMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateRiffResponse = (message: string) => {
    if (message.includes("nfl") || message.includes("football")) {
      return {
        content: riffResponses.nfl,
        suggestions: [
          "Show me Chiefs gear",
          "Cowboys merchandise",
          "Browse all NFL teams",
        ],
      };
    }
    if (message.includes("ncaa") || message.includes("college")) {
      return {
        content: riffResponses.ncaa,
        suggestions: [
          "Alabama gear",
          "Ohio State products",
          "Browse NCAA teams",
        ],
      };
    }
    if (message.includes("custom") || message.includes("design")) {
      return {
        content: riffResponses.custom,
        suggestions: [
          "Open custom designer",
          "Show me fonts",
          "Design examples",
        ],
      };
    }
    if (
      message.includes("trend") ||
      message.includes("hot") ||
      message.includes("popular")
    ) {
      return {
        content: riffResponses.trending,
        suggestions: [
          "Show trending items",
          "Hats collection",
          "Latest arrivals",
        ],
      };
    }
    if (message.includes("help") || message.includes("guide")) {
      return {
        content: riffResponses.help,
        suggestions: ["Site tour", "How to order", "Custom gear help"],
      };
    }
    if (message.includes("team") || message.includes("find")) {
      return {
        content: riffResponses.teams,
        suggestions: ["Search teams", "NFL teams", "NCAA teams"],
      };
    }
    if (message.includes("news") || message.includes("latest")) {
      return {
        content: riffResponses.news,
        suggestions: ["Team updates", "Fashion trends", "New arrivals"],
      };
    }

    // Default response
    return {
      content:
        "That's interesting! 🤔 I'm here to help you find the perfect fan gear and give you the latest sports scoop. Want to explore some teams, check out custom options, or hear about what's trending?",
      suggestions: ["Browse teams", "Custom gear", "What's trending?"],
    };
  };

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  return (
    <>
      {/* Chat Toggle Button - Mobile First */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-gradient-to-r from-electric-blue to-fan-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 md:h-16 md:w-16"
          style={{ zIndex: 9999 }}
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        </Button>
      )}

      {/* Chat Window - Mobile First */}
      {isOpen && (
        <Card
          className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-48px)] max-w-md h-[70vh] max-h-[600px] shadow-2xl border-0 bg-white backdrop-blur-sm md:w-96 flex flex-col"
          style={{ zIndex: 9999 }}
        >
          {/* Header */}
          <CardHeader className="pb-3 bg-gradient-to-r from-electric-blue to-fan-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F5145f5522f6045159571fb1826faa066?format=webp&width=800"
                    alt="Riff"
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border border-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">Riff</CardTitle>
                  <p className="text-xs text-blue-100">AI Sports Commentator</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-electric-blue text-white ml-4"
                      : "bg-white border shadow-sm mr-4"
                  }`}
                >
                  {message.sender === "riff" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F5145f5522f6045159571fb1826faa066?format=webp&width=800"
                        alt="Riff"
                        className="w-6 h-6 rounded-full"
                      />
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Sports Expert
                      </Badge>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {message.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(suggestion)}
                          className="text-xs h-7 bg-blue-50 hover:bg-blue-100 border-blue-200"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border shadow-sm rounded-lg p-3 mr-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F87091a742c05463799bae52525d7477c%2F5145f5522f6045159571fb1826faa066?format=webp&width=800"
                      alt="Riff"
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-electric-blue rounded-full" />
                      <div className="w-2 h-2 bg-electric-blue rounded-full" />
                      <div className="w-2 h-2 bg-electric-blue rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t bg-white flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Riff about gear, teams, or trends..."
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputValue)
                }
                className="flex-1 border-gray-200 focus:border-electric-blue"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={startVoiceInput}
                className={`${isListening ? "bg-red-50 border-red-200" : "hover:bg-blue-50"}`}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 text-red-500" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-electric-blue hover:bg-electric-blue/90"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 flex space-x-2 overflow-x-auto pb-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage("What's trending?")}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage("Help me find gear")}
              >
                <ShoppingBag className="w-3 h-3 mr-1" />
                Find Gear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage("Custom options")}
              >
                <Star className="w-3 h-3 mr-1" />
                Custom
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
