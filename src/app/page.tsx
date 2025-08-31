"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20">
      {/* Navigation Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                BLACKBOX AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-900/30 text-purple-300">
                Neural Active
              </Badge>
              <div className="text-sm text-gray-400">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to the Future
          </h2>
          <p className="text-gray-400 text-lg">
            Your autonomous AI assistant powered by quantum computing and neural-symbolic reasoning
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Online</div>
              <div className="text-xs text-gray-500">All systems operational</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Neural Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">23%</div>
              <Progress value={23} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">12</div>
              <div className="text-xs text-gray-500">3 priority items</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Security Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">High</div>
              <div className="text-xs text-gray-500">Quantum encrypted</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Chat Interface */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-700/50 hover:border-purple-600 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div>
                  <CardTitle className="text-purple-200 group-hover:text-purple-100 transition-colors">
                    Neural Chat Interface
                  </CardTitle>
                  <CardDescription className="text-purple-400/70">
                    Multi-modal AI communication
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">
                Engage with advanced AI using text, images, and files. Powered by Claude Sonnet-4 with quantum-enhanced processing.
              </p>
              <Link href="/chat">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                  Launch Chat Interface
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Task Management */}
          <Card className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border-cyan-700/50 hover:border-cyan-600 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">NT</span>
                </div>
                <div>
                  <CardTitle className="text-cyan-200 group-hover:text-cyan-100 transition-colors">
                    Neural Task Manager
                  </CardTitle>
                  <CardDescription className="text-cyan-400/70">
                    AI-powered task optimization
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">
                Intelligent task prioritization with predictive analytics and workflow optimization powered by neural networks.
              </p>
              <Link href="/tasks">
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300">
                  Manage Tasks
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/50 hover:border-emerald-600 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">QA</span>
                </div>
                <div>
                  <CardTitle className="text-emerald-200 group-hover:text-emerald-100 transition-colors">
                    Quantum Analytics
                  </CardTitle>
                  <CardDescription className="text-emerald-400/70">
                    Performance insights & predictions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">
                Advanced analytics with quantum-inspired algorithms for predictive insights and performance optimization.
              </p>
              <Link href="/analytics">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Security Monitor */}
          <Card className="bg-gradient-to-br from-amber-900/30 to-orange-800/20 border-amber-700/50 hover:border-amber-600 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SM</span>
                </div>
                <div>
                  <CardTitle className="text-amber-200 group-hover:text-amber-100 transition-colors">
                    Security Monitor
                  </CardTitle>
                  <CardDescription className="text-amber-400/70">
                    AI threat assessment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">
                Real-time security monitoring with AI-driven threat detection and quantum encryption protocols.
              </p>
              <Link href="/security">
                <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 transition-all duration-300">
                  Security Status
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Productivity Optimizer */}
          <Card className="bg-gradient-to-br from-rose-900/30 to-pink-800/20 border-rose-700/50 hover:border-rose-600 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">PO</span>
                </div>
                <div>
                  <CardTitle className="text-rose-200 group-hover:text-rose-100 transition-colors">
                    Productivity Optimizer
                  </CardTitle>
                  <CardDescription className="text-rose-400/70">
                    Workflow enhancement AI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">
                Machine learning-powered workflow analysis with intelligent suggestions for productivity enhancement.
              </p>
              <Link href="/productivity">
                <Button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all duration-300">
                  Optimize Workflow
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-gradient-to-br from-violet-900/30 to-indigo-800/20 border-violet-700/50 hover:border-violet-600 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <CardTitle className="text-violet-200 group-hover:text-violet-100 transition-colors">
                    System Settings
                  </CardTitle>
                  <CardDescription className="text-violet-400/70">
                    AI configuration & preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm mb-4">
                Customize AI behavior, system prompts, and neural network parameters for optimal performance.
              </p>
              <Link href="/settings">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300">
                  Configure System
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}