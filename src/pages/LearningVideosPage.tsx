import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Video } from 'lucide-react';
import { careersData } from '@/data/completeCareerData';

interface VideoWithCareer {
  title: string;
  videoId: string;
  duration: string;
  description: string;
  careerTitle: string;
  careerGradient: string;
}

export default function LearningVideosPage() {
  // Aggregate all videos from all career paths
  const allVideos: VideoWithCareer[] = [];
  
  Object.values(careersData).forEach(career => {
    if (career.videos && career.videos.length > 0) {
      career.videos.forEach(video => {
        if (video.videoId && video.videoId.trim()) {
          allVideos.push({
            ...video,
            careerTitle: career.title,
            careerGradient: career.gradient
          });
        }
      });
    }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Learning Videos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated video resources from top creators to accelerate your learning journey across different career paths
          </p>
        </div>

        {/* Videos Grid */}
        {allVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((video, index) => (
              <Card3D key={index} hover={true}>
                <div className="space-y-4">
                  {/* Video Embed */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Video Info */}
                  <div>
                    {/* Career Badge */}
                    <div className="mb-2">
                      <Badge 
                        variant="outline" 
                        className={`bg-gradient-to-r ${video.careerGradient} text-white border-0`}
                      >
                        {video.careerTitle}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold mb-2 line-clamp-2">{video.title}</h3>
                    
                    {/* Description */}
                    <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm font-semibold text-blue-600 mb-1">💡 Why watch this:</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">{video.description}</p>
                    </div>
                    
                    {/* Duration and Link */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">⏱️ {video.duration}</Badge>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        Watch on YouTube
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        ) : (
          <Card3D hover={false} className="text-center py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">No Videos Available</h3>
                <p className="text-muted-foreground">
                  Check back soon for curated learning resources
                </p>
              </div>
            </div>
          </Card3D>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {allVideos.length} curated video{allVideos.length !== 1 ? 's' : ''} from {Object.keys(careersData).length} career paths
          </p>
        </div>
      </div>
    </Layout>
  );
}
