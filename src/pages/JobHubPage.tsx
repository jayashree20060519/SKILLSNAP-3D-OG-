import { useState } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Search, Bookmark, BookmarkCheck, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  requirements: string[];
  applyUrl: string;
  role: string;
}

// Real-looking job data (Note: Real API integration requires external service like Adzuna)
const jobListings: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Flipkart',
    location: 'Bangalore, India',
    salary: '₹25,000 - ₹35,000/month',
    type: 'Internship',
    role: 'Developer',
    posted: '2 days ago',
    description: 'Join our frontend team to build amazing e-commerce experiences. Work with React, TypeScript, and modern web technologies.',
    requirements: ['React.js', 'JavaScript/TypeScript', 'HTML/CSS', 'Git'],
    applyUrl: 'https://www.flipkartcareers.com/',
  },
  {
    id: '2',
    title: 'Software Development Engineer',
    company: 'Amazon',
    location: 'Hyderabad, India',
    salary: '₹15 LPA - ₹25 LPA',
    type: 'Full-time',
    role: 'Developer',
    posted: '1 week ago',
    description: 'Build scalable distributed systems that power Amazon\'s global operations. Work on challenging problems at massive scale.',
    requirements: ['Java/Python', 'Data Structures', 'System Design', 'AWS'],
    applyUrl: 'https://www.amazon.jobs/',
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    company: 'Swiggy',
    location: 'Bangalore, India (Remote)',
    salary: '₹30,000 - ₹40,000/month',
    type: 'Internship',
    role: 'Analyst',
    posted: '3 days ago',
    description: 'Analyze food delivery data to drive business insights. Work with SQL, Python, and visualization tools.',
    requirements: ['SQL', 'Python', 'Excel', 'Data Visualization'],
    applyUrl: 'https://careers.swiggy.com/',
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Paytm',
    location: 'Noida, India',
    salary: '₹8 LPA - ₹15 LPA',
    type: 'Full-time',
    role: 'Developer',
    posted: '5 days ago',
    description: 'Build fintech solutions used by millions. Work on both frontend and backend of payment systems.',
    requirements: ['React', 'Node.js', 'MongoDB', 'RESTful APIs'],
    applyUrl: 'https://paytm.com/careers/',
  },
  {
    id: '5',
    title: 'UX Design Intern',
    company: 'Zomato',
    location: 'Gurgaon, India',
    salary: '₹20,000 - ₹30,000/month',
    type: 'Internship',
    role: 'Designer',
    posted: '1 day ago',
    description: 'Design delightful food ordering experiences. Work with product managers and developers to create user-centric designs.',
    requirements: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
    applyUrl: 'https://www.zomato.com/careers',
  },
  {
    id: '6',
    title: 'Backend Developer',
    company: 'PhonePe',
    location: 'Bangalore, India',
    salary: '₹12 LPA - ₹20 LPA',
    type: 'Full-time',
    role: 'Developer',
    posted: '4 days ago',
    description: 'Build robust backend systems for India\'s leading payment platform. Handle millions of transactions daily.',
    requirements: ['Java/Kotlin', 'Spring Boot', 'Microservices', 'MySQL'],
    applyUrl: 'https://www.phonepe.com/careers/',
  },
  {
    id: '7',
    title: 'Machine Learning Intern',
    company: 'Ola',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹35,000 - ₹50,000/month',
    type: 'Internship',
    role: 'Data Scientist',
    posted: '1 week ago',
    description: 'Work on ML models for ride prediction, pricing, and route optimization. Real-world impact on millions of rides.',
    requirements: ['Python', 'Machine Learning', 'TensorFlow/PyTorch', 'Statistics'],
    applyUrl: 'https://www.olacabs.com/careers',
  },
  {
    id: '8',
    title: 'Cloud Engineer',
    company: 'Razorpay',
    location: 'Bangalore, India',
    salary: '₹10 LPA - ₹18 LPA',
    type: 'Full-time',
    role: 'DevOps',
    posted: '6 days ago',
    description: 'Manage cloud infrastructure for payment processing. Work with AWS, Kubernetes, and DevOps tools.',
    requirements: ['AWS/Azure', 'Kubernetes', 'Docker', 'CI/CD'],
    applyUrl: 'https://razorpay.com/jobs/',
  },
  {
    id: '9',
    title: 'Product Management Intern',
    company: 'Myntra',
    location: 'Bangalore, India',
    salary: '₹30,000 - ₹40,000/month',
    type: 'Internship',
    role: 'Product Manager',
    posted: '2 days ago',
    description: 'Work on fashion e-commerce product features. Collaborate with design and engineering teams.',
    requirements: ['Product Thinking', 'Communication', 'Analytics', 'User Research'],
    applyUrl: 'https://www.myntra.com/careers',
  },
  {
    id: '10',
    title: 'DevOps Engineer',
    company: 'Freshworks',
    location: 'Chennai, India',
    salary: '₹8 LPA - ₹14 LPA',
    type: 'Full-time',
    role: 'DevOps',
    posted: '3 days ago',
    description: 'Automate and optimize SaaS infrastructure. Work with modern DevOps tools and practices.',
    requirements: ['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'AWS'],
    applyUrl: 'https://www.freshworks.com/company/careers/',
  },
  {
    id: '11',
    title: 'Mobile App Developer',
    company: 'CRED',
    location: 'Bangalore, India',
    salary: '₹12 LPA - ₹22 LPA',
    type: 'Full-time',
    role: 'Developer',
    posted: '5 days ago',
    description: 'Build beautiful mobile experiences for credit card management. Work with React Native or native iOS/Android.',
    requirements: ['React Native/Flutter', 'iOS/Android', 'JavaScript', 'REST APIs'],
    applyUrl: 'https://careers.cred.club/',
  },
  {
    id: '12',
    title: 'Content Writer Intern',
    company: 'Unacademy',
    location: 'Remote',
    salary: '₹15,000 - ₹25,000/month',
    type: 'Internship',
    role: 'Content Writer',
    posted: '1 day ago',
    description: 'Create educational content for online learning platform. Write engaging articles and course descriptions.',
    requirements: ['Writing Skills', 'Research', 'SEO', 'Content Strategy'],
    applyUrl: 'https://unacademy.com/careers',
  },
];

