import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Users, 
  FileText, 
  Activity, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  LogOut,
  Shield,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';

interface Job {
  id: string;
  name: string;
  description: string;
  is_accepting_applications: boolean;
  icon: string;
  created_at: string;
  updated_at: string;
}

interface Question {
  id: string;
  job_id: string;
  question_text: string;
  question_type: string;
  options?: string[];
  is_required: boolean;
  order_index: number;
}

interface AdminLog {
  id: string;
  action: string;
  details: any;
  created_at: string;
}

interface AdminPanelProps {
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [newJob, setNewJob] = useState({ name: '', description: '', icon: '📋' });
  const [newQuestion, setNewQuestion] = useState({ 
    question_text: '', 
    question_type: 'text', 
    is_required: false 
  });
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobsResult, questionsResult, logsResult] = await Promise.all([
        supabase.from('jobs').select('*').order('created_at'),
        supabase.from('application_questions').select('*').order('order_index'),
        supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(50)
      ]);

      if (jobsResult.data) setJobs(jobsResult.data);
      if (questionsResult.data) setQuestions(questionsResult.data);
      if (logsResult.data) setLogs(logsResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load admin panel data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleJobApplications = async (jobId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_accepting_applications: !currentState })
        .eq('id', jobId);

      if (error) throw error;

      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, is_accepting_applications: !currentState }
          : job
      ));

      // Log the action
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'TOGGLE_JOB_APPLICATIONS',
          details: { jobId, newState: !currentState },
        }
      });

      toast({
        title: "Job updated",
        description: `Applications ${!currentState ? 'enabled' : 'disabled'} for this job`
      });
    } catch (error) {
      console.error('Error updating job:', error);
      toast({
        title: "Error",
        description: "Failed to update job",
        variant: "destructive"
      });
    }
  };

  const createJob = async () => {
    if (!newJob.name.trim()) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([newJob])
        .select()
        .single();

      if (error) throw error;

      setJobs(prev => [...prev, data]);
      setNewJob({ name: '', description: '', icon: '📋' });

      // Log the action
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'CREATE_JOB',
          details: { jobName: newJob.name },
        }
      });

      toast({
        title: "Job created",
        description: `${newJob.name} has been added`
      });
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive"
      });
    }
  };

  const addQuestion = async () => {
    if (!selectedJob || !newQuestion.question_text.trim()) return;

    try {
      const { data, error } = await supabase
        .from('application_questions')
        .insert([{
          ...newQuestion,
          job_id: selectedJob,
          order_index: questions.filter(q => q.job_id === selectedJob).length
        }])
        .select()
        .single();

      if (error) throw error;

      setQuestions(prev => [...prev, data]);
      setNewQuestion({ question_text: '', question_type: 'text', is_required: false });

      // Log the action
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'ADD_QUESTION',
          details: { jobId: selectedJob, questionText: newQuestion.question_text },
        }
      });

      toast({
        title: "Question added",
        description: "New question has been added to the form"
      });
    } catch (error) {
      console.error('Error adding question:', error);
      toast({
        title: "Error",
        description: "Failed to add question",
        variant: "destructive"
      });
    }
  };

  const deleteQuestion = async (questionId: string) => {
    try {
      const { error } = await supabase
        .from('application_questions')
        .delete()
        .eq('id', questionId);

      if (error) throw error;

      setQuestions(prev => prev.filter(q => q.id !== questionId));

      // Log the action
      await supabase.functions.invoke('admin-logger', {
        body: {
          action: 'DELETE_QUESTION',
          details: { questionId },
        }
      });

      toast({
        title: "Question deleted",
        description: "Question has been removed from the form"
      });
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    // Log the logout action
    await supabase.functions.invoke('admin-logger', {
      body: {
        action: 'ADMIN_LOGOUT',
        details: {},
      }
    });

    onLogout();
  };

  const selectedJobQuestions = questions.filter(q => q.job_id === selectedJob);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-muted-foreground text-sm">Advanced Management Console</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="jobs" className="gap-2">
              <Settings className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <FileText className="h-4 w-4" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              <Activity className="h-4 w-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Job Management
                </CardTitle>
                <CardDescription>
                  Manage job postings and application availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{job.icon}</span>
                            <div>
                              <h3 className="font-semibold">{job.name}</h3>
                              <p className="text-sm text-muted-foreground">{job.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={job.is_accepting_applications ? "default" : "secondary"}>
                              {job.is_accepting_applications ? "Active" : "Disabled"}
                            </Badge>
                            <Switch
                              checked={job.is_accepting_applications}
                              onCheckedChange={() => toggleJobApplications(job.id, job.is_accepting_applications)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add New Job</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="job-name">Job Name</Label>
                      <Input
                        id="job-name"
                        value={newJob.name}
                        onChange={(e) => setNewJob(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Police Officer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="job-icon">Icon</Label>
                      <Input
                        id="job-icon"
                        value={newJob.icon}
                        onChange={(e) => setNewJob(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="🚔"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={createJob} className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        Add Job
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="job-description">Description</Label>
                    <Textarea
                      id="job-description"
                      value={newJob.description}
                      onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Job description..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Questions
                </CardTitle>
                <CardDescription>
                  Manage application form questions for each job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Select Job</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    value={selectedJob || ''}
                    onChange={(e) => setSelectedJob(e.target.value || null)}
                  >
                    <option value="">Choose a job...</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.icon} {job.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedJob && (
                  <>
                    <div className="space-y-3">
                      <h3 className="font-semibold">Current Questions</h3>
                      {selectedJobQuestions.length === 0 ? (
                        <p className="text-muted-foreground">No questions yet for this job.</p>
                      ) : (
                        <div className="space-y-2">
                          {selectedJobQuestions.map((question, index) => (
                            <Card key={question.id} className="border-border/50">
                              <CardContent className="p-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">Q{index + 1}:</span>
                                      <Badge variant={question.is_required ? "default" : "secondary"} className="text-xs">
                                        {question.is_required ? "Required" : "Optional"}
                                      </Badge>
                                    </div>
                                    <p className="mt-1 text-sm">{question.question_text}</p>
                                    <p className="text-xs text-muted-foreground">Type: {question.question_type}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteQuestion(question.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Add New Question</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="question-text">Question Text</Label>
                          <Textarea
                            id="question-text"
                            value={newQuestion.question_text}
                            onChange={(e) => setNewQuestion(prev => ({ ...prev, question_text: e.target.value }))}
                            placeholder="Enter your question..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="question-type">Question Type</Label>
                            <select
                              id="question-type"
                              className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                              value={newQuestion.question_type}
                              onChange={(e) => setNewQuestion(prev => ({ ...prev, question_type: e.target.value }))}
                            >
                              <option value="text">Text Input</option>
                              <option value="textarea">Text Area</option>
                              <option value="select">Dropdown</option>
                              <option value="radio">Radio Buttons</option>
                              <option value="checkbox">Checkboxes</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Switch
                              id="required"
                              checked={newQuestion.is_required}
                              onCheckedChange={(checked) => setNewQuestion(prev => ({ ...prev, is_required: checked }))}
                            />
                            <Label htmlFor="required">Required</Label>
                          </div>
                        </div>
                        <Button onClick={addQuestion} className="gap-2">
                          <Plus className="h-4 w-4" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Logs
                </CardTitle>
                <CardDescription>
                  Recent admin actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {logs.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No logs available</p>
                    ) : (
                      logs.map((log) => (
                        <Card key={log.id} className="border-border/50">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-primary" />
                                  <span className="font-medium">{log.action.replace(/_/g, ' ')}</span>
                                </div>
                                {log.details && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {JSON.stringify(log.details, null, 2)}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {new Date(log.created_at).toLocaleString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};