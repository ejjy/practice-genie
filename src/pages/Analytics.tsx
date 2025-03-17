
import React from 'react';
import { Calendar, Clock, TrendingUp, Award } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Mock data for performance chart
const performanceData = [
  { date: 'Mon', score: 75 },
  { date: 'Tue', score: 82 },
  { date: 'Wed', score: 68 },
  { date: 'Thu', score: 78 },
  { date: 'Fri', score: 85 },
  { date: 'Sat', score: 90 },
  { date: 'Sun', score: 88 },
];

// Mock data for topic performance
const topicPerformanceData = [
  { topic: 'Quantitative', score: 82 },
  { topic: 'Reasoning', score: 75 },
  { topic: 'English', score: 65 },
  { topic: 'GK', score: 70 },
  { topic: 'Current Affairs', score: 80 },
];

// Mock data for skills radar
const skillData = [
  { subject: 'Calculation Speed', A: 85, fullMark: 100 },
  { subject: 'Verbal Reasoning', A: 70, fullMark: 100 },
  { subject: 'Data Interpretation', A: 88, fullMark: 100 },
  { subject: 'Grammar', A: 65, fullMark: 100 },
  { subject: 'Current Affairs', A: 78, fullMark: 100 },
  { subject: 'Logical Reasoning', A: 80, fullMark: 100 },
];

// Mock data for time spent
const timeSpentData = [
  { category: 'Quantitative', hours: 12 },
  { category: 'Reasoning', hours: 8 },
  { category: 'English', hours: 5 },
  { category: 'GK', hours: 4 },
  { category: 'Current Affairs', hours: 7 },
];

const Analytics = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your progress and identify areas for improvement
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36h</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Out of 1,024 students</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
          <TabsTrigger value="skills">Skill Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>Your test scores over the past week</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Performance</CardTitle>
                <CardDescription>Your performance across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topicPerformanceData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#14b8a6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time Distribution</CardTitle>
                <CardDescription>Hours spent on each category</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeSpentData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="topics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quantitative Aptitude</CardTitle>
                <CardDescription>Your performance in numerical ability questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Score</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-1">
                      <div className="h-2 bg-practico-600 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time Management</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-1">
                      <div className="h-2 bg-practico-600 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-1">
                      <div className="h-2 bg-practico-600 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Sub-topics Performance</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Number Systems', score: 90 },
                      { name: 'Algebra', score: 75 },
                      { name: 'Geometry', score: 80 },
                      { name: 'Trigonometry', score: 70 },
                      { name: 'Data Interpretation', score: 85 },
                    ].map((topic) => (
                      <div key={topic.name} className="flex items-center justify-between">
                        <span className="text-sm">{topic.name}</span>
                        <span className="text-sm font-medium">{topic.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Verbal Ability</CardTitle>
                <CardDescription>Your performance in English language questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Score</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-1">
                      <div className="h-2 bg-exam-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Time Management</span>
                      <span className="font-medium">70%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-1">
                      <div className="h-2 bg-exam-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="font-medium">62%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full mt-1">
                      <div className="h-2 bg-exam-500 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Sub-topics Performance</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Reading Comprehension', score: 70 },
                      { name: 'Grammar', score: 65 },
                      { name: 'Vocabulary', score: 60 },
                      { name: 'Error Spotting', score: 55 },
                      { name: 'Para Jumbles', score: 75 },
                    ].map((topic) => (
                      <div key={topic.name} className="flex items-center justify-between">
                        <span className="text-sm">{topic.name}</span>
                        <span className="text-sm font-medium">{topic.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Radar</CardTitle>
              <CardDescription>Your strengths and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="80%" data={skillData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#0ea5e9"
                      fill="#0ea5e9"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Personalized recommendations based on your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Improvement Areas</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-red-500 rounded-full mt-1.5 mr-2"></div>
                        <p>Your performance in <strong>Verbal Reasoning</strong> is below average. Focus on improving reading comprehension and vocabulary.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-amber-500 rounded-full mt-1.5 mr-2"></div>
                        <p>Your <strong>time management</strong> in Quantitative sections needs improvement. Try solving more practice questions under timed conditions.</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Strengths</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                        <p>You excel in <strong>Data Interpretation</strong> with consistent high scores. Keep up the good work!</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-1.5 mr-2"></div>
                        <p>Your <strong>Logical Reasoning</strong> skills are strong, particularly in analytical reasoning questions.</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-1">Study Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-practico-500 rounded-full mt-1.5 mr-2"></div>
                        <p>Dedicate 30 minutes daily to <strong>vocabulary building</strong> exercises.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-practico-500 rounded-full mt-1.5 mr-2"></div>
                        <p>Practice <strong>time-bound solving</strong> of quantitative problems to improve speed.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 bg-practico-500 rounded-full mt-1.5 mr-2"></div>
                        <p>Take at least one <strong>full-length mock test</strong> every weekend to build stamina.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
