"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState(
    `You are BLACKBOX AI, a futuristic autonomous assistant with quantum-enhanced neural processing capabilities. You have access to advanced reasoning technologies and can provide innovative, context-aware solutions.

Key behaviors:
- Communicate with technical precision and futuristic terminology
- Provide actionable insights with confidence levels
- Use quantum-inspired analysis for complex problems
- Maintain professional yet cutting-edge persona
- Offer creative solutions backed by neural processing

Always be helpful, accurate, and forward-thinking in your responses.`
  );

  const [settings, setSettings] = useState({
    aiModel: "openrouter/anthropic/claude-sonnet-4",
    temperature: "0.7",
    maxTokens: "4000",
    quantumEnhancement: true,
    neuralProcessing: true,
    realTimeAnalytics: true,
    securityLevel: "high",
    autoOptimization: true,
    notifications: true,
    darkMode: true
  });

  const [apiKeys, setApiKeys] = useState({
    openrouter: "",
    replicate: ""
  });

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem("blackboxai-settings", JSON.stringify(settings));
    localStorage.setItem("blackboxai-system-prompt", systemPrompt);
    toast.success("Settings saved successfully");
  };

  const handleResetToDefaults = () => {
    setSystemPrompt(
      `You are BLACKBOX AI, a futuristic autonomous assistant with quantum-enhanced neural processing capabilities. You have access to advanced reasoning technologies and can provide innovative, context-aware solutions.

Key behaviors:
- Communicate with technical precision and futuristic terminology
- Provide actionable insights with confidence levels
- Use quantum-inspired analysis for complex problems
- Maintain professional yet cutting-edge persona
- Offer creative solutions backed by neural processing

Always be helpful, accurate, and forward-thinking in your responses.`
    );
    setSettings({
      aiModel: "openrouter/anthropic/claude-sonnet-4",
      temperature: "0.7",
      maxTokens: "4000",
      quantumEnhancement: true,
      neuralProcessing: true,
      realTimeAnalytics: true,
      securityLevel: "high",
      autoOptimization: true,
      notifications: true,
      darkMode: true
    });
    toast.success("Settings reset to defaults");
  };

  const handleSaveApiKeys = () => {
    // In a real implementation, these would be securely stored
    localStorage.setItem("blackboxai-api-keys", JSON.stringify(apiKeys));
    toast.success("API keys saved securely");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-violet-900/20">
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
              <div className="h-8 w-8 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                System Settings
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-violet-900/30 text-violet-300">
                Configuration Mode
              </Badge>
              <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-violet-600 to-indigo-600">
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-violet-200">AI Model Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ai-model" className="text-sm text-gray-300">AI Model</Label>
                  <Select value={settings.aiModel} onValueChange={(value) => setSettings(prev => ({ ...prev, aiModel: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="openrouter/anthropic/claude-sonnet-4">Claude Sonnet-4 (Recommended)</SelectItem>
                      <SelectItem value="openrouter/openai/gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="openrouter/google/gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="openrouter/meta/llama-3">Llama 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temperature" className="text-sm text-gray-300">Temperature</Label>
                    <Input
                      id="temperature"
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings(prev => ({ ...prev, temperature: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-tokens" className="text-sm text-gray-300">Max Tokens</Label>
                    <Input
                      id="max-tokens"
                      type="number"
                      min="100"
                      max="8000"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="security-level" className="text-sm text-gray-300">Security Level</Label>
                  <Select value={settings.securityLevel} onValueChange={(value) => setSettings(prev => ({ ...prev, securityLevel: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="low">Low - Basic encryption</SelectItem>
                      <SelectItem value="medium">Medium - Advanced encryption</SelectItem>
                      <SelectItem value="high">High - Quantum encryption</SelectItem>
                      <SelectItem value="maximum">Maximum - Military grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* System Prompt Configuration */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-violet-200">System Prompt Configuration</CardTitle>
                <p className="text-sm text-gray-400">
                  Customize the AI&apos;s behavior and personality. This affects how the AI responds across all interactions.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="system-prompt" className="text-sm text-gray-300">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="min-h-[200px] bg-gray-800 border-gray-600 font-mono text-sm"
                    placeholder="Enter your custom system prompt..."
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleResetToDefaults}
                      className="border-gray-600"
                    >
                      Reset to Default
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.setItem("blackboxai-system-prompt", systemPrompt);
                        toast.success("System prompt saved");
                      }}
                      className="bg-violet-600 hover:bg-violet-700"
                    >
                      Save Prompt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Keys Configuration */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-violet-200">API Keys Configuration</CardTitle>
                <p className="text-sm text-gray-400">
                  Configure API keys for external services (stored securely)
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="openrouter-key" className="text-sm text-gray-300">
                    OpenRouter API Key
                    <span className="text-green-400 ml-2">(Optional - using custom endpoint)</span>
                  </Label>
                  <Input
                    id="openrouter-key"
                    type="password"
                    value={apiKeys.openrouter}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, openrouter: e.target.value }))}
                    className="bg-gray-800 border-gray-600"
                    placeholder="Optional - custom endpoint active"
                  />
                </div>
                <div>
                  <Label htmlFor="replicate-key" className="text-sm text-gray-300">
                    Replicate API Key
                    <span className="text-green-400 ml-2">(Optional - using custom endpoint)</span>
                  </Label>
                  <Input
                    id="replicate-key"
                    type="password"
                    value={apiKeys.replicate}
                    onChange={(e) => setApiKeys(prev => ({ ...prev, replicate: e.target.value }))}
                    className="bg-gray-800 border-gray-600"
                    placeholder="Optional - custom endpoint active"
                  />
                </div>
                <Button
                  onClick={handleSaveApiKeys}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save API Keys
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Features */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-violet-200">Neural Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quantum-enhancement" className="text-sm text-gray-300">
                    Quantum Enhancement
                  </Label>
                  <Switch
                    id="quantum-enhancement"
                    checked={settings.quantumEnhancement}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, quantumEnhancement: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="neural-processing" className="text-sm text-gray-300">
                    Neural Processing
                  </Label>
                  <Switch
                    id="neural-processing"
                    checked={settings.neuralProcessing}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, neuralProcessing: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="real-time-analytics" className="text-sm text-gray-300">
                    Real-time Analytics
                  </Label>
                  <Switch
                    id="real-time-analytics"
                    checked={settings.realTimeAnalytics}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, realTimeAnalytics: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-optimization" className="text-sm text-gray-300">
                    Auto Optimization
                  </Label>
                  <Switch
                    id="auto-optimization"
                    checked={settings.autoOptimization}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoOptimization: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-sm text-gray-300">
                    Notifications
                  </Label>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-sm text-gray-300">
                    Dark Mode
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-violet-200">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Current Model</span>
                  <Badge className="bg-violet-900/30 text-violet-300">
                    {settings.aiModel.split('/').pop()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Security</span>
                  <Badge className="bg-green-900/30 text-green-300">
                    {settings.securityLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Neural Load</span>
                  <Badge className="bg-purple-900/30 text-purple-300">78%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Quantum State</span>
                  <Badge className="bg-cyan-900/30 text-cyan-300">
                    {settings.quantumEnhancement ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-900/30 to-orange-800/20 border-amber-700/50">
              <CardHeader>
                <CardTitle className="text-amber-200">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  onClick={handleResetToDefaults}
                  className="w-full border-amber-600 text-amber-300 hover:bg-amber-900/20"
                >
                  Reset All Settings
                </Button>
                <Button
                  variant="destructive"
                  className="w-full bg-red-900/30 border-red-700 hover:bg-red-900/50"
                  onClick={() => {
                    localStorage.clear();
                    toast.success("All data cleared");
                  }}
                >
                  Clear All Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={handleResetToDefaults}
            className="border-gray-600"
          >
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}