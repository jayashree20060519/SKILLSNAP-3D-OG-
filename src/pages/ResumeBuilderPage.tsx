import { useState } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Download, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    technologies: string;
    description: string;
  }>;
  skills: string[];
}

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
    },
    summary: '',
    education: [{ degree: '', institution: '', year: '', gpa: '' }],
    experience: [{ title: '', company: '', duration: '', description: '' }],
    projects: [{ name: '', technologies: '', description: '' }],
    skills: [],
  });

  const [skillInput, setSkillInput] = useState('');

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: '', institution: '', year: '', gpa: '' }],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  const removeEducation = (index: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { title: '', company: '', duration: '', description: '' }],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { name: '', technologies: '', description: '' }],
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const removeProject = (index: number) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  const downloadPDF = () => {
    // Create a simple HTML representation for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      toast.error('Please allow popups to download PDF');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.personalInfo.name} - Resume</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #3b82f6; margin-bottom: 5px; }
          h2 { color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 5px; margin-top: 20px; }
          .contact { color: #666; margin-bottom: 20px; }
          .section { margin-bottom: 20px; }
          .item { margin-bottom: 15px; }
          .item-title { font-weight: bold; color: #333; }
          .item-subtitle { color: #666; font-style: italic; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-tag { background: #e0f2fe; padding: 5px 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>${resumeData.personalInfo.name}</h1>
        <div class="contact">
          ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}<br/>
          ${resumeData.personalInfo.linkedin ? `LinkedIn: ${resumeData.personalInfo.linkedin} | ` : ''}
          ${resumeData.personalInfo.github ? `GitHub: ${resumeData.personalInfo.github}` : ''}
        </div>
        
        ${resumeData.summary ? `
          <h2>Professional Summary</h2>
          <p>${resumeData.summary}</p>
        ` : ''}
        
        <h2>Education</h2>
        ${resumeData.education.map(edu => `
          <div class="item">
            <div class="item-title">${edu.degree}</div>
            <div class="item-subtitle">${edu.institution} | ${edu.year} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
          </div>
        `).join('')}
        
        ${resumeData.experience.length > 0 && resumeData.experience[0].title ? `
          <h2>Experience</h2>
          ${resumeData.experience.map(exp => `
            <div class="item">
              <div class="item-title">${exp.title}</div>
              <div class="item-subtitle">${exp.company} | ${exp.duration}</div>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        ` : ''}
        
        ${resumeData.projects.length > 0 && resumeData.projects[0].name ? `
          <h2>Projects</h2>
          ${resumeData.projects.map(proj => `
            <div class="item">
              <div class="item-title">${proj.name}</div>
              <div class="item-subtitle">${proj.technologies}</div>
              <p>${proj.description}</p>
            </div>
          `).join('')}
        ` : ''}
        
        ${resumeData.skills.length > 0 ? `
          <h2>Skills</h2>
          <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>
        ` : ''}
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
    toast.success('Resume ready for download! Use Print > Save as PDF');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">Create your professional resume in minutes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={resumeData.personalInfo.github}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      placeholder="github.com/johndoe"
                    />
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Professional Summary */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
              <Textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                placeholder="Brief overview of your professional background and career objectives..."
                rows={4}
              />
            </Card3D>

            {/* Education */}
            <Card3D hover={false}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Education</h2>
                <Button onClick={addEducation} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <Label>Education {index + 1}</Label>
                      {resumeData.education.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Degree (e.g., B.Sc. Computer Science)"
                    />
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="Institution Name"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={edu.year}
                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        placeholder="Year (e.g., 2020-2024)"
                      />
                      <Input
                        value={edu.gpa}
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        placeholder="GPA (optional)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Experience */}
            <Card3D hover={false}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Experience</h2>
                <Button onClick={addExperience} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <Label>Experience {index + 1}</Label>
                      {resumeData.experience.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      placeholder="Job Title"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                    <Input
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="Duration (e.g., Jan 2023 - Present)"
                    />
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Projects */}
            <Card3D hover={false}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Projects</h2>
                <Button onClick={addProject} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-4">
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <Label>Project {index + 1}</Label>
                      {resumeData.projects.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={proj.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      placeholder="Project Name"
                    />
                    <Input
                      value={proj.technologies}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                    />
                    <Textarea
                      value={proj.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      placeholder="Project description and your contributions..."
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Skills */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill (e.g., Python, React, Communication)"
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-accent rounded-full"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card3D>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-4 h-fit">
            <Card3D hover={false} className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Live Preview
                </h2>
                <Button onClick={downloadPDF} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              <div className="space-y-6 text-sm">
                {/* Preview Personal Info */}
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-1">
                    {resumeData.personalInfo.name || 'Your Name'}
                  </h1>
                  <div className="text-muted-foreground space-y-1">
                    <p>{resumeData.personalInfo.email || 'email@example.com'} | {resumeData.personalInfo.phone || '+1 234 567 8900'}</p>
                    {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
                    {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
                      <p>
                        {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                        {resumeData.personalInfo.linkedin && resumeData.personalInfo.github && ' | '}
                        {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview Summary */}
                {resumeData.summary && (
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-2 border-b-2 border-secondary pb-1">
                      Professional Summary
                    </h2>
                    <p className="text-muted-foreground">{resumeData.summary}</p>
                  </div>
                )}

                {/* Preview Education */}
                <div>
                  <h2 className="text-xl font-bold text-secondary mb-2 border-b-2 border-secondary pb-1">
                    Education
                  </h2>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <p className="font-semibold">{edu.degree || 'Degree Name'}</p>
                      <p className="text-muted-foreground italic">
                        {edu.institution || 'Institution Name'} | {edu.year || 'Year'}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Preview Experience */}
                {resumeData.experience.some(exp => exp.title) && (
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-2 border-b-2 border-secondary pb-1">
                      Experience
                    </h2>
                    {resumeData.experience.filter(exp => exp.title).map((exp, index) => (
                      <div key={index} className="mb-3">
                        <p className="font-semibold">{exp.title}</p>
                        <p className="text-muted-foreground italic">{exp.company} | {exp.duration}</p>
                        {exp.description && <p className="mt-1 text-muted-foreground">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Preview Projects */}
                {resumeData.projects.some(proj => proj.name) && (
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-2 border-b-2 border-secondary pb-1">
                      Projects
                    </h2>
                    {resumeData.projects.filter(proj => proj.name).map((proj, index) => (
                      <div key={index} className="mb-3">
                        <p className="font-semibold">{proj.name}</p>
                        {proj.technologies && <p className="text-muted-foreground italic">{proj.technologies}</p>}
                        {proj.description && <p className="mt-1 text-muted-foreground">{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Preview Skills */}
                {resumeData.skills.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-2 border-b-2 border-secondary pb-1">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-accent rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </Layout>
  );
}
