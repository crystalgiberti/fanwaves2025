import { builder } from '@builder.io/react';

// Advanced media management system
export class MediaManager {
  private static instance: MediaManager;
  private apiKey = '87091a742c05463799bae52525d7477c';

  static getInstance(): MediaManager {
    if (!MediaManager.instance) {
      MediaManager.instance = new MediaManager();
    }
    return MediaManager.instance;
  }

  // Upload images to Builder.io
  async uploadImage(file: File, folder = 'fanwaves'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(`https://builder.io/api/v1/upload?apiKey=${this.apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.url;
  }

  // Search for royalty-free images (Pexels integration)
  async searchImages(query: string, page = 1): Promise<any[]> {
    try {
      // This would integrate with Pexels API or similar
      const response = await fetch(`/api/search-images?q=${encodeURIComponent(query)}&page=${page}`);
      return await response.json();
    } catch (error) {
      console.error('Image search error:', error);
      return [];
    }
  }

  // Generate team-specific images with CSS
  generateTeamGraphic(teamData: any): string {
    return `
      <div style="
        width: 400px;
        height: 400px;
        background: linear-gradient(135deg, ${teamData.colors.primary}, ${teamData.colors.secondary});
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        position: relative;
        overflow: hidden;
      ">
        <div style="position: relative; z-index: 2;">
          ${teamData.city}<br/>${teamData.name}
        </div>
        <div style="
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        "></div>
      </div>
    `;
  }

  // Create animated team logos
  createAnimatedLogo(teamData: any): string {
    return `
      <div class="animated-logo" style="
        width: 100px;
        height: 100px;
        background: ${teamData.colors.primary};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
      " onmouseover="this.style.transform='scale(1.1) rotate(5deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'">
        ${teamData.name.charAt(0)}
        <div style="
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 2s infinite;
        "></div>
      </div>
    `;
  }
}

// CSS animations for dynamic content
export const customAnimations = `
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .fan-waves-entrance {
    animation: fadeInUp 0.6s ease-out;
  }

  .fan-waves-slide {
    animation: slideInFromLeft 0.8s ease-out;
  }

  .fan-waves-pulse {
    animation: pulse 2s infinite;
  }

  .team-card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .team-card-hover:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
  }

  .gradient-text {
    background: linear-gradient(135deg, #00d4ff, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-parallax {
    transform: translateZ(0);
    will-change: transform;
  }

  .floating-icon {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export default MediaManager;
