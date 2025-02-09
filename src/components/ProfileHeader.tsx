
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Check } from "lucide-react";

interface ProfileHeaderProps {
  initialData: {
    name: string;
    grade: string;
    bio: string;
    imageUrl: string;
  };
}

export default function ProfileHeader({ initialData }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="text-2xl font-bold"
                placeholder="Your name"
              />
              <Input
                value={data.grade}
                onChange={(e) => setData({ ...data, grade: e.target.value })}
                placeholder="Your grade"
              />
              <Textarea
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                placeholder="Write a short bio"
                className="min-h-[100px]"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{data.name}</h1>
              <p className="text-lg text-muted-foreground">{data.grade}</p>
              <p className="mt-4 text-foreground/80 leading-relaxed">{data.bio}</p>
            </div>
          )}
        </div>
        <div className="ml-6 flex flex-col items-end space-y-4">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-primary"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4" /> Save
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" /> Edit
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
