import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import EditAbout from "@/components/about/EditAbout";
import { ImageUpload } from "@/components/common/ImageUpload";

export default function About() {
  const defaultAbout = {
    title: "About Me",
    image: "/lovable-uploads/357ea9c5-6a81-4980-afb3-0dda40df4919.png",
    paragraphs: [
      "I’m a data analyst with over a year of experience working with tools like Power BI, SQL, Excel, and R to uncover insights that support smarter business decisions. I enjoy solving problems through data and bringing clarity to complex information.",
      "Outside of my analytics work, I have a growing interest in fashion modeling and am currently building my portfolio. It’s a creative outlet that complements my analytical side and allows me to explore a different form of expression."
    ],
    tags: [
      "Fashion Modeling",
      "Data Analysis", 
      "Photography",
      "Power BI",
      "SQL"
    ]
  };

  const [about, setAbout] = useState(defaultAbout);
  const [editOpen, setEditOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAdmin(isLoggedIn);
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

  const skills = [
    {
      category: "Fashion",
      items: [
        { name: "Editorial Modeling", level: 95 },
        { name: "Commercial Modeling", level: 90 },
        { name: "Fashion Photography", level: 85 },
        { name: "Runway", level: 80 },
      ]
    },
    {
      category: "Data Analysis",
      items: [
        { name: "Power BI", level: 85 },
        { name: "SQL", level: 80 },
        { name: "DAX", level: 80 },
        { name: "Microsoft Excel", level: 80 },
        { name: "ETL", level: 75 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-gradient-to-r from-fashion-beige to-data-lightblue/30">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/lovable-uploads/7e04893a-ef02-44c6-96ad-5e68880373bb.png"
              alt="About Hero"
              className="w-full h-full object-cover object-center opacity-20"
            />
          </div>
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold">About Me</h1>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <img
                    src={about.image}
                    alt="Portrait"
                    className="rounded-lg w-full max-w-md shadow-lg mx-auto"
                  />
                  {isAdmin && (
                    <button
                      aria-label="Edit about image"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full shadow p-2"
                      onClick={() => setEditOpen(true)}
                    >
                      <Edit className="h-5 w-5 text-data-blue" />
                    </button>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-3xl font-serif">{about.title}</h2>
                  {isAdmin && (
                    <button
                      aria-label="Edit about content"
                      className="ml-1 p-2 rounded-full bg-white/80 hover:bg-white shadow"
                      onClick={() => setEditOpen(true)}
                    >
                      <Edit className="w-5 h-5 text-data-blue" />
                    </button>
                  )}
                </div>
                {about.paragraphs.map((p, idx) => (
                  <p key={idx} className="mb-4 text-gray-700">{p}</p>
                ))}
                <div className="flex flex-wrap gap-3 mt-4">
                  {about.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={tag === "Fashion Modeling" || tag === "Photography"
                        ? "px-3 py-1 bg-fashion-beige text-fashion-charcoal rounded-full text-sm"
                        : "px-3 py-1 bg-data-lightblue text-data-navy rounded-full text-sm"}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <EditAbout
              open={editOpen}
              onOpenChange={setEditOpen}
              aboutData={about}
              onSave={setAbout}
            />

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-serif mb-8 text-center">Skills & Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {skills.map((skillGroup, groupIndex) => (
                  <div key={groupIndex}>
                    <h3 className="text-2xl font-serif mb-6">{skillGroup.category}</h3>
                    <div className="space-y-6">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm font-medium">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <motion.div 
                              className={`skill-progress ${
                                skillGroup.category === "Fashion" 
                                  ? "bg-fashion-taupe" 
                                  : "bg-data-blue"
                              }`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.1 * skillIndex }}
                              viewport={{ once: true }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Education & Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-3xl font-serif mb-8 text-center">Education & Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Education */}
                <div>
                  <h3 className="text-2xl font-serif mb-6">Education</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-fashion-taupe pl-4 py-2">
                      <h4 className="font-medium">Bachelor Of Engineering In Computer Science</h4>
                      <p className="text-gray-600">P.A College Of Engineering, 2019-2023</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Specialized in Data Science and data visualization
                      </p>
                    </div>
                    <div className="border-l-4 border-fashion-taupe pl-4 py-2">
                      <h4 className="font-medium">Computer Scicnce</h4>
                      <p className="text-gray-600">Kerala Higher Secondary Education, 2017-2019</p>
                      <p className="text-sm text-gray-700 mt-2">Acquired a solid foundation in Computer Science
                      </p>
                    </div>
                
                  </div>
                </div>
                
                {/* Experience */}
                <div>
                  <h3 className="text-2xl font-serif mb-6">Experience</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-data-teal pl-4 py-2">
                      <h4 className="font-medium">BI Analyst & Software Support</h4>
                      <p className="text-gray-600">Safecare Technology, 2024-Present</p>
                      <p className="text-sm text-gray-700 mt-2">
                      Utilized MySQL for database management, ensuring data integrity and optimal performance.<br/> 
                      • Developed and maintained applications using Java, enhancing system functionality and user experience <br/>
                      • Designed Power BI dashboards to analyze financial, insurance, and medical data for business decision-making<br/>
                      </p>
                    </div>
                    <div className="border-l-4 border-data-teal pl-4 py-2">
                      <h4 className="font-medium">Data Science Intern</h4>
                      <p className="text-gray-600">Codelab Systems, 08/2022 - 09/2022</p>
                      <p className="text-sm text-gray-700 mt-2">• Assisting with data collection and data cleaning. Engaged in exploratory data analysis to identify trends, patterns, and outliers for actionable recommendation. 
                  
                      </p>
                    </div>
                    <div className="border-l-4 border-data-teal pl-4 py-2">
                      <h4 className="font-medium">Freelance Modeling</h4>
                      <p className="text-gray-600">Freelance</p>
                      <p className="text-sm text-gray-700 mt-2">Focused on delivering style and energy in every shoot, doing it as a hobby.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
