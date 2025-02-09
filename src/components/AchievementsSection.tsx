
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Edit2, Plus, X, Check } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface AchievementsSectionProps {
  initialAchievements: Achievement[];
}

export default function AchievementsSection({
  initialAchievements,
}: AchievementsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleAdd = () => {
    if (newAchievement.title && newAchievement.description) {
      setAchievements([
        ...achievements,
        { ...newAchievement, id: Date.now().toString() },
      ]);
      setNewAchievement({ title: "", description: "", date: "" });
    }
  };

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4" /> Done
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" /> Edit
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className="p-4 relative hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.date}
                </p>
                <p className="mt-2 text-foreground/80">{achievement.description}</p>
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(achievement.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}

        {isEditing && (
          <Card className="p-4 border-2 border-dashed">
            <div className="space-y-4">
              <Input
                placeholder="Achievement title"
                value={newAchievement.title}
                onChange={(e) =>
                  setNewAchievement({ ...newAchievement, title: e.target.value })
                }
              />
              <Input
                placeholder="Date"
                type="date"
                value={newAchievement.date}
                onChange={(e) =>
                  setNewAchievement({ ...newAchievement, date: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={newAchievement.description}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    description: e.target.value,
                  })
                }
              />
              <Button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Achievement
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
