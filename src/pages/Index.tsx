
import ProfileHeader from "@/components/ProfileHeader";
import AchievementsSection from "@/components/AchievementsSection";
import SubjectsSection from "@/components/SubjectsSection";
import CourseWorkSection from "@/components/CourseWorkSection";

const Index = () => {
  // This would typically come from an API or database
  const mockData = {
    profile: {
      name: "Alex Thompson",
      grade: "11th Grade",
      bio: "Passionate high school student dedicated to helping younger students excel in their studies. Specializing in mathematics and sciences with a track record of academic excellence.",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    achievements: [
      {
        id: "1",
        title: "Mathematics Olympiad - Gold Medal",
        description: "Secured first place in the regional mathematics competition",
        date: "2023-05-15",
      },
      {
        id: "2",
        title: "Science Fair Winner",
        description: "First place in school science fair for physics project",
        date: "2023-03-20",
      },
    ],
    subjects: [
      {
        id: "1",
        name: "Mathematics",
        gradeLevel: "Primary 4-6",
        description: "Algebra, geometry, and basic arithmetic",
      },
      {
        id: "2",
        name: "Science",
        gradeLevel: "Middle School 7-8",
        description: "Physics and chemistry fundamentals",
      },
      {
        id: "3",
        name: "English",
        gradeLevel: "Primary 1-3",
        description: "Reading comprehension and basic writing",
      },
    ],
    courses: [
      {
        id: "1",
        name: "Advanced Placement Calculus AB",
        grade: "A",
        year: "2023-2024",
      },
      {
        id: "2",
        name: "Advanced Placement Physics 1",
        grade: "A",
        year: "2023-2024",
      },
      {
        id: "3",
        name: "Honors Chemistry",
        grade: "A-",
        year: "2022-2023",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-8 px-4">
      <div className="space-y-6 max-w-4xl mx-auto">
        <ProfileHeader initialData={mockData.profile} />
        <CourseWorkSection initialCourses={mockData.courses} />
        <AchievementsSection initialAchievements={mockData.achievements} />
        <SubjectsSection initialSubjects={mockData.subjects} />
      </div>
    </div>
  );
};

export default Index;
