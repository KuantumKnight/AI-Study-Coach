import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Clock, Brain, Zap, Award, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

interface FocusInsightsProps {
  todayStats: {
    sessionsCompleted: number;
    totalFocusTime: number;
    averageFocusScore: number;
    bestStreak: number;
    xpEarned: number;
  };
}

export const FocusInsights = ({ todayStats }: FocusInsightsProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-accent';
    return 'text-warning';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'outline';
  };

  // AI-generated study insights based on actual data
  const generateAIInsights = () => {
    const insights = [];
    const avgSessionLength = todayStats.totalFocusTime / todayStats.sessionsCompleted;
    const totalHours = todayStats.totalFocusTime / 3600;
    
    // Session frequency analysis
    if (todayStats.sessionsCompleted >= 5) {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Consistent Study Pattern',
        description: `You've completed ${todayStats.sessionsCompleted} sessions today. This shows excellent study discipline!`,
        tip: 'Maintain this rhythm for optimal learning retention.'
      });
    } else if (todayStats.sessionsCompleted >= 3) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Good Progress',
        description: `${todayStats.sessionsCompleted} sessions completed. Consider adding 1-2 more short sessions.`,
        tip: 'Try the Pomodoro technique: 25min study + 5min break.'
      });
    } else {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Room for Improvement',
        description: `Only ${todayStats.sessionsCompleted} sessions today. Aim for at least 3 focused sessions.`,
        tip: 'Start with 15-minute sessions and gradually increase duration.'
      });
    }

    // Session length analysis
    if (avgSessionLength >= 1800) { // 30+ minutes
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Optimal Session Length',
        description: `Average session: ${Math.round(avgSessionLength / 60)} minutes. Perfect for deep learning!`,
        tip: 'Your attention span is well-developed. Consider tackling complex topics.'
      });
    } else if (avgSessionLength >= 900) { // 15+ minutes
      insights.push({
        type: 'info',
        icon: Lightbulb,
        title: 'Good Session Length',
        description: `Average session: ${Math.round(avgSessionLength / 60)} minutes. Good for focused work.`,
        tip: 'Try extending sessions by 5-10 minutes for better retention.'
      });
    } else {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Short Sessions',
        description: `Average session: ${Math.round(avgSessionLength / 60)} minutes. Consider longer sessions.`,
        tip: 'Build up gradually: 15min → 20min → 25min → 30min.'
      });
    }

    // Focus score analysis
    if (todayStats.averageFocusScore >= 90) {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Exceptional Focus',
        description: `${todayStats.averageFocusScore}% focus score! You're in the zone consistently.`,
        tip: 'This is your peak performance time. Schedule important topics now.'
      });
    } else if (todayStats.averageFocusScore >= 70) {
      insights.push({
        type: 'info',
        icon: Lightbulb,
        title: 'Good Focus Level',
        description: `${todayStats.averageFocusScore}% focus score. Solid concentration skills.`,
        tip: 'Identify what helps you focus and eliminate distractions.'
      });
    } else {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Focus Needs Work',
        description: `${todayStats.averageFocusScore}% focus score. Distractions are affecting learning.`,
        tip: 'Try: phone in another room, noise-canceling headphones, or study in a quiet space.'
      });
    }

    // Time-based recommendations
    if (totalHours >= 3) {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Excellent Study Day',
        description: `${formatTime(todayStats.totalFocusTime)} of focused study! You're making great progress.`,
        tip: 'Take breaks every 45-60 minutes to maintain this level.'
      });
    } else if (totalHours >= 1) {
      insights.push({
        type: 'info',
        icon: Lightbulb,
        title: 'Solid Study Session',
        description: `${formatTime(todayStats.totalFocusTime)} of study time. Good foundation for learning.`,
        tip: 'Add 30-60 minutes more for optimal daily learning.'
      });
    } else {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        title: 'Minimal Study Time',
        description: `Only ${formatTime(todayStats.totalFocusTime)} today. Every minute counts for learning.`,
        tip: 'Start with 15-minute blocks. Consistency beats duration.'
      });
    }

    return insights;
  };

  const aiInsights = generateAIInsights();
  const motivationalQuotes = [
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Learning never exhausts the mind.",
    "The only way to learn mathematics is to do mathematics.",
    "Study hard, for the well is deep, and our brains are shallow."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-primary text-white border-0 shadow-glow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-accent" />
            AI Focus Insights
          </h2>
          <Badge variant="outline" className="border-white/20 text-white">
            Today's Report
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.sessionsCompleted}</div>
            <div className="text-xs opacity-75">Sessions</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{formatTime(todayStats.totalFocusTime)}</div>
            <div className="text-xs opacity-75">Focus Time</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${getScoreColor(todayStats.averageFocusScore)}`} />
            <div className={`text-2xl font-bold ${getScoreColor(todayStats.averageFocusScore)}`}>
              {todayStats.averageFocusScore}%
            </div>
            <div className="text-xs opacity-75">Avg Score</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.xpEarned}</div>
            <div className="text-xs opacity-75">XP Earned</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Daily Focus Goal</span>
              <span className="text-sm font-medium">{Math.min(100, Math.round((todayStats.totalFocusTime / 3600) * 100))}%</span>
            </div>
            <Progress value={Math.min(100, (todayStats.totalFocusTime / 3600) * 100)} className="h-2" />
            <p className="text-xs opacity-75 mt-1">Target: 1 hour of focused study</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center mb-3">
              <Brain className="w-5 h-5 text-accent mr-2" />
              <span className="font-semibold">AI Study Insights</span>
            </div>
            <div className="space-y-3">
              {aiInsights.slice(0, 3).map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div key={index} className={`p-3 rounded-lg backdrop-blur-sm ${
                    insight.type === 'success' ? 'bg-success/20 border border-success/30' :
                    insight.type === 'warning' ? 'bg-warning/20 border border-warning/30' :
                    'bg-accent/20 border border-accent/30'
                  }`}>
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-5 h-5 mt-0.5 ${
                        insight.type === 'success' ? 'text-success' :
                        insight.type === 'warning' ? 'text-warning' :
                        'text-accent'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className="text-xs opacity-90 mb-2">{insight.description}</p>
                        <p className="text-xs opacity-75 italic">💡 {insight.tip}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border shadow-card">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Daily Motivation</h3>
          <p className="text-muted-foreground italic">"{randomQuote}"</p>
        </div>
      </Card>
    </div>
  );
};