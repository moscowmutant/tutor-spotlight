
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, Smile, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Hobby {
  id: string;
  name: string;
  description: string;
}

interface HobbiesSectionProps {
  initialHobbies: Hobby[];
}

export default function HobbiesSection({ initialHobbies }: HobbiesSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [hobbies, setHobbies] = useState(initialHobbies);

  const handleAddHobby = () => {
    setHobbies([
      ...hobbies,
      {
        id: crypto.randomUUID(),
        name: "New Hobby",
        description: "Description of your hobby",
      },
    ]);
  };

  const handleUpdateHobby = (id: string, field: keyof Hobby, value: string) => {
    setHobbies(
      hobbies.map((hobby) =>
        hobby.id === id ? { ...hobby, [field]: value } : hobby
      )
    );
  };

  const handleDeleteHobby = (id: string) => {
    setHobbies(hobbies.filter((hobby) => hobby.id !== id));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Hobbies & Fun Facts
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
        {hobbies.map((hobby) => (
          <div
            key={hobby.id}
            className="flex gap-4 items-start p-4 bg-secondary/20 rounded-lg"
          >
            {isEditing ? (
              <div className="flex-1 space-y-2">
                <div className="flex gap-4 items-center">
                  <Input
                    value={hobby.name}
                    onChange={(e) =>
                      handleUpdateHobby(hobby.id, "name", e.target.value)
                    }
                    placeholder="Hobby name"
                    className="flex-1"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteHobby(hobby.id)}
                  >
                    Delete
                  </Button>
                </div>
                <Textarea
                  value={hobby.description}
                  onChange={(e) =>
                    handleUpdateHobby(hobby.id, "description", e.target.value)
                  }
                  placeholder="Tell us more about this hobby..."
                  className="w-full"
                />
              </div>
            ) : (
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <h3 className="font-medium text-foreground">{hobby.name}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {hobby.description}
                </p>
              </div>
            )}
          </div>
        ))}

        {isEditing && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleAddHobby}
          >
            Add Hobby
          </Button>
        )}
      </div>
    </div>
  );
}
