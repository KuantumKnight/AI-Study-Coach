import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Crown, Medal, Award, Calendar } from 'lucide-react';
import avatarRobot from '@/assets/avatar-robot.png';
import avatarWizard from '@/assets/avatar-wizard.png';

interface LeaderboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockLeaderboard = [
  {
    id: '1',
    name: 'Alex Chen',
    level: 25,
    xp: 15420,
    streak: 12,
    country: '🇺🇸',
    avatar: avatarRobot,
    rank: 1,
    weeklyXP: 2500
  },
  {
    id: '2',
    name: 'Sarah Kim',
    level: 22,
    xp: 14200,
    streak: 8,
    country: '🇰🇷',
    avatar: avatarWizard,
    rank: 2,
    weeklyXP: 2200
  },
  {
    id: '3',
    name: 'Mike Johnson',
    level: 20,
    xp: 12800,
    streak: 15,
    country: '🇬🇧',
    avatar: avatarRobot,
    rank: 3,
    weeklyXP: 2100
  },
  {
    id: '4',
    name: 'You',
    level: 1,
    xp: 0,
    streak: 0,
    country: '🌍',
    avatar: avatarRobot,
    rank: 4,
    weeklyXP: 0
  },
  {
    id: '5',
    name: 'Emma Wilson',
    level: 18,
    xp: 11200,
    streak: 6,
    country: '🇦🇺',
    avatar: avatarWizard,
    rank: 5,
    weeklyXP: 1800
  }
];

export const LeaderboardModal = ({ open, onOpenChange }: LeaderboardModalProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-white/60">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black';
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gradient-primary text-white border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Trophy className="w-8 h-8 mr-3 text-accent" />
            Global Leaderboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-accent text-accent">
                <Calendar className="w-3 h-3 mr-1" />
                This Week
              </Badge>
              <span className="text-sm text-white/80">Updated 2 hours ago</span>
            </div>
          </div>

          <div className="space-y-3">
            {mockLeaderboard.map((player, index) => (
              <Card 
                key={player.id} 
                className={`p-4 backdrop-blur-sm border-white/20 transition-all hover:scale-105 ${
                  player.name === 'You' ? 'ring-2 ring-accent' : ''
                }`}
              >
                <div className={`p-4 rounded-lg ${getRankColor(player.rank)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(player.rank)}
                        <span className="text-lg font-bold">#{player.rank}</span>
                      </div>
                      
                      <Avatar className="w-12 h-12 border-2 border-white/20">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{player.name}</h3>
                          <span className="text-sm">{player.country}</span>
                          {player.name === 'You' && (
                            <Badge variant="outline" className="border-accent text-accent text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm opacity-90">
                          <span>Level {player.level}</span>
                          <span>{player.streak} day streak</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold">{player.xp.toLocaleString()} XP</div>
                      <div className="text-sm opacity-90">+{player.weeklyXP} this week</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-white/80">
              Rankings are updated every hour. Keep studying to climb the leaderboard!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
