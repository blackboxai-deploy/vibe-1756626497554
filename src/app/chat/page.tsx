"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  type?: "text" | "image" | "file";
  fileName?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "system",
      content: "Neural interface initialized. Quantum processing active. Ready for multi-modal communication.",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim() || `Uploaded file: ${selectedFile?.name}`,
      timestamp: new Date(),
      type: selectedFile ? "file" : "text",
      fileName: selectedFile?.name
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const messageContent: any[] = [
        { type: "text", text: inputMessage.trim() || "Please analyze this file." }
      ];

      if (selectedFile) {
        const base64File = await convertFileToBase64(selectedFile);
        
        if (selectedFile.type.startsWith("image/")) {
          messageContent.push({
            type: "image_url",
            image_url: { url: base64File }
          });
        } else {
          messageContent.push({
            type: "file",
            file: {
              filename: selectedFile.name,
              file_data: base64File
            }
          });
        }
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: messageContent
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I apologize, but I couldn't process your request at this time.",
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please check your connection and try again.",
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "system",
        content: "Neural interface reset. Quantum processing reinitialized. Ready for new conversation.",
        timestamp: new Date(),
        type: "text"
      }
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20">
      {/* Navigation Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  ← Dashboard
                </Button>
              </Link>
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Neural Chat Interface
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-900/30 text-purple-300">
                Claude Sonnet-4 Active
              </Badge>
              <Button variant="outline" onClick={clearChat} className="border-gray-600 hover:bg-gray-800">
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 h-[calc(100vh-88px)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-purple-200">Conversation</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : message.role === "system"
                            ? "bg-gradient-to-r from-cyan-900/50 to-cyan-800/50 border border-cyan-700/50 text-cyan-200"
                            : "bg-gray-800 text-gray-200"
                        }`}>
                          <div className="text-sm mb-1 opacity-70">
                            {message.role === "user" ? "You" : message.role === "system" ? "System" : "AI Assistant"}
                            {message.fileName && (
                              <span className="ml-2 text-xs bg-black/20 px-2 py-1 rounded">
                                📎 {message.fileName}
                              </span>
                            )}
                          </div>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-50 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 text-gray-200 max-w-[80%] p-3 rounded-lg">
                          <div className="text-sm mb-1 opacity-70">AI Assistant</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                              <div 
                                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" 
                                style={{animationDelay: "0.1s"}}
                              ></div>
                              <div 
                                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" 
                                style={{animationDelay: "0.2s"}}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-400">Processing with neural networks...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <Separator className="my-4 bg-gray-700" />

                {/* Input Area */}
                <div className="space-y-3">
                  {selectedFile && (
                    <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-purple-300">📎 {selectedFile.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask anything... Neural interface supports text, images, and files."
                        className="min-h-[60px] bg-gray-800/50 border-gray-600 focus:border-purple-500 resize-none"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-gray-600 hover:bg-gray-800"
                        disabled={isLoading}
                      >
                        📎 File
                      </Button>
                      <Button
                        onClick={sendMessage}
                        disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm text-gray-400">Neural Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Model</span>
                  <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 text-xs">
                    Claude Sonnet-4
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Processing</span>
                  <span className="text-sm text-green-400">Quantum Enhanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Multimodal</span>
                  <span className="text-sm text-cyan-400">Active</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm text-gray-400">Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-gray-300">✓ Text Analysis & Generation</div>
                <div className="text-xs text-gray-300">✓ Image Recognition & Analysis</div>
                <div className="text-xs text-gray-300">✓ Document Processing</div>
                <div className="text-xs text-gray-300">✓ Code Review & Generation</div>
                <div className="text-xs text-gray-300">✓ Data Analysis & Insights</div>
                <div className="text-xs text-gray-300">✓ Creative Writing & Ideas</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-sm text-gray-400">File Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-gray-300">📄 Documents: PDF, DOC, TXT</div>
                <div className="text-xs text-gray-300">🖼️ Images: JPG, PNG, GIF</div>
                <div className="text-xs text-gray-300">🎥 Videos: MP4, MOV, AVI</div>
                <div className="text-xs text-gray-300">📊 Max Size: 10MB</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}