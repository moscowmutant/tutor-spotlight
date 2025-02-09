
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, Book } from "lucide-react";

interface Course {
  id: string;
  name: string;
  grade: string;
  year: string;
}

interface CourseWorkSectionProps {
  initialCourses: Course[];
}

export default function CourseWorkSection({ initialCourses }: CourseWorkSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState(initialCourses);

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: crypto.randomUUID(),
        name: "New Course",
        grade: "A",
        year: "2023-2024",
      },
    ]);
  };

  const handleUpdateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Course Work</h2>
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
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex gap-4 items-center p-4 bg-secondary/20 rounded-lg"
          >
            {isEditing ? (
              <>
                <Input
                  value={course.name}
                  onChange={(e) =>
                    handleUpdateCourse(course.id, "name", e.target.value)
                  }
                  placeholder="Course name"
                  className="flex-1"
                />
                <Input
                  value={course.grade}
                  onChange={(e) =>
                    handleUpdateCourse(course.id, "grade", e.target.value)
                  }
                  placeholder="Grade"
                  className="w-24"
                />
                <Input
                  value={course.year}
                  onChange={(e) =>
                    handleUpdateCourse(course.id, "year", e.target.value)
                  }
                  placeholder="Academic year"
                  className="w-32"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.year}</p>
                </div>
                <div className="text-primary font-semibold">{course.grade}</div>
              </>
            )}
          </div>
        ))}

        {isEditing && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        )}
      </div>
    </div>
  );
}
