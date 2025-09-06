import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, Crown, Trophy, UserPlus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import avatarRobot from '@/assets/avatar-robot.png';
import avatarWizard from '@/assets/avatar-wizard.png';

interface TeamsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTeam: () => void;
}

const mockTeams = [
  {
    id: '1',
    name: 'Focus Warriors',
    type: 'private',
    members: 12,
    level: 25,
    xp: 15420,
    leader: 'Alex Chen',
    leaderAvatar: avatarRobot,
    description: 'Elite study group focused on productivity'
  },
  {
    id: '2',
    name: 'Study Squad',
    type: 'public',
    members: 8,
    level: 18,
    xp: 9800,
    leader: 'Sarah Kim',
    leaderAvatar: avatarWizard,
    description: 'Friendly group for collaborative learning'
  },
  {
    id: '3',
    name: 'Brain Boosters',
    type: 'public',
    members: 15,
    level: 30,
    xp: 22000,
    leader: 'Mike Johnson',
    leaderAvatar: avatarRobot,
    description: 'Advanced learners pushing boundaries'
  }
];

export const TeamsModal = ({ open, onOpenChange, onCreateTeam }: TeamsModalProps) => {
  const { toast } = useToast();

  const handleJoinTeam = (teamId: string) => {
    toast({
      title: "Team Join Request",
      description: "Request sent! The team leader will review your application.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gradient-secondary text-white border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Users className="w-8 h-8 mr-3 text-accent" />
            Study Teams
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            <Button
              onClick={onCreateTeam}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTeams.map((team) => (
              <Card key={team.id} className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{team.name}</h3>
                    <Badge variant={team.type === 'private' ? 'outline' : 'default'} className="text-xs">
                      {team.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-white/80">{team.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={team.leaderAvatar} />
                      <AvatarFallback>{team.leader.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{team.leader}</p>
                      <p className="text-xs text-white/60">Leader</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{team.members}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>Lv.{team.level}</span>
                      </div>
                    </div>
                    <span className="text-accent font-bold">{team.xp.toLocaleString()} XP</span>
                  </div>
                  
                  <Button
                    onClick={() => handleJoinTeam(team.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="sm"
                  >
                    Join Team
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
