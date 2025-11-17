import { Helmet } from 'react-helmet-async';

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
}

export const VideoSchema = ({ name, description, thumbnailUrl, uploadDate, duration }: VideoSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl || "https://cessionbtp.fr/images/logo-cessionbtp-hd.png",
    "uploadDate": uploadDate || new Date().toISOString(),
    "duration": duration || "PT5M",
    "contentUrl": "https://cessionbtp.fr",
    "embedUrl": "https://cessionbtp.fr"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