export default function JobHubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        toast.success('Job removed from saved');
        return prev.filter(id => id !== jobId);
      } else {
        toast.success('Job saved successfully!');
        return [...prev, jobId];
      }
    });
  };

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || job.type === filterType;
    const matchesRole = filterRole === 'All' || job.role === filterRole;
    const matchesLocation = filterLocation === 'All' || job.location.includes(filterLocation);
    
    return matchesSearch && matchesType && matchesRole && matchesLocation;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Job Hub</h1>
          <p className="text-muted-foreground">
            Discover internships and job opportunities from top companies
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Note: These are curated job listings. Click "Apply Now" to visit company career pages.
          </p>
        </div>

        {/* Search and Filter */}
        <Card3D hover={false} className="mb-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2 flex-1">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              {/* Job Type Filter */}
              <div className="flex gap-2">
                {['All', 'Internship', 'Full-time'].map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? 'default' : 'outline'}
                    onClick={() => setFilterType(type)}
                    size="sm"
                  >
                    {type}
                  </Button>
                ))}
              </div>
              
              {/* Role Filter */}
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                  <SelectItem value="Product Manager">Product Manager</SelectItem>
                  <SelectItem value="Content Writer">Content Writer</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Location Filter */}
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Locations</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Gurgaon">Gurgaon</SelectItem>
                  <SelectItem value="Noida">Noida</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card3D>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          {savedJobs.length > 0 && ` • ${savedJobs.length} saved`}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card3D hover={false} className="text-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No jobs found matching your criteria</p>
            </Card3D>
          ) : (
            filteredJobs.map((job) => (
              <Card3D key={job.id} hover={false}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
                      <p className="text-lg text-primary font-semibold">{job.company}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.type === 'Internship'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'bg-green-500/10 text-green-600'
                      }`}
                    >
                      {job.type}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Posted {job.posted}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{job.description}</p>

                  {/* Requirements */}
                  <div>
                    <p className="font-semibold mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent rounded-full text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t flex gap-3">
                    <Button asChild className="flex-1 gap-2">
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleSaveJob(job.id)}
                      className={savedJobs.includes(job.id) ? 'bg-primary/10 border-primary' : ''}
                    >
                      {savedJobs.includes(job.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card3D>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-8">
          <Card3D hover={false} className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold">{filteredJobs.length}</p>
              <p className="text-muted-foreground">
                {filterType === 'All' ? 'Total Opportunities' : `${filterType} Positions`}
              </p>
            </div>
          </Card3D>
        </div>
      </div>
    </Layout>
  );
}
