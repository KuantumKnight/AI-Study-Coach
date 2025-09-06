import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Users, Lock, Globe, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTeam: (teamData: { name: string; type: 'private' | 'public'; description: string }) => void;
}

export const CreateTeamModal = ({ open, onOpenChange, onCreateTeam }: CreateTeamModalProps) => {
  const [teamName, setTeamName] = useState('');
  const [teamType, setTeamType] = useState<'private' | 'public'>('private');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast({
        title: "Team name required",
        description: "Please enter a team name to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      onCreateTeam({
        name: teamName.trim(),
        type: teamType,
        description: description.trim()
      });
      
      toast({
        title: "🎉 Team Created!",
        description: `${teamName} is ready for members to join!`,
      });
      
      // Reset form
      setTeamName('');
      setTeamType('private');
      setDescription('');
      setIsCreating(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleClose = () => {
    if (!isCreating) {
      setTeamName('');
      setTeamType('private');
      setDescription('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gradient-secondary text-white border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Users className="w-8 h-8 mr-3 text-accent" />
            Create Study Team
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamName" className="text-sm font-medium">
                  Team Name *
                </Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Study Warriors, Focus Squad"
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  disabled={isCreating}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Team Type</Label>
                <Select value={teamType} onValueChange={(value: 'private' | 'public') => setTeamType(value)} disabled={isCreating}>
                  <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Private Team
                      </div>
                    </SelectItem>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Public Team
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's your team about?"
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  disabled={isCreating}
                />
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Your team will get a unique invite code to share with friends!</span>
            </div>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="border-white/20 text-white hover:bg-primary/20"
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTeam}
              disabled={isCreating || !teamName.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-reward"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  Create Team
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
