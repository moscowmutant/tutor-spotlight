
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Plus, Check, GraduationCap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TutoringExperience {
  id: string;
  position: string;
  organization: string;
  period: string;
  description: string;
}

interface TutoringExperienceSectionProps {
  initialExperiences: TutoringExperience[];
}

export default function TutoringExperienceSection({
  initialExperiences,
}: TutoringExperienceSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [newExperience, setNewExperience] = useState({
    position: "",
    organization: "",
    period: "",
    description: "",
  });

  const handleAdd = () => {
    if (newExperience.position && newExperience.organization) {
      setExperiences([
        ...experiences,
        { ...newExperience, id: Date.now().toString() },
      ]);
      setNewExperience({
        position: "",
        organization: "",
        period: "",
        description: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Tutoring Experience
          </h2>
        </div>
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
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="flex gap-4 items-start p-4 bg-secondary/20 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium text-foreground">
                {experience.position}
              </h3>
              <p className="text-sm text-primary">{experience.organization}</p>
              <p className="text-sm text-muted-foreground">{experience.period}</p>
              <p className="mt-2 text-foreground/80">{experience.description}</p>
            </div>
            {isEditing && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(experience.id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}

        {isEditing && (
          <div className="p-4 border-2 border-dashed rounded-lg">
            <div className="space-y-4">
              <Input
                placeholder="Position (e.g., Math Tutor)"
                value={newExperience.position}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    position: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Organization or Institution"
                value={newExperience.organization}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    organization: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Period (e.g., Jan 2023 - Present)"
                value={newExperience.period}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    period: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Description of your tutoring experience..."
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              />
              <Button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
