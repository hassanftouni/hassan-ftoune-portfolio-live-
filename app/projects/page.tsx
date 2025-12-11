import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLink, Microscope, Github, Calendar, Clock, Code, Brain, Cpu, Rocket } from 'lucide-react'
import { AnimatedBackground } from '@/components/3d/animated-background'

export const metadata: Metadata = {
  title: 'Projects | Hassan Ftouni - Full Stack Developer & Designer',
  description: 'A curated collection of AI/ML projects and full-stack applications. Highlighting technical proficiency and innovative problem-solving.',
}

// Updated project list with live links from freelancer.com
const projects = [
   {
    id: 'AI-Powered Fitness & Nutrition App',
    title: 'AI-Powered Fitness & Nutrition App',
    description: 'A full-stack career platform using Django and React to generate AI-powered resumes and provide interview preparation.',
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format&q=80",
    imageGradient: 'from-blue-500 to-blue-600',
    tags: ['React', 'Django', 'OpenAI API', 'React Native'],
    category: 'AI/ML',
    status: 'in development',
    timeline: '3 months',
    year: '2024',
    client: 'Freelance Project',
    featured: true,
    links: [{ type: 'freelancer', url: '#' }],
  },


]

const categories = ['All', 'AI/ML', 'Full-Stack', 'Research']

const getProjectIcon = (category: string) => {
  switch (category) {
    case 'AI/ML':
      return <Brain className="w-8 h-8" />
    case 'Full-Stack':
      return <Code className="w-8 h-8" />
    case 'Research':
      return <Microscope className="w-8 h-8" />
    default:
      return <Cpu className="w-8 h-8" />
  }
}

// Small icon variant for category tabs
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'AI/ML':
      return <Brain className="w-4 h-4" />
    case 'Full-Stack':
      return <Code className="w-4 h-4" />
    case 'Research':
      return <Microscope className="w-4 h-4" />
    default:
      return <Cpu className="w-4 h-4" />
  }
}

export default function ProjectsPage() {
  // Helper function to get details for each link type
  const getLinkDetails = (type: string) => {
    switch (type) {
      case 'github':
        return { text: 'View Code', icon: <Github className="w-4 h-4" /> }
      case 'freelancer':
        return { text: 'Project Details', icon: <ExternalLink className="w-4 h-4" /> }
      case 'live':
        return { text: 'Live Site', icon: <Rocket className="w-4 h-4" /> }
      case 'kaggle':
        return { text: 'View Notebook', icon: <ExternalLink className="w-4 h-4" /> }
      default:
        return { text: 'View Link', icon: <ExternalLink className="w-4 h-4" /> }
    }
  }

  // Counts per category for tab badges
  const categoryCounts: Record<string, number> = Object.fromEntries(
    categories.map((c) => [
      c,
      c === 'All' ? projects.length : projects.filter((p) => p.category === c).length,
    ])
  )

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* 3D Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                My Projects
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A showcase of innovative solutions, from AI-powered applications to full-stack platforms. Each project represents a unique challenge solved with cutting-edge technology and best practices.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {projects.length} Projects Completed
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  Full-Stack Development
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  AI/ML Specialist
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="All" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="h-auto rounded-full bg-background/50 supports-[backdrop-filter]:bg-background/60 backdrop-blur border border-primary/10 shadow-sm p-1 gap-1">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all
                               hover:text-foreground hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
                               data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-primary/20"
                    >
                      <span className="flex items-center gap-2">
                        <span className="opacity-80">{getCategoryIcon(category)}</span>
                        <span>{category}</span>
                        <span
                          className="ml-1 inline-flex items-center justify-center text-[10px] font-semibold px-2 py-0.5 rounded-full
                                     bg-primary/10 text-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground"
                        >
                          {categoryCounts[category]}
                        </span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects
                      .filter((project) => category === 'All' || project.category === category)
                      .map((project) => (
                        <Card key={project.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                          <div className="relative overflow-hidden">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={240}
                                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className={`w-full h-60 bg-gradient-to-br ${project.imageGradient} flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300 relative`}>
                                <div className="text-white text-center p-4 z-10">
                                  <div className="mb-3 opacity-80">
                                    {getProjectIcon(project.category)}
                                  </div>
                                  <h3 className="font-bold text-base mb-1 line-clamp-2">{project.title}</h3>
                                  <p className="text-xs opacity-80">{project.category}</p>
                                </div>
                                <div className="absolute inset-0 bg-black/20"></div>
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <Badge
                                variant={project.status === 'Completed' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {project.status}
                              </Badge>
                            </div>
                            {project.featured && (
                              <div className="absolute top-4 right-4">
                                <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
                                  Featured
                                </Badge>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col flex-grow">
                            <CardHeader>
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {project.category}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {project.year}
                                </div>
                              </div>
                              <CardTitle className="text-xl">{project.title}</CardTitle>
                              <CardDescription className="text-sm">
                                {project.description}
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-grow">
                              <div className="mb-4">
                                <div className="flex items-center text-xs text-muted-foreground mb-2">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {project.timeline}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Client: {project.client}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {project.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {project.tags.length > 4 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{project.tags.length - 4}
                                  </Badge>
                                )}
                              </div>
                            </CardContent>

                            <CardFooter className="flex-wrap gap-x-4 gap-y-2 border-t pt-4 mt-auto">
                              {project.links && project.links.length > 0 ? (
                                project.links.map((link) => {
                                  const details = getLinkDetails(link.type)
                                  return (
                                    <Link
                                      key={link.type}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                    >
                                      {details.icon}
                                      <span className="ml-2">{details.text}</span>
                                    </Link>
                                  )
                                })
                              ) : (
                                <p className="text-sm text-muted-foreground italic">No public links available.</p>
                              )}
                            </CardFooter>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how I can help bring your vision to life with innovative AI solutions and robust full-stack development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/resume">Download Resume</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}