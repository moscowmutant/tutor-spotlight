
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book } from "lucide-react";
import { Edit2, Plus, Check } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  gradeLevel: string;
  description: string;
}

interface SubjectsSectionProps {
  initialSubjects: Subject[];
}

export default function SubjectsSection({
  initialSubjects,
}: SubjectsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [newSubject, setNewSubject] = useState({
    name: "",
    gradeLevel: "",
    description: "",
  });

  const gradeLevels = [
    "Primary 1-3",
    "Primary 4-6",
    "Middle School 7-8",
    "Middle School 9",
  ];

  const handleAdd = () => {
    if (newSubject.name && newSubject.gradeLevel) {
      setSubjects([...subjects, { ...newSubject, id: Date.now().toString() }]);
      setNewSubject({ name: "", gradeLevel: "", description: "" });
    }
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Subjects I Teach
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
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="flex gap-4 items-start p-4 bg-secondary/20 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{subject.name}</h3>
              <p className="text-sm text-primary">{subject.gradeLevel}</p>
              <p className="mt-2 text-foreground/80">{subject.description}</p>
            </div>
            {isEditing && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(subject.id)}
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
                placeholder="Subject name"
                value={newSubject.name}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, name: e.target.value })
                }
              />
              <Select
                value={newSubject.gradeLevel}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, gradeLevel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Description"
                value={newSubject.description}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, description: e.target.value })
                }
              />
              <Button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Subject
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
