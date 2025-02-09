
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, Plus, X, Check } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Subjects I Teach</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="p-4 relative hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {subject.name}
                </h3>
                <p className="text-sm text-primary">{subject.gradeLevel}</p>
                <p className="mt-2 text-foreground/80">{subject.description}</p>
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(subject.id)}
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
          </Card>
        )}
      </div>
    </div>
  );
}
