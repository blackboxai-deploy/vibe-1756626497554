"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "todo" | "in-progress" | "completed";
  aiInsight: string;
  estimatedTime: string;
  deadline?: string;
  category: string;
  neuralScore: number;
  createdAt: Date;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Implement quantum encryption protocol",
      description: "Develop and integrate advanced quantum encryption for secure data transmission across neural networks.",
      priority: "critical",
      status: "in-progress",
      aiInsight: "High complexity task requiring 23% more focus. Recommend breaking into 3 subtasks for optimal neural processing.",
      estimatedTime: "8.5 hours",
      deadline: "2024-01-15",
      category: "Security",
      neuralScore: 87,
      createdAt: new Date("2024-01-10")
    },
    {
      id: "2", 
      title: "Optimize AI response algorithms",
      description: "Fine-tune machine learning models for faster and more accurate AI responses in the chat interface.",
      priority: "high",
      status: "todo",
      aiInsight: "Medium complexity. Neural patterns suggest 15% efficiency gain possible with current resource allocation.",
      estimatedTime: "6.2 hours",
      deadline: "2024-01-18",
      category: "AI/ML",
      neuralScore: 72,
      createdAt: new Date("2024-01-11")
    },
    {
      id: "3",
      title: "Update dashboard analytics",
      description: "Enhance real-time analytics display with new quantum-inspired visualization components.",
      priority: "medium",
      status: "completed",
      aiInsight: "Task completed 12% faster than predicted. Neural efficiency patterns suggest similar tasks can be expedited.",
      estimatedTime: "4.1 hours",
      category: "Frontend",
      neuralScore: 94,
      createdAt: new Date("2024-01-08")
    }
  ]);

  const [newTaskDialog, setNewTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "",
    deadline: ""
  });
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  const priorityColors = {
    low: "bg-blue-900/30 text-blue-300 border-blue-700",
    medium: "bg-yellow-900/30 text-yellow-300 border-yellow-700",
    high: "bg-orange-900/30 text-orange-300 border-orange-700",
    critical: "bg-red-900/30 text-red-300 border-red-700"
  };

  const statusColors = {
    todo: "bg-gray-900/30 text-gray-300 border-gray-700",
    "in-progress": "bg-cyan-900/30 text-cyan-300 border-cyan-700",
    completed: "bg-green-900/30 text-green-300 border-green-700"
  };

  const generateAIInsight = async (title: string, description: string) => {
    setIsGeneratingInsight(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-insight",
          title,
          description
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.insight;
      }
    } catch (error) {
      console.error("Error generating AI insight:", error);
    } finally {
      setIsGeneratingInsight(false);
    }
    
    return "Neural analysis pending. Task complexity assessment in progress.";
  };

  const addTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      toast.error("Please fill in title and description");
      return;
    }

    const insight = await generateAIInsight(newTask.title, newTask.description);
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: "todo",
      aiInsight: insight,
      estimatedTime: `${Math.floor(Math.random() * 8) + 1}.${Math.floor(Math.random() * 9)} hours`,
      deadline: newTask.deadline,
      category: newTask.category || "General",
      neuralScore: Math.floor(Math.random() * 40) + 60,
      createdAt: new Date()
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({ title: "", description: "", priority: "medium", category: "", deadline: "" });
    setNewTaskDialog(false);
    toast.success("Task added with AI insights generated");
  };

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast.success("Task status updated");
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success("Task deleted");
  };

  const getProductivityScore = () => {
    const completed = tasks.filter(t => t.status === "completed").length;
    const total = tasks.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getAverageNeuralScore = () => {
    return tasks.length > 0 ? Math.round(tasks.reduce((sum, task) => sum + task.neuralScore, 0) / tasks.length) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900/20">
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
              <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Neural Task Manager
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-cyan-900/30 text-cyan-300">
                AI Optimization Active
              </Badge>
              <Dialog open={newTaskDialog} onOpenChange={setNewTaskDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                    + New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-cyan-200">Create Neural Task</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      AI will analyze and provide optimization insights
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                    <Textarea
                      placeholder="Task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: any) => setNewTask(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Category"
                        value={newTask.category}
                        onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                    <Input
                      type="date"
                      placeholder="Deadline (optional)"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                    <Button 
                      onClick={addTask} 
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600"
                      disabled={isGeneratingInsight}
                    >
                      {isGeneratingInsight ? "Generating AI Insights..." : "Create Task"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{tasks.length}</div>
              <div className="text-xs text-gray-500">{tasks.filter(t => t.status === "in-progress").length} active</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Productivity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{getProductivityScore()}%</div>
              <Progress value={getProductivityScore()} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Neural Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{getAverageNeuralScore()}%</div>
              <div className="text-xs text-gray-500">AI optimization active</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Critical Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {tasks.filter(t => t.priority === "critical" && t.status !== "completed").length}
              </div>
              <div className="text-xs text-gray-500">Require immediate attention</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg text-white">{task.title}</CardTitle>
                      <Badge className={priorityColors[task.priority]}>
                        {task.priority.toUpperCase()}
                      </Badge>
                      <Badge className={statusColors[task.status]}>
                        {task.status.replace("-", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-purple-600 text-purple-300">
                        Neural: {task.neuralScore}%
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{task.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Select
                      value={task.status}
                      onValueChange={(value: Task["status"]) => updateTaskStatus(task.id, value)}
                    >
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4 bg-gray-700" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">AI Neural Insight</h4>
                    <p className="text-sm text-gray-300 bg-cyan-900/20 p-3 rounded-lg border border-cyan-800/30">
                      {task.aiInsight}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Estimated Time:</span>
                      <span className="text-sm text-cyan-300">{task.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Category:</span>
                      <span className="text-sm text-purple-300">{task.category}</span>
                    </div>
                    {task.deadline && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Deadline:</span>
                        <span className="text-sm text-orange-300">{new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Created:</span>
                      <span className="text-sm text-gray-300">{task.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tasks.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">No tasks found</div>
              <Button
                onClick={() => setNewTaskDialog(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600"
              >
                Create Your First Neural Task
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}