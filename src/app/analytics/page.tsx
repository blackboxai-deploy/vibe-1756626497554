"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function AnalyticsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 34,
    memory: 67,
    neural: 78,
    quantum: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate dynamic metrics
      setSystemMetrics({
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 50,
        neural: Math.floor(Math.random() * 20) + 70,
        quantum: Math.floor(Math.random() * 60) + 20
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const generateRandomData = (points: number) => {
    return Array.from({ length: points }, (_, i) => ({
      time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15}`.padStart(2, '0'),
      value: Math.floor(Math.random() * 40) + 30
    }));
  };

  const performanceData = generateRandomData(12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-900/20">
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
              <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Quantum Analytics
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-900/30 text-emerald-300">
                Real-time Analysis Active
              </Badge>
              <div className="text-sm text-gray-400">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-emerald-400">CPU Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-300">{systemMetrics.cpu}%</div>
              <Progress value={systemMetrics.cpu} className="mt-2 h-2" />
              <div className="text-xs text-emerald-500 mt-1">Optimal performance</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border-cyan-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-cyan-400">Memory Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-300">{systemMetrics.memory}%</div>
              <Progress value={systemMetrics.memory} className="mt-2 h-2" />
              <div className="text-xs text-cyan-500 mt-1">Within safe limits</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-400">Neural Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-300">{systemMetrics.neural}%</div>
              <Progress value={systemMetrics.neural} className="mt-2 h-2" />
              <div className="text-xs text-purple-500 mt-1">High efficiency mode</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/30 to-orange-800/20 border-amber-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-400">Quantum Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">{systemMetrics.quantum}%</div>
              <Progress value={systemMetrics.quantum} className="mt-2 h-2" />
              <div className="text-xs text-amber-500 mt-1">Quantum enhanced</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trends Chart */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-emerald-200">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1">
                  {performanceData.map((point, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-500"
                        style={{ height: `${point.value}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
                  <span>9:00</span>
                  <span>12:00</span>
                  <span>15:00</span>
                  <span>18:00</span>
                </div>
                <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-between text-xs text-gray-400">
                  <span>100%</span>
                  <span>50%</span>
                  <span>0%</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Real-time system performance monitoring with quantum-enhanced analytics
              </div>
            </CardContent>
          </Card>

          {/* Neural Activity Visualization */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-200">Neural Activity Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-4 border-purple-600/30 rounded-full"></div>
                    <div 
                      className="absolute inset-0 border-4 border-purple-400 rounded-full border-dashed animate-spin"
                      style={{ animationDuration: "3s" }}
                    ></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-purple-600/50 to-purple-400/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-200">{systemMetrics.neural}%</span>
                    </div>
                    {/* Neural connection lines */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-px bg-purple-400/60 animate-pulse"
                        style={{
                          height: "20px",
                          left: "50%",
                          top: "-10px",
                          transformOrigin: "bottom center",
                          transform: `rotate(${i * 30}deg)`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <div className="text-sm text-gray-400">
                    Neural network processing efficiency
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <CardTitle className="text-blue-200">Productivity Insight</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100 mb-3">
                Neural patterns indicate 23% increase in productivity during quantum-enhanced processing windows.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-300">Confidence:</span>
                <Badge className="bg-blue-800/50 text-blue-200">87%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-700/50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Q</span>
                </div>
                <CardTitle className="text-green-200">Quantum Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-100 mb-3">
                Quantum algorithms suggest optimal task scheduling between 10:00-14:00 for maximum neural efficiency.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-300">Accuracy:</span>
                <Badge className="bg-green-800/50 text-green-200">94%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-800/20 border-orange-700/50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <CardTitle className="text-orange-200">Security Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-100 mb-3">
                All security protocols active. Quantum encryption maintaining 99.7% integrity across neural networks.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-orange-300">Status:</span>
                <Badge className="bg-orange-800/50 text-orange-200">Secure</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-200">Advanced Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-emerald-300 mb-4">System Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Response Time</span>
                    <span className="text-sm text-emerald-400">127ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Throughput</span>
                    <span className="text-sm text-emerald-400">2.4k ops/sec</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Error Rate</span>
                    <span className="text-sm text-green-400">0.02%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Uptime</span>
                    <span className="text-sm text-green-400">99.97%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Neural Networks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Active Connections</span>
                    <span className="text-sm text-purple-400">847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Learning Rate</span>
                    <span className="text-sm text-purple-400">0.003</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Accuracy</span>
                    <span className="text-sm text-purple-400">94.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Optimization</span>
                    <span className="text-sm text-purple-400">Adam</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">Quantum Computing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Qubits Active</span>
                    <span className="text-sm text-cyan-400">256</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Coherence Time</span>
                    <span className="text-sm text-cyan-400">100μs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Gate Fidelity</span>
                    <span className="text-sm text-cyan-400">99.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Entanglement</span>
                    <span className="text-sm text-cyan-400">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6 bg-gray-700" />

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                All systems operating within optimal parameters. Quantum-enhanced neural processing active.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-green-900/30 text-green-300">All Systems Nominal</Badge>
                <Badge className="bg-blue-900/30 text-blue-300">Quantum Enhanced</Badge>
                <Badge className="bg-purple-900/30 text-purple-300">Neural Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}