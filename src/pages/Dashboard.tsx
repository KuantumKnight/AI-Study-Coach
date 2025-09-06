import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { StudyTimer } from '@/components/StudyTimer';
import { UserProfile } from '@/components/UserProfile';
import { QuizModal } from '@/components/QuizModal';
import { ShopSidebar } from '@/components/ShopSidebar';
import { FocusInsights } from '@/components/FocusInsights';
import { TeamOverview } from '@/components/TeamOverview';
import { CreateTeamModal } from '@/components/CreateTeamModal';
import { TeamsModal } from '@/components/TeamsModal';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Brain, Users, Trophy, Sparkles, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import cosmicTheme from '@/assets/theme-cosmic.jpg';
import forestTheme from '@/assets/theme-forest.jpg';

export const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Productivity Hero",
    level: 1,
    xp: 0,
    coins: 2000,
    streak: 0,
    avatar: "robot",
    totalXP: 0
  });

  const [showQuiz, setShowQuiz] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [todayStats, setTodayStats] = useState({
    sessionsCompleted: 0,
    totalFocusTime: 0, // seconds
    averageFocusScore: 0,
    bestStreak: 0,
    xpEarned: 0
  });

  const { toast } = useToast();
  const { theme, changeTheme } = useTheme();

  const getBackgroundImage = () => {
    switch (currentTheme) {
      case 'cosmic':
        return cosmicTheme;
      case 'forest':
        return forestTheme;
      case 'ocean':
        return 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
      case 'sunset':
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
      default:
        return cosmicTheme;
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Welcome message
      toast({
        title: "🚀 Welcome to ProductivityCoach!",
        description: "Start your focus journey and earn rewards!",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSessionComplete = (data: {
    duration: number;
    xpEarned: number;
    coinsEarned: number;
    distractions: number;
  }) => {
    // Calculate focus score for this session
    const sessionFocusScore = Math.max(0, 100 - (data.distractions * 10));
    
    // Update user stats
    setUser(prev => ({
      ...prev,
      xp: prev.xp + data.xpEarned,
      coins: prev.coins + data.coinsEarned,
      totalXP: prev.totalXP + data.xpEarned,
      level: Math.floor((prev.totalXP + data.xpEarned) / 1000) + 1
    }));

    // Update today's stats with real-time data
    setTodayStats(prev => {
      const newSessionsCompleted = prev.sessionsCompleted + 1;
      const newTotalFocusTime = prev.totalFocusTime + data.duration;
      const newXpEarned = prev.xpEarned + data.xpEarned;
      
      // Calculate new average focus score
      const newAverageFocusScore = newSessionsCompleted === 1 
        ? sessionFocusScore 
        : Math.round((prev.averageFocusScore * prev.sessionsCompleted + sessionFocusScore) / newSessionsCompleted);
      
      // Update best streak if current session is longer
      const newBestStreak = Math.max(prev.bestStreak, data.duration);
      
      return {
        sessionsCompleted: newSessionsCompleted,
        totalFocusTime: newTotalFocusTime,
        averageFocusScore: newAverageFocusScore,
        bestStreak: newBestStreak,
        xpEarned: newXpEarned
      };
    });
  };

  const handleQuizComplete = (score: number, xp: number, coins: number) => {
    setUser(prev => ({
      ...prev,
      xp: prev.xp + xp,
      coins: prev.coins + coins,
      totalXP: prev.totalXP + xp,
      level: Math.floor((prev.totalXP + xp) / 1000) + 1
    }));

    toast({
      title: "🧠 Quiz Mastery!",
      description: `Scored ${score}/5! Earned ${xp} XP and ${coins} coins!`,
    });
  };

  const handlePurchase = (item: any) => {
    if (user.coins >= item.price) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - item.price
      }));
    }
  };

  const handleEquip = (item: any) => {
    // Handle item equipping logic here
    if (item.category === 'avatar') {
      setUser(prev => ({
        ...prev,
        avatar: item.id
      }));
    } else if (item.category === 'theme') {
      // Map theme items to actual theme names
      const themeMap: { [key: string]: string } = {
        'theme-cosmic': 'cosmic',
        'theme-forest': 'forest',
        'theme-ocean': 'ocean',
        'theme-sunset': 'sunset'
      };
      setCurrentTheme(themeMap[item.id] || 'cosmic');
    }
    console.log('Equipped:', item);
  };

  const handleCreateTeam = (teamData: { name: string; type: 'private' | 'public'; description: string }) => {
    // Generate a random invite code
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newTeam = {
      id: `team-${Date.now()}`,
      name: teamData.name,
      type: teamData.type,
      description: teamData.description,
      inviteCode: inviteCode,
      members: [
        {
          id: 'current-user',
          name: user.name,
          level: user.level,
          xp: user.xp,
          streak: user.streak,
          country: '🌍',
          role: 'leader',
          avatar: 'robot'
        }
      ]
    };
    
    setCurrentTeam(newTeam);
    
    toast({
      title: "🎉 Team Created Successfully!",
      description: `Your team "${teamData.name}" is ready! Invite code: ${inviteCode}`,
    });
  };

  const handleJoinTeam = (teamId: string) => {
    // In a real app, this would join an existing team
    toast({
      title: "Join Team",
      description: "Feature coming soon! Use the invite code to join teams.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-white mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading ProductivityCoach</h2>
          <p className="text-white/80">Preparing your focus journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <div className={`min-h-screen backdrop-blur-sm ${theme === 'dark' ? 'bg-black/60' : 'bg-white/20'}`}>
        <div className="container mx-auto p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AI Study Coach</h1>
                <p className="text-white/80">Gamified Focus & Learning Platform</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
                variant="outline"
                className="border-white/20 text-white hover:bg-primary/20"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-secondary hover:bg-secondary/90 text-white shadow-glow"
              >
                <Brain className="w-4 h-4 mr-2" />
                Quick Quiz
              </Button>
              <Button
                onClick={() => setShowTeams(true)}
                variant="outline"
                className="border-white/20 text-white hover:bg-primary/20"
              >
                <Users className="w-4 h-4 mr-2" />
                Teams
              </Button>
              <Button
                onClick={() => setShowLeaderboard(true)}
                variant="outline"
                className="border-white/20 text-white hover:bg-primary/20"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-3 space-y-6">
              {/* User Profile */}
              <UserProfile user={user} />

              {/* Study Timer */}
              <StudyTimer onSessionComplete={handleSessionComplete} />

              {/* Bottom Row - Focus Insights and Team */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <FocusInsights todayStats={todayStats} />
                <TeamOverview 
                  currentTeam={currentTeam}
                  onJoinTeam={handleJoinTeam}
                  onCreateTeam={() => setShowCreateTeam(true)}
                />
              </div>
            </div>

            {/* Sidebar - Shop */}
            <div className="lg:col-span-1">
              <ShopSidebar 
                coins={user.coins}
                onPurchase={handlePurchase}
                onEquip={handleEquip}
              />
            </div>
          </div>

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6">
            <Button
              onClick={() => setShowQuiz(true)}
              size="lg"
              className="rounded-full w-16 h-16 bg-gradient-reward text-white shadow-reward animate-pulse-reward"
            >
              <Sparkles className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        open={showQuiz}
        onOpenChange={setShowQuiz}
        onComplete={handleQuizComplete}
      />

      {/* Create Team Modal */}
      <CreateTeamModal
        open={showCreateTeam}
        onOpenChange={setShowCreateTeam}
        onCreateTeam={handleCreateTeam}
      />

      {/* Teams Modal */}
      <TeamsModal
        open={showTeams}
        onOpenChange={setShowTeams}
        onCreateTeam={() => {
          setShowTeams(false);
          setShowCreateTeam(true);
        }}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        open={showLeaderboard}
        onOpenChange={setShowLeaderboard}
      />
    </div>
  );
};