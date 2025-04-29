import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/data/ProjectCard";
import { SkillsSection } from "@/components/data/SkillsSection";
import { ImageUpload } from "@/components/common/ImageUpload";

export default function Data() {
  const [isAdmin, setIsAdmin] = useState(false);

  const barData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 25 },
    { name: 'Apr', value: 18 },
    { name: 'May', value: 29 },
    { name: 'Jun', value: 34 },
  ];

  const lineData = [
    { name: 'Week 1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Week 2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Week 3', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Week 4', uv: 2780, pv: 3908, amt: 2000 },
  ];

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const dataProjects = [
    {
      id: 1,
      title: "Clinical Analysis Report - Cortex",
      category: "Data Analysis",
      description: "Designed and maintained dynamic Power BI dashboards to visualize clinic performance, patient trends, and financial data. Integrated MySQL data into a streamlined model to uncover actionable insights. Played a key role in identifying patterns behind insurance claim rejections, helping the team fix root issues and boost efficiency in the claims process.",
      tools: "Power BI, DAX, MySQL, Data Modeling",
      year: "2023",
      image: "/placeholder.svg",
      url: "https://app.powerbi.com/view?r=eyJrIjoiYWU1ZDUyZTEtZDAxNS00ZWNjLTkwMzctNjA1MGI2NzA1MTEyIiwidCI6IjhjZWJiMzY0LTIyMTItNGEzOS05ZjE2LWIwYTJmMjk3ZDc0YiIsImMiOjZ9",
      urlMask: "View Analysis"
    },
    {
      id: 2,
      title: "Emission Insights",
      category: "Root Cause Analysis",
      description: "Developed a dynamic Power BI Dashboard focused on analyzing and visualizing vehicle CO2 emissions based on fuel type, Powertrain. Empowered stakeholders to make informed decisions regarding emission reduction strategies and sustainable vehicle options.",
      tools: "Power BI, Root Cause Analysis, Microsoft Excel, PowerQuery",
      year: "2024",
      image: "/placeholder.svg",
      url: "https://app.powerbi.com/view?r=eyJrIjoiNDMzNjMwYzktZGZmMC00MDZiLThlMjUtZjk5MDhiM2UwODM5IiwidCI6ImQ2YTE5N2FlLTQ1Y2YtNGM4Yy05MTAyLWY2YWY5NDg4NWVkMiJ9",
      urlMask: "View Model"
    },
    {
      id: 3,
      title: "workforce analytics",
      category: "Data Visualization",
      description: "Analyzed sick leave data to understand patterns and trends. Examined working preferences of individuals within the organization. Provided insights into sick leave percentages for strategic workforce planning. Identified factors influencing absenteeism and potential areas for improvement",
      tools: "Power BI, Microsoft Excel, Power Query, DAX",
      year: "2023",
      image: "/placeholder.svg",
      url: "https://app.powerbi.com/view?r=eyJrIjoiODBlY2E5NDYtOWQ4ZS00OTBkLWJkZDktOTVhYmRkZjNiN2ExIiwidCI6ImQ2YTE5N2FlLTQ1Y2YtNGM4Yy05MTAyLWY2YWY5NDg4NWVkMiJ9",
      urlMask: "View Dashboard"
    },
    {
      id: 4,
      title: "Social Media Sentiment Analysis",
      category: "NLP",
      description: "Performed sentiment analysis on social media data to gauge public perception of fashion brands. Used natural language processing techniques to analyze thousands of comments and posts, providing actionable insights to marketing teams.",
      tools: "Python, NLTK, spaCy, TensorFlow",
      year: "2021",
      image: "/placeholder.svg",
      url: "https://example.com/sentiment-analysis",
      urlMask: "View Analysis"
    },
    {
      id: 5,
      title: "Retail Store Performance Analysis",
      category: "Data Analysis",
      description: "Analyzed performance metrics across 50+ retail locations to identify key factors affecting sales. Created a scoring model that helped optimize store layouts and product placement, resulting in a 15% increase in revenue.",
      tools: "Python, SQL, Power BI, Excel",
      year: "2022",
      image: "/placeholder.svg",
      url: "https://example.com/retail-performance",
      urlMask: "View Report"
    }
  ];

  const [profile, setProfile] = useState({
    name: "Fayaz Mohamed",
    role: "Data Analyst",
    img: "/lovable-uploads/effb464c-46e9-4f0e-9149-8adb1d3b1d22.png",
    about: "Experienced Data Analyst with a passion for deriving actionable insights from complex data."
  });
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [skills, setSkills] = useState({
    languages: [
      
      "R (tidyverse, ggplot2)",
      "SQL (PostgreSQL, MySQL)",
      "DAX (Power BI)"
      
    ],
    methods: [
      "Statistical Analysis",
      "Time Series Analysis",
      "Root Cause Analysis"
    ],
    tools: [
      "Tableau",
      "Power BI",
      "Micrsoft Excel"
    ]
  });
  const [showSkillsEdit, setShowSkillsEdit] = useState(false);
  const [languagesInput, setLanguagesInput] = useState(skills.languages.join("\n"));
  const [methodsInput, setMethodsInput] = useState(skills.methods.join("\n"));
  const [toolsInput, setToolsInput] = useState(skills.tools.join("\n"));
  const [profileImage, setProfileImage] = useState(profile.img);
  const [projectImage, setProjectImage] = useState("");
  const [showProjectImageModal, setShowProjectImageModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAdmin(isLoggedIn);
    };

    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    
    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, []);

  useEffect(() => {
    setLanguagesInput(skills.languages.join("\n"));
    setMethodsInput(skills.methods.join("\n"));
    setToolsInput(skills.tools.join("\n"));
  }, [skills]);

  const handleProjectUpdate = (updatedProject: any) => {
    const updatedProjects = dataProjects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    console.log("Project updated:", updatedProject);
    
    if (updatedProject.requestImageEdit) {
      setEditingProject(updatedProject);
      setProjectImage(updatedProject.image || "");
      setShowProjectImageModal(true);
      return;
    }
  };

  const handleSaveProjectImage = () => {
    if (!editingProject) return;
    
    const updatedProject = { ...editingProject, image: projectImage };
    delete updatedProject.requestImageEdit;
    
    const updatedProjects = dataProjects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    
    console.log("Project image updated:", updatedProject);
    setShowProjectImageModal(false);
    setEditingProject(null);
    
    toast({
      title: "Project image updated",
      description: "The project image has been updated successfully."
    });
  };

  const handleProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    setProfile({
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      img: profileImage,
      about: formData.get('about') as string,
    });
    
    setShowProfileEdit(false);
    toast({
      title: "Profile Updated",
      description: "Your profile info has been updated."
    });
  };

  const handleSkillsEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSkills({
      languages: languagesInput.split("\n").filter(l => l.trim() !== ""),
      methods: methodsInput.split("\n").filter(m => m.trim() !== ""),
      tools: toolsInput.split("\n").filter(t => t.trim() !== "")
    });
    
    setShowSkillsEdit(false);
    toast({
      title: "Skills Updated",
      description: "Your skills info has been updated."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="relative h-[50vh] mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-data-navy/10 via-data-lightblue/20 to-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          </div>
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-data-navy via-data-blue to-data-teal"
              >
                Data Analysis Projects
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground leading-relaxed"
              >
                Exploring complex datasets to extract meaningful insights
                using Python, SQL, R, and visualization tools.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-card backdrop-blur-sm border-y border-border">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start px-4">
            <div className="flex flex-col sm:flex-row items-start gap-6 w-full md:w-auto">
              <div className="relative">
                <img
                  src={profile.img}
                  alt="Profile"
                  className="rounded-full w-24 sm:w-32 h-24 sm:h-32 object-cover border-4 border-primary/20 shadow-xl"
                />
                {isAdmin && (
                  <Button
                    onClick={() => setShowProfileEdit(true)}
                    variant="outline"
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full shadow-lg bg-background hover:bg-accent"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground">{profile.name}</h2>
                <p className="mb-2 text-lg text-primary">{profile.role}</p>
                <p className="text-muted-foreground max-w-md">{profile.about}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <SkillsSection 
            skills={skills}
            isAdmin={isAdmin}
            onEdit={() => setShowSkillsEdit(true)}
          />
        </section>

        <section className="section-padding bg-accent/10">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-serif mb-12 text-center text-foreground"
            >
              Featured Data Projects
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dataProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                  onUpdate={handleProjectUpdate}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Dialog open={showProfileEdit} onOpenChange={setShowProfileEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile information here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileEdit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input name="name" defaultValue={profile.name} className="w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <Input name="role" defaultValue={profile.role} className="w-full" />
            </div>
            <ImageUpload 
              value={profileImage} 
              onChange={setProfileImage} 
              label="Profile Image"
              allowedTypes={["image/jpeg", "image/png", "image/webp"]}
              maxSizeMB={2}
            />
            <div>
              <label className="block mb-1 font-medium">About You</label>
              <Textarea name="about" defaultValue={profile.about} rows={3} className="w-full" />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowProfileEdit(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSkillsEdit} onOpenChange={setShowSkillsEdit}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Skills & Toolkit</DialogTitle>
            <DialogDescription>
              Update your skills by adding or removing items. Each skill should be on a new line.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSkillsEdit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Programming Languages</label>
              <Textarea
                value={languagesInput}
                onChange={e => setLanguagesInput(e.target.value)}
                className="w-full min-h-[120px]"
                placeholder="Each language on a new line"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Analysis Methods</label>
              <Textarea
                value={methodsInput}
                onChange={e => setMethodsInput(e.target.value)}
                className="w-full min-h-[120px]"
                placeholder="Each method on a new line"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Visualization Tools</label>
              <Textarea
                value={toolsInput}
                onChange={e => setToolsInput(e.target.value)}
                className="w-full min-h-[120px]"
                placeholder="Each tool on a new line"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowSkillsEdit(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showProjectImageModal} onOpenChange={setShowProjectImageModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Project Image</DialogTitle>
            <DialogDescription>
              Upload or update the image for this project.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <ImageUpload 
              value={projectImage} 
              onChange={setProjectImage} 
              label="Project Image"
              maxSizeMB={3}
              allowedTypes={["image/jpeg", "image/png", "image/webp", "image/gif"]}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowProjectImageModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProjectImage}>
                Save Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
}
