import { RequestHandler } from "express";

interface ImageSearchResult {
  id: string;
  url: string;
  thumbnailUrl: string;
  alt: string;
  width: number;
  height: number;
  photographer?: string;
  source: string;
}

export const handleImageSearch: RequestHandler = async (req, res) => {
  const { q: query, page = 1 } = req.query;
  
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Mock data for now - in production you'd integrate with Pexels, Unsplash, etc.
    const mockResults: ImageSearchResult[] = [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/7689291/pexels-photo-7689291.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/7689291/pexels-photo-7689291.jpeg?auto=compress&cs=tinysrgb&w=300',
        alt: `Sports fan gear related to ${query}`,
        width: 4103,
        height: 6154,
        photographer: 'Pexels',
        source: 'pexels'
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/159515/football-american-football-runner-player-159515.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/159515/football-american-football-runner-player-159515.jpeg?auto=compress&cs=tinysrgb&w=300',
        alt: `Football player in action - ${query}`,
        width: 1920,
        height: 1080,
        photographer: 'Pexels',
        source: 'pexels'
      },
      {
        id: '3',
        url: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=300',
        alt: `Stadium crowd cheering for ${query}`,
        width: 1920,
        height: 1280,
        photographer: 'Pexels',
        source: 'pexels'
      },
      {
        id: '4',
        url: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300',
        alt: `Team jersey and merchandise for ${query}`,
        width: 1920,
        height: 1440,
        photographer: 'Pexels',
        source: 'pexels'
      },
      {
        id: '5',
        url: 'https://images.pexels.com/photos/1222515/pexels-photo-1222515.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/1222515/pexels-photo-1222515.jpeg?auto=compress&cs=tinysrgb&w=300',
        alt: `Sports equipment for ${query}`,
        width: 1920,
        height: 1280,
        photographer: 'Pexels',
        source: 'pexels'
      },
      {
        id: '6',
        url: 'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg',
        thumbnailUrl: 'https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=300',
        alt: `Fan celebrating team victory - ${query}`,
        width: 1920,
        height: 1280,
        photographer: 'Pexels',
        source: 'pexels'
      }
    ];

    // Filter results based on query
    const filteredResults = mockResults.map(result => ({
      ...result,
      alt: result.alt.replace(/\${query}/g, query)
    }));

    res.json({
      query,
      page: Number(page),
      results: filteredResults,
      totalResults: filteredResults.length,
      message: 'Image search results - Integration with Pexels/Unsplash APIs available for production'
    });

  } catch (error) {
    console.error('Image search error:', error);
    res.status(500).json({ 
      error: 'Failed to search images',
      message: 'External image API integration needed for production'
    });
  }
};
